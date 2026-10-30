
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
 
const app = express();
const PORT = process.env.PORT || 5000;
 
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');
const LOCAL_FILE = path.join(DATA_DIR, 'state.json');
 
const STATE_ID = 'travelease-main-state';
const UPI_ID = String(process.env.OWNER_UPI_ID || '').trim();
const UPI_PAYEE_NAME = String(process.env.OWNER_UPI_NAME || 'TravelEase').trim();
 
// IMPORTANT: Keep the existing MongoDB state document and its existing keys.
// Payment records are stored as additional keys in the same state document.
const allowedOrigins = new Set([
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  ...(String(process.env.FRONTEND_ORIGIN || '').split(',').map(value => value.trim()).filter(Boolean))
]);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by TravelEase API CORS policy.'));
  },
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
 
// ===============================
// MONGODB STATE SCHEMA
// ===============================
 
const StateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});
 
const State = mongoose.model('TravelEaseState', StateSchema);
 
// ===============================
// LOCAL DATA FUNCTIONS
// ===============================
 
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}
 
function readLocalState() {
  ensureDataDir();
  if (!fs.existsSync(LOCAL_FILE)) return null;
 
  try {
    return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
  } catch (err) {
    console.error('TravelEase: Unable to read local state.json');
    return null;
  }
}
 
function writeLocalState(state) {
  ensureDataDir();
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(state, null, 2), 'utf8');
}
 
// ===============================
// MONGODB CONNECTION
// ===============================
 
let mongoReady = false;
 
async function connectMongo() {
  if (!process.env.MONGO_URI) {
    console.warn('TravelEase: MONGO_URI not found.');
    return;
  }
 
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
 
    mongoReady = true;
    console.log('TravelEase: MongoDB connected');
 
    // Local JSON is migrated only if the existing MongoDB state document is absent.
    const existingMongoData = await State.findById(STATE_ID).lean();
 
    if (!existingMongoData) {
      const localState = readLocalState();
 
      if (localState) {
        console.log('TravelEase: Local state.json found.');
 
        await State.findByIdAndUpdate(
          STATE_ID,
          {
            _id: STATE_ID,
            state: localState,
            updatedAt: new Date()
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          }
        );
 
        console.log('TravelEase: Local data migrated to MongoDB successfully.');
      } else {
        console.log('TravelEase: No local state.json data found.');
      }
    } else {
      console.log('TravelEase: MongoDB already contains TravelEase data. Migration skipped.');
    }
  } catch (err) {
    mongoReady = false;
    console.warn('TravelEase: MongoDB unavailable; using local JSON fallback.');
    console.error('MongoDB ERROR:', err.message);
  }
}
 
// ===============================
// STATE READ / WRITE HELPERS
// ===============================
 
async function getState() {
  if (mongoReady) {
    const doc = await State.findById(STATE_ID).lean();
    return doc ? doc.state : null;
  }
  return readLocalState();
}
 
async function saveState(state) {
  if (mongoReady) {
    await State.findByIdAndUpdate(
      STATE_ID,
      {
        _id: STATE_ID,
        state: state,
        updatedAt: new Date()
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );
  }
 
  // Local JSON fallback / snapshot. Render local disk may be ephemeral.
  writeLocalState(state);
  return state;
}
 
// Update only selected keys while preserving every other existing state key.
async function updateStateKeys(patch) {
  const current = await getState();
  if (!current || typeof current !== 'object' || Array.isArray(current)) {
    throw new Error('TravelEase state is not initialized. Existing data was not changed.');
  }
 
  const next = { ...current, ...patch };
  await saveState(next);
  return next;
}
 
// ===============================
// ADMIN SESSION TOKEN
// ===============================
 
function sessionSecret() {
  return String(process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '');
}
 
function createAdminToken(username) {
  const secret = sessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be configured.');
 
  const payload = Buffer.from(JSON.stringify({
    username,
    role: 'admin',
    expiresAt: Date.now() + (8 * 60 * 60 * 1000)
  })).toString('base64url');
 
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}
 
function createSignedToken(payload) {
  const secret = sessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be configured.');
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}
 
function readSignedToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const secret = sessionSecret();
  if (!secret) return null;
  const expected = crypto.createHmac('sha256', secret).update(parts[0]).digest();
  const received = Buffer.from(parts[1], 'base64url');
  if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (!payload.expiresAt || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch (_) { return null; }
}
 
function requireCustomer(req, res, next) {
  const header = String(req.headers.authorization || '');
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = readSignedToken(token);
  if (!payload || payload.role !== 'customer' || !payload.email) {
    return res.status(401).json({ ok: false, message: 'Customer login required.' });
  }
  req.customer = payload;
  next();
}
 
function requireAdmin(req, res, next) {
  const header = String(req.headers.authorization || '');
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const parts = token.split('.');
 
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return res.status(401).json({ message: 'Admin authentication required.' });
  }
 
  try {
    const expected = crypto.createHmac('sha256', sessionSecret()).update(parts[0]).digest();
    const received = Buffer.from(parts[1], 'base64url');
 
    if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
      return res.status(401).json({ message: 'Invalid admin session.' });
    }
 
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (payload.role !== 'admin' || !payload.expiresAt || payload.expiresAt < Date.now()) {
      return res.status(401).json({ message: 'Admin session expired. Please log in again.' });
    }
 
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid admin session.' });
  }
}
 
// ===============================
// HELPERS FOR PAYMENT / REFUND
// ===============================
 
function cleanText(value, maxLength = 160) {
  return String(value == null ? '' : value).trim().slice(0, maxLength);
}
 
function createId(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}
 
function findBookingIndex(bookings, bookingId) {
  return bookings.findIndex(item =>
    item &&
    String(item.bookingId || item.id || item._id || '') === String(bookingId)
  );
}
 
// ===============================
// HEALTH CHECK
// ===============================
 
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'TravelEase API',
    database: mongoReady ? 'mongodb' : 'local-json'
  });
});
 
// ===============================
// GET COMPLETE STATE
// ===============================
 
// Public read-only catalogue. Never expose customer accounts, bookings, or revenue.
app.get('/api/public/state', async (req, res) => {
  try {
    const state = await getState();
    if (!state || typeof state !== 'object' || Array.isArray(state)) {
      return res.json({ initialized: false, state: null });
    }
 
    res.set('Cache-Control', 'no-store');
    res.json({
      initialized: true,
      state: {
        buses: Array.isArray(state.buses) ? state.buses : [],
        hotels: Array.isArray(state.hotels) ? state.hotels : [],
        packages: Array.isArray(state.packages) ? state.packages : [],
        destinations: Array.isArray(state.destinations) ? state.destinations : []
      }
    });
  } catch (err) {
    console.error('TravelEase public catalogue load error:', err.message);
    res.status(500).json({ message: 'Unable to load TravelEase catalogue.' });
  }
});
 
// Full state contains customer data and is restricted to authenticated admins.
app.get('/api/state', requireAdmin, async (req, res) => {
  try {
    const state = await getState();
    res.set('Cache-Control', 'no-store');
    res.json({
      initialized: !!state,
      state: state || null
    });
  } catch (err) {
    console.error('TravelEase state load error:', err.message);
    res.status(500).json({ message: 'Unable to load TravelEase data.' });
  }
});
 
// ===============================
// SAVE COMPLETE STATE
// ===============================
 
app.put('/api/state', requireAdmin, async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid state payload.' });
    }
 
    const allowed = [
      'buses',
      'hotels',
      'packages',
      'destinations',
      'bookings',
      'users',
      'ownerRevenue'
    ];
 
    const current = await getState();
    let state;
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      const requiredArrays = ['buses', 'hotels', 'packages', 'destinations', 'bookings', 'users'];
      if (!requiredArrays.every(key => Array.isArray(req.body[key]))) {
        return res.status(409).json({
          message: 'TravelEase state is not initialized. Complete initial data is required; nothing was changed.'
        });
      }
      state = { paymentSubmissions: [], refundRequests: [], ownerRevenue: 0, ...req.body };
    } else {
      // Preserve payment/refund records and every unknown key.
      state = { ...current };
    }
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        state[key] = req.body[key];
      }
    }
 
    await saveState(state);
    res.json({ ok: true, state });
  } catch (err) {
    console.error('TravelEase save error:', err.message);
    res.status(500).json({ message: 'Unable to save TravelEase data.' });
  }
});
 
// ===============================
// ADMIN LOGIN
// ===============================
 
app.post('/api/auth/admin-login', (req, res) => {
  const username = String(req.body?.username || '');
  const password = String(req.body?.password || '');
 
  const expectedUser = String(process.env.ADMIN_USERNAME || '').trim();
  const expectedPass = String(process.env.ADMIN_PASSWORD || '');
 
  // Fail closed: never allow predictable default owner credentials in production.
  if (!expectedUser || !expectedPass) {
    return res.status(503).json({
      ok: false,
      message: 'Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD in Render.'
    });
  }
 
  if (username !== expectedUser || password !== expectedPass) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid owner login details!'
    });
  }
 
  try {
    const token = createAdminToken(username);
    return res.json({
      ok: true,
      role: 'admin',
      token,
      displayName: 'TravelEase Owner'
    });
  } catch (err) {
    console.error('Admin token creation failed:', err.message);
    return res.status(503).json({
      ok: false,
      message: 'Admin session is not configured. Set ADMIN_SESSION_SECRET in Render environment variables.'
    });
  }
});
 
// ===============================
// CUSTOMER AUTHENTICATION (SERVER-SIDE, SHARED ACROSS DEVICES)
// The browser derives PBKDF2-SHA256 with 210000 iterations and sends only
// the derived hash + salt. Plaintext passwords are never stored by this API.
// ===============================
 
function validCustomerPasswordData(hash, salt) {
  return typeof hash === 'string' && /^[A-Za-z0-9+/]{40,48}={0,2}$/.test(hash) &&
    typeof salt === 'string' && /^[A-Za-z0-9+/]{20,28}={0,2}$/.test(salt);
}
 
app.post('/api/auth/customer-register', async (req, res) => {
  try {
    const name = cleanText(req.body?.name, 100);
    const email = cleanText(req.body?.email, 120).toLowerCase();
    const passwordHash = String(req.body?.passwordHash || '');
    const passwordSalt = String(req.body?.passwordSalt || '');
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !validCustomerPasswordData(passwordHash, passwordSalt)) {
      return res.status(400).json({ ok: false, message: 'Valid name, email, and secure password data are required.' });
    }
    const state = await getState();
    if (!state || typeof state !== 'object') return res.status(409).json({ ok: false, message: 'TravelEase data is not initialized.' });
    const users = Array.isArray(state.users) ? [...state.users] : [];
    if (users.some(user => String(user?.email || '').toLowerCase() === email)) {
      return res.status(409).json({ ok: false, message: 'Email already registered. Please log in.' });
    }
    users.push({ name, email, passwordHash, passwordSalt, role: 'customer', balance: 0, createdAt: new Date().toISOString() });
    await updateStateKeys({ users });
    return res.status(201).json({ ok: true, message: 'Registration successful. Please log in.' });
  } catch (err) {
    console.error('Customer registration failed:', err.message);
    return res.status(500).json({ ok: false, message: 'Unable to register customer.' });
  }
});
 
// Return the stored PBKDF2 salt so the browser can derive the same hash
// before login. A salt is not a password or authentication secret.
app.get('/api/auth/customer-salt', async (req, res) => {
  try {
    const email = cleanText(req.query?.email, 120).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, message: 'A valid email address is required.' });
    }
    const state = await getState();
    const users = Array.isArray(state?.users) ? state.users : [];
    const user = users.find(item => String(item?.email || '').toLowerCase() === email && item.role === 'customer');
    if (!user || !validCustomerPasswordData(user.passwordHash, user.passwordSalt)) {
      return res.status(404).json({ ok: false, message: 'Customer account not found. Please register this account.' });
    }
    res.set('Cache-Control', 'no-store');
    return res.json({ ok: true, passwordSalt: user.passwordSalt });
  } catch (err) {
    console.error('Customer salt lookup failed:', err.message);
    return res.status(500).json({ ok: false, message: 'Unable to start customer login.' });
  }
});
 
app.post('/api/auth/customer-login', async (req, res) => {
  try {
    const email = cleanText(req.body?.email, 120).toLowerCase();
    const passwordHash = String(req.body?.passwordHash || '');
    if (!email || !passwordHash) return res.status(400).json({ ok: false, message: 'Email and password are required.' });
    const state = await getState();
    const users = Array.isArray(state?.users) ? state.users : [];
    const user = users.find(item => String(item?.email || '').toLowerCase() === email && item.role === 'customer');
    if (!user || typeof user.passwordHash !== 'string') {
      return res.status(401).json({ ok: false, message: 'Invalid email or password. If this is an older local-only account, register it on this device first.' });
    }
    const stored = Buffer.from(user.passwordHash);
    const supplied = Buffer.from(passwordHash);
    if (stored.length !== supplied.length || !crypto.timingSafeEqual(stored, supplied)) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
    }
    const token = createSignedToken({ email, role: 'customer', expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) });
    return res.json({ ok: true, token, user: { name: cleanText(user.name, 100), email, role: 'customer' } });
  } catch (err) {
    console.error('Customer login failed:', err.message);
    return res.status(500).json({ ok: false, message: 'Unable to log in.' });
  }
});
 
app.get('/api/customer/bookings', requireCustomer, async (req, res) => {
  try {
    const state = await getState();
    const bookings = Array.isArray(state?.bookings) ? state.bookings : [];
    const ownBookings = bookings.filter(booking => String(booking?.customer || '').toLowerCase() === req.customer.email);
    res.set('Cache-Control', 'no-store');
    return res.json({ ok: true, bookings: ownBookings });
  } catch (err) {
    console.error('Customer bookings load failed:', err.message);
    return res.status(500).json({ ok: false, message: 'Unable to load customer bookings.' });
  }
});
 
// ===============================
// PUBLIC PAYMENT CONFIG
// ===============================
 
app.get('/api/payment/config', (req, res) => {
  if (!UPI_ID) {
    return res.status(503).json({ ok: false, message: 'Owner UPI ID is not configured on the server.' });
  }
 
  res.json({
    ok: true,
    upiId: UPI_ID,
    payeeName: UPI_PAYEE_NAME
  });
});
 
// ===============================
// SUBMIT PAYMENT DETAILS (CUSTOMER)
// This does NOT verify money received.
// ===============================
 
app.post('/api/payments/submit', async (req, res) => {
  try {
    const bookingId = cleanText(req.body?.bookingId, 100);
    const utr = cleanText(req.body?.utr, 40);
    const customerName = cleanText(req.body?.customerName, 100);
    const customerMobile = cleanText(req.body?.customerMobile, 20);
    const amount = Number(req.body?.amount);
 
    if (!bookingId || !utr || !/^[A-Za-z0-9-]{6,40}$/.test(utr)) {
      return res.status(400).json({ ok: false, message: 'Valid booking ID and UTR / transaction reference are required.' });
    }
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) {
      return res.status(400).json({ ok: false, message: 'Invalid payment amount.' });
    }
 
    const current = await getState();
    if (!current || typeof current !== 'object' || !Array.isArray(current.bookings)) {
      return res.status(409).json({ ok: false, message: 'Booking data is not available. Please contact the owner.' });
    }
 
    const bookings = [...current.bookings];
    let bookingIndex = findBookingIndex(bookings, bookingId);
    let booking;
 
    if (bookingIndex < 0) {
      // Create the customer booking on the server; customers cannot upload full private state.
      const submitted = req.body?.booking;
      if (!submitted || typeof submitted !== 'object' || Array.isArray(submitted) ||
          String(submitted.bookingId || '') !== bookingId) {
        return res.status(404).json({ ok: false, message: 'Booking not found. Please restart the booking process.' });
      }
 
      const customer = cleanText(submitted.customer, 120);
      const type = cleanText(submitted.type, 30);
      const name = cleanText(submitted.name, 120);
      const price = Number(submitted.price);
      if (!customer || !customer.includes('@') || !type || !name ||
          !Number.isFinite(price) || price <= 0 || Math.abs(price - amount) > 0.01) {
        return res.status(400).json({ ok: false, message: 'Booking details or amount are invalid.' });
      }
 
      booking = { ...submitted, bookingId, customer, type, name, price,
        status: 'Pending Payment', paymentStatus: 'PAYMENT_SUBMITTED' };
      bookingIndex = bookings.length;
      bookings.push(booking);
    } else {
      booking = { ...bookings[bookingIndex] };
      const expectedAmount = Number(booking.totalAmount || booking.amount || booking.price);
      if (!Number.isFinite(expectedAmount) || Math.abs(expectedAmount - amount) > 0.01) {
        return res.status(409).json({ ok: false, message: 'Submitted amount does not match the saved booking.' });
      }
    }
 
    const existingPayments = Array.isArray(current.paymentSubmissions) ? current.paymentSubmissions : [];
 
    // One booking may have only one active/verified payment submission.
    // This prevents accidental duplicate submissions creating duplicate admin rows.
    const bookingHasPayment = existingPayments.some(p =>
      String(p?.bookingId || '') === bookingId &&
      ['PAYMENT_SUBMITTED', 'PAID_VERIFIED'].includes(String(p?.status || '').toUpperCase())
    );
    if (bookingHasPayment) {
      return res.status(409).json({ ok: false, message: 'A payment has already been submitted for this booking. Do not submit it again.' });
    }
 
    const duplicateUtr = existingPayments.some(p =>
      String(p.utr || '').toLowerCase() === utr.toLowerCase() &&
      !['REJECTED'].includes(String(p.status || '').toUpperCase())
    );
    if (duplicateUtr) {
      return res.status(409).json({ ok: false, message: 'This transaction reference has already been submitted.' });
    }
 
    const payment = {
      paymentId: createId('PAY'),
      bookingId,
      customerName,
      customerMobile,
      amount,
      method: 'UPI',
      utr,
      status: 'PAYMENT_SUBMITTED',
      submittedAt: new Date().toISOString(),
      verifiedAt: null,
      verifiedBy: null
    };
 
    booking.paymentStatus = 'PAYMENT_SUBMITTED';
    booking.paymentReference = payment.paymentId;
    bookings[bookingIndex] = booking;
 
    await updateStateKeys({
      bookings,
      paymentSubmissions: [...existingPayments, payment]
    });
 
    res.status(201).json({
      ok: true,
      message: 'Payment details submitted. Booking will be confirmed only after admin verifies the transaction.',
      paymentId: payment.paymentId,
      status: payment.status
    });
  } catch (err) {
    console.error('Payment submission failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to submit payment details.' });
  }
});
 
// ===============================
// ADMIN: LIST PAYMENT SUBMISSIONS
// ===============================
 
app.get('/api/admin/payments', requireAdmin, async (req, res) => {
  try {
    const state = await getState();
    res.json({ ok: true, payments: Array.isArray(state?.paymentSubmissions) ? state.paymentSubmissions : [] });
  } catch (err) {
    console.error('Unable to load payment submissions:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to load payments.' });
  }
});
 
// ===============================
// ADMIN: VERIFY / REJECT PAYMENT
// Admin must independently check bank / UPI statement.
// ===============================
 
app.post('/api/admin/payments/:paymentId/decision', requireAdmin, async (req, res) => {
  try {
    const decision = cleanText(req.body?.decision, 20).toUpperCase();
    const note = cleanText(req.body?.note, 300);
 
    if (!['VERIFY', 'REJECT'].includes(decision)) {
      return res.status(400).json({ ok: false, message: 'Decision must be VERIFY or REJECT.' });
    }
 
    const state = await getState();
    const payments = Array.isArray(state?.paymentSubmissions) ? [...state.paymentSubmissions] : [];
    const index = payments.findIndex(p => p && p.paymentId === req.params.paymentId);
    if (index < 0) return res.status(404).json({ ok: false, message: 'Payment submission not found.' });
 
    const payment = { ...payments[index] };
    if (payment.status !== 'PAYMENT_SUBMITTED') {
      return res.status(409).json({ ok: false, message: 'This payment is no longer awaiting verification.' });
    }
 
    const bookings = Array.isArray(state.bookings) ? [...state.bookings] : [];
    const bookingIndex = findBookingIndex(bookings, payment.bookingId);
    if (bookingIndex < 0) return res.status(404).json({ ok: false, message: 'Related booking not found.' });
 
    const booking = { ...bookings[bookingIndex] };
    const hotels = Array.isArray(state.hotels) ? [...state.hotels] : [];
    let updatedHotelIndex = -1;
    const now = new Date().toISOString();
 
    if (decision === 'VERIFY') {
      // Decrease inventory only after an admin independently verifies payment.
      // Existing hotel bookings store hotelIndex and rooms.
      if (String(booking.type || '').toLowerCase() === 'hotel') {
        const hotelIndex = Number(booking.hotelIndex);
        const rooms = Number(booking.rooms);
 
        if (!Number.isInteger(hotelIndex) || hotelIndex < 0 || hotelIndex >= hotels.length) {
          return res.status(409).json({
            ok: false,
            message: 'Hotel inventory reference is invalid. Booking was not confirmed.'
          });
        }
        if (!Number.isInteger(rooms) || rooms < 1) {
          return res.status(409).json({
            ok: false,
            message: 'Hotel room count is invalid. Booking was not confirmed.'
          });
        }
 
        const hotel = { ...hotels[hotelIndex] };
        const availableRooms = Number(hotel.availableRooms);
        if (!Number.isFinite(availableRooms) || availableRooms < rooms) {
          return res.status(409).json({
            ok: false,
            message: 'Not enough rooms are available. Booking was not confirmed. Contact the customer to resolve the payment.'
          });
        }
 
        hotel.availableRooms = availableRooms - rooms;
        hotels[hotelIndex] = hotel;
        updatedHotelIndex = hotelIndex;
      }
 
      // Only the admin decision changes payment to verified / booking to confirmed.
      payment.status = 'PAID_VERIFIED';
      payment.verifiedAt = now;
      payment.verifiedBy = req.admin.username;
      payment.adminNote = note;
      booking.paymentStatus = 'PAID_VERIFIED';
      booking.status = 'Confirmed';
      booking.paymentVerifiedAt = now;
    } else {
      payment.status = 'REJECTED';
      payment.verifiedAt = now;
      payment.verifiedBy = req.admin.username;
      payment.adminNote = note;
      booking.paymentStatus = 'PAYMENT_REJECTED';
    }
 
    payments[index] = payment;
    bookings[bookingIndex] = booking;
    const statePatch = { paymentSubmissions: payments, bookings };
    if (updatedHotelIndex >= 0) statePatch.hotels = hotels;
    await updateStateKeys(statePatch);
 
    res.json({
      ok: true,
      message: decision === 'VERIFY' ? 'Payment marked verified and booking confirmed.' : 'Payment rejected.',
      payment
    });
  } catch (err) {
    console.error('Payment decision failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to update payment status.' });
  }
});
 
// ===============================
// CUSTOMER: READ BOOKING STATUS ONLY
// Returns no customer contact details or payment UTR.
// ===============================
app.get('/api/bookings/:bookingId/status', async (req, res) => {
  try {
    const bookingId = cleanText(req.params.bookingId, 100);
    const state = await getState();
    const list = Array.isArray(state?.bookings) ? state.bookings : [];
    const index = findBookingIndex(list, bookingId);
    if (index < 0) return res.status(404).json({ ok: false, message: 'Booking not found.' });
    const booking = list[index];
    res.set('Cache-Control', 'no-store');
    res.json({
      ok: true,
      bookingId,
      status: cleanText(booking.status, 40),
      paymentStatus: cleanText(booking.paymentStatus, 40),
      refundStatus: cleanText(booking.refundStatus, 40),
      totalAmount: Number(booking.totalAmount || booking.amount || booking.price || 0),
      paymentVerifiedAt: booking.paymentVerifiedAt || null,
      refundedAt: booking.refundedAt || null
    });
  } catch (err) {
    console.error('Booking status lookup failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to load booking status.' });
  }
});
 
// ===============================
// CUSTOMER: REQUEST CANCELLATION / REFUND
// ===============================
 
app.post('/api/refunds/request', async (req, res) => {
  try {
    const bookingId = cleanText(req.body?.bookingId, 100);
    const reason = cleanText(req.body?.reason, 300);
    if (!bookingId) return res.status(400).json({ ok: false, message: 'Booking ID is required.' });
 
    const state = await getState();
    const bookings = Array.isArray(state?.bookings) ? [...state.bookings] : [];
    const bookingIndex = findBookingIndex(bookings, bookingId);
    if (bookingIndex < 0) return res.status(404).json({ ok: false, message: 'Booking not found.' });
 
    const booking = { ...bookings[bookingIndex] };
    if (booking.paymentStatus !== 'PAID_VERIFIED') {
      return res.status(409).json({ ok: false, message: 'Only a verified paid booking can request a refund.' });
    }
 
    const refundRequests = Array.isArray(state.refundRequests) ? [...state.refundRequests] : [];
    const alreadyOpen = refundRequests.some(r =>
      r.bookingId === bookingId && ['CANCEL_REQUESTED', 'REFUND_APPROVED', 'REFUND_PENDING'].includes(r.status)
    );
    if (alreadyOpen) return res.status(409).json({ ok: false, message: 'A cancellation/refund request is already open.' });
 
    const refund = {
      refundId: createId('REF'),
      bookingId,
      amount: Number(booking.totalAmount || booking.amount || booking.price || 0),
      reason,
      status: 'CANCEL_REQUESTED',
      requestedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      refundUtr: null,
      refundedAt: null
    };
 
    booking.refundStatus = 'CANCEL_REQUESTED';
    bookings[bookingIndex] = booking;
    refundRequests.push(refund);
 
    await updateStateKeys({ bookings, refundRequests });
    res.status(201).json({ ok: true, message: 'Cancellation request sent to admin for approval.', refund });
  } catch (err) {
    console.error('Refund request failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to submit cancellation request.' });
  }
});
 
// ===============================
// ADMIN: LIST REFUND REQUESTS
// ===============================
 
app.get('/api/admin/refunds', requireAdmin, async (req, res) => {
  try {
    const state = await getState();
    res.json({ ok: true, refunds: Array.isArray(state?.refundRequests) ? state.refundRequests : [] });
  } catch (err) {
    console.error('Unable to load refunds:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to load refund requests.' });
  }
});
 
// ===============================
// ADMIN: APPROVE / REJECT REFUND REQUEST
// Approval is not a money transfer.
// ===============================
 
app.post('/api/admin/refunds/:refundId/decision', requireAdmin, async (req, res) => {
  try {
    const decision = cleanText(req.body?.decision, 20).toUpperCase();
    const note = cleanText(req.body?.note, 300);
    if (!['APPROVE', 'REJECT'].includes(decision)) {
      return res.status(400).json({ ok: false, message: 'Decision must be APPROVE or REJECT.' });
    }
 
    const state = await getState();
    const refunds = Array.isArray(state?.refundRequests) ? [...state.refundRequests] : [];
    const index = refunds.findIndex(r => r && r.refundId === req.params.refundId);
    if (index < 0) return res.status(404).json({ ok: false, message: 'Refund request not found.' });
 
    const refund = { ...refunds[index] };
    if (refund.status !== 'CANCEL_REQUESTED') {
      return res.status(409).json({ ok: false, message: 'This refund request has already been reviewed.' });
    }
 
    const bookings = Array.isArray(state.bookings) ? [...state.bookings] : [];
    const bookingIndex = findBookingIndex(bookings, refund.bookingId);
    if (bookingIndex < 0) return res.status(404).json({ ok: false, message: 'Related booking not found.' });
 
    const booking = { ...bookings[bookingIndex] };
    const now = new Date().toISOString();
 
    refund.status = decision === 'APPROVE' ? 'REFUND_PENDING' : 'REFUND_REJECTED';
    refund.reviewedAt = now;
    refund.reviewedBy = req.admin.username;
    refund.adminNote = note;
 
    booking.refundStatus = refund.status;
    if (decision === 'APPROVE') { booking.status = 'Cancelled'; booking.cancelledAt = now; booking.cancelledBy = 'admin'; }
 
    refunds[index] = refund;
    bookings[bookingIndex] = booking;
    await updateStateKeys({ refundRequests: refunds, bookings });
 
    res.json({
      ok: true,
      message: decision === 'APPROVE'
        ? 'Refund approved. Transfer money manually, then record the refund UTR.'
        : 'Refund request rejected.',
      refund
    });
  } catch (err) {
    console.error('Refund decision failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to update refund request.' });
  }
});
 
// ===============================
// ADMIN: RECORD COMPLETED MANUAL REFUND
// Set REFUNDED only after money is actually transferred.
// ===============================
 
app.post('/api/admin/refunds/:refundId/complete', requireAdmin, async (req, res) => {
  try {
    const refundUtr = cleanText(req.body?.refundUtr, 40);
    if (!/^[A-Za-z0-9-]{6,40}$/.test(refundUtr)) {
      return res.status(400).json({ ok: false, message: 'Enter a valid refund transaction reference / UTR.' });
    }
 
    const state = await getState();
    const refunds = Array.isArray(state?.refundRequests) ? [...state.refundRequests] : [];
    const index = refunds.findIndex(r => r && r.refundId === req.params.refundId);
    if (index < 0) return res.status(404).json({ ok: false, message: 'Refund request not found.' });
 
    const refund = { ...refunds[index] };
    if (refund.status !== 'REFUND_PENDING') {
      return res.status(409).json({ ok: false, message: 'Only an approved refund can be marked completed.' });
    }
 
    const bookings = Array.isArray(state.bookings) ? [...state.bookings] : [];
    const bookingIndex = findBookingIndex(bookings, refund.bookingId);
    if (bookingIndex < 0) return res.status(404).json({ ok: false, message: 'Related booking not found.' });
 
    const now = new Date().toISOString();
    refund.status = 'REFUNDED';
    refund.refundUtr = refundUtr;
    refund.refundedAt = now;
    refund.completedBy = req.admin.username;
 
    const booking = { ...bookings[bookingIndex] };
    booking.refundStatus = 'REFUNDED';
    booking.refundUtr = refundUtr;
    booking.refundedAt = now;
    booking.refundAmount = Number(refund.amount || 0);
 
    refunds[index] = refund;
    bookings[bookingIndex] = booking;
    await updateStateKeys({ refundRequests: refunds, bookings });
 
    res.json({ ok: true, message: 'Refund marked completed.', refund });
  } catch (err) {
    console.error('Refund completion failed:', err.message);
    res.status(500).json({ ok: false, message: 'Unable to complete refund record.' });
  }
});
 
// ===============================
// BACKUP
// ===============================
 
app.get('/api/backups', requireAdmin, async (req, res) => {
  try {
    const state = await getState();
    res.json({
      ok: true,
      createdAt: new Date().toISOString(),
      state: state || {}
    });
  } catch (err) {
    console.error('TravelEase backup error:', err.message);
    res.status(500).json({ ok: false, message: 'Backup unavailable.' });
  }
});
 
// ===============================
// RESTORE BACKUP
// ===============================
 
app.post('/api/backups/restore', requireAdmin, async (req, res) => {
  try {
    const state = req.body?.state;
 
    if (!state || typeof state !== 'object' || Array.isArray(state)) {
      return res.status(400).json({ ok: false, message: 'Invalid backup.' });
    }
 
    // Keep the current restore behavior, but do not restore an empty object.
    if (Object.keys(state).length === 0) {
      return res.status(400).json({ ok: false, message: 'Empty backup cannot be restored.' });
    }
 
    await saveState(state);
    res.json({ ok: true, state });
  } catch (err) {
    console.error('TravelEase restore error:', err.message);
    res.status(500).json({ ok: false, message: 'Restore failed.' });
  }
});
 
// ===============================
// SERVE FRONTEND
// ===============================
 
app.use(express.static(ROOT, { extensions: ['html'] }));
 
// ===============================
// FRONTEND FALLBACK
// ===============================
 
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found.' });
  }
 
  res.sendFile(path.join(ROOT, 'index.html'));
});
 
// ===============================
// START SERVER
// ===============================
 
connectMongo().finally(() => {
  app.listen(PORT, () => {
    console.log(`TravelEase running on http://localhost:${PORT}`);
  });
});
