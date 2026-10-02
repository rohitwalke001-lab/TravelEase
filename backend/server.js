const path = require('path');
const fs = require('fs');
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

app.use(cors());
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

  if (!fs.existsSync(LOCAL_FILE)) {
    return null;
  }

  try {
    return JSON.parse(
      fs.readFileSync(LOCAL_FILE, 'utf8')
    );
  } catch (err) {
    console.error('TravelEase: Unable to read local state.json');
    return null;
  }
}


function writeLocalState(state) {
  ensureDataDir();

  fs.writeFileSync(
    LOCAL_FILE,
    JSON.stringify(state, null, 2),
    'utf8'
  );
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

    await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 5000
      }
    );

    mongoReady = true;

    console.log('TravelEase: MongoDB connected');


    // ==========================================
    // LOCAL JSON → MONGODB MIGRATION
    // ==========================================

    const existingMongoData = await State
      .findById(STATE_ID)
      .lean();


    // MongoDB मध्ये data आधीपासून नसेल तरच
    // local state.json मधला data migrate करायचा
    if (!existingMongoData) {

      const localState = readLocalState();


      if (localState) {

        console.log(
          'TravelEase: Local state.json found.'
        );

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

        console.log(
          'TravelEase: Local data migrated to MongoDB successfully.'
        );

      } else {

        console.log(
          'TravelEase: No local state.json data found.'
        );

      }

    } else {

      console.log(
        'TravelEase: MongoDB already contains TravelEase data. Migration skipped.'
      );

    }


  } catch (err) {

    mongoReady = false;

    console.warn(
      'TravelEase: MongoDB unavailable; using local JSON fallback.'
    );

    console.error(
      'MongoDB ERROR:',
      err.message
    );

  }

}


// ===============================
// GET STATE
// ===============================

async function getState() {

  if (mongoReady) {

    const doc = await State
      .findById(STATE_ID)
      .lean();

    return doc ? doc.state : null;

  }

  return readLocalState();
}


// ===============================
// SAVE STATE
// ===============================

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

  // Local backup पण ठेवतो
  writeLocalState(state);

  return state;
}


// ===============================
// HEALTH CHECK
// ===============================

app.get('/api/health', (req, res) => {

  res.json({

    ok: true,

    service: 'TravelEase API',

    database: mongoReady
      ? 'mongodb'
      : 'local-json'

  });

});


// ===============================
// GET COMPLETE STATE
// ===============================

app.get('/api/state', async (req, res) => {

  try {

    const state = await getState();

    res.json({

      initialized: !!state,

      state: state || null

    });

  } catch (err) {

    console.error(
      'TravelEase state load error:',
      err.message
    );

    res.status(500).json({

      message:
        'Unable to load TravelEase data.'

    });

  }

});


// ===============================
// SAVE COMPLETE STATE
// ===============================

app.put('/api/state', async (req, res) => {

  try {

    if (
      !req.body ||
      typeof req.body !== 'object' ||
      Array.isArray(req.body)
    ) {

      return res.status(400).json({

        message:
          'Invalid state payload.'

      });

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


    const state = {};


    for (const key of allowed) {

      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          key
        )
      ) {

        state[key] = req.body[key];

      }

    }


    await saveState(state);


    res.json({

      ok: true,

      state: state

    });

  } catch (err) {

    console.error(
      'TravelEase save error:',
      err.message
    );

    res.status(500).json({

      message:
        'Unable to save TravelEase data.'

    });

  }

});


// ===============================
// ADMIN LOGIN
// ===============================

app.post('/api/auth/admin-login', (req, res) => {

  const username =
    String(req.body?.username || '');

  const password =
    String(req.body?.password || '');


  const expectedUser =
    process.env.ADMIN_USERNAME || 'admin';

  const expectedPass =
    process.env.ADMIN_PASSWORD || 'admin123';


  if (
    username === expectedUser &&
    password === expectedPass
  ) {

    return res.json({

      ok: true,

      role: 'admin',

      displayName:
        'TravelEase Owner'

    });

  }


  return res.status(401).json({

    ok: false,

    message:
      'Invalid owner login details!'

  });

});


// ===============================
// BACKUP
// ===============================

app.get('/api/backups', async (req, res) => {

  try {

    const state = await getState();


    res.json({

      ok: true,

      createdAt:
        new Date().toISOString(),

      state: state || {}

    });

  } catch (err) {

    console.error(
      'TravelEase backup error:',
      err.message
    );

    res.status(500).json({

      ok: false,

      message:
        'Backup unavailable.'

    });

  }

});


// ===============================
// RESTORE BACKUP
// ===============================

app.post('/api/backups/restore', async (req, res) => {

  try {

    const state =
      req.body?.state;


    if (
      !state ||
      typeof state !== 'object' ||
      Array.isArray(state)
    ) {

      return res.status(400).json({

        ok: false,

        message:
          'Invalid backup.'

      });

    }


    await saveState(state);


    res.json({

      ok: true,

      state: state

    });

  } catch (err) {

    console.error(
      'TravelEase restore error:',
      err.message
    );

    res.status(500).json({

      ok: false,

      message:
        'Restore failed.'

    });

  }

});


// ===============================
// SERVE FRONTEND
// ===============================

app.use(
  express.static(
    ROOT,
    {
      extensions: ['html']
    }
  )
);


// ===============================
// FRONTEND FALLBACK
// ===============================

app.get('*', (req, res) => {

  if (
    req.path.startsWith('/api/')
  ) {

    return res.status(404).json({

      message:
        'API route not found.'

    });

  }


  res.sendFile(
    path.join(
      ROOT,
      'index.html'
    )
  );

});


// ===============================
// START SERVER
// ===============================

connectMongo().finally(() => {

  app.listen(
    PORT,
    () => {

      console.log(
        `TravelEase running on http://localhost:${PORT}`
      );

    }
  );

});