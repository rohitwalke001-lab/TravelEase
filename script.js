
// =========================================
// DEFAULT BUS DATA
// =========================================
 
let buses = JSON.parse(localStorage.getItem("buses")) || [
 
    {
        name: "Orange Travels",
        from: "Pune",
        to: "Mumbai",
        time: "08:00 AM",
        price: 500
    },
 
    {
        name: "Shivneri Express",
        from: "Pune",
        to: "Nashik",
        time: "09:30 AM", 
        price: 450
    },
 
    {
        name: "Sanjivani Travels",
        from: "Kopargaon",
        to: "Pune",
        time: "07:00 AM",
        price: 600
    },
 
    {
        name: "Red Express",
        from: "Mumbai",
        to: "Goa",
        time: "06:00 PM",
        price: 1200
    },
 
    {
        name: "Maharashtra Travels",
        from: "Nashik",
        to: "Pune",
        time: "07:30 AM",
        price: 550
    }
 
];
 
 
// =========================================
// DEFAULT HOTEL DATA
// =========================================
 
let hotels = JSON.parse(localStorage.getItem("hotels")) || [
 
    {
        name: "Goa Beach Resort",
        location: "Goa",
        price: 2800,
        totalRooms: 20,
        availableRooms: 8
    },
 
    {
        name: "Royal Palace Hotel",
        location: "Jaipur",
        price: 4000,
        totalRooms: 15,
        availableRooms: 5
    },
 
    {
        name: "Mumbai Grand Hotel",
        location: "Mumbai",
        price: 3500,
        totalRooms: 25,
        availableRooms: 10
    },
 
    {
        name: "Mountain View Resort",
        location: "Manali",
        price: 3000,
        totalRooms: 18,
        availableRooms: 0
    }
 
];
 
 
// =========================================
// DEFAULT PACKAGE DATA
// =========================================
 
let packages = JSON.parse(localStorage.getItem("packages")) || [
 
    {
        name: "Budget Goa Package",
        location: "Goa",
        description: "Perfect package for students and budget travellers.",
        price: 7999,
        discount: 10
    },
 
    {
        name: "Family Jaipur Package",
        location: "Jaipur",
        description: "Enjoy a comfortable family vacation.",
        price: 19999,
        discount: 20
    },
 
    {
        name: "Manali Couple Package",
        location: "Manali",
        description: "Special romantic travel package for couples.",
        price: 14999,
        discount: 15
    }
 
];
 
 
// =========================================
// DEFAULT DESTINATIONS
// =========================================
 
let destinations =
JSON.parse(localStorage.getItem("destinations")) || [
 
    {
        name: "Goa",
        emoji: "🌴",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        description: "Goa is famous for beautiful beaches, nightlife, water sports and Portuguese culture.",
        attractions: "Baga Beach, Calangute Beach, Fort Aguada, Panaji"
    },
 
    {
        name: "Jaipur",
        emoji: "🏰",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
        description: "Jaipur is known as the Pink City and is famous for forts, palaces and colourful culture.",
        attractions: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar"
    },
 
    {
        name: "Manali",
        emoji: "🏔️",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80",
        description: "Manali is a beautiful mountain destination famous for snowfall and adventure.",
        attractions: "Solang Valley, Rohtang Pass, Mall Road"
    },
 
    {
        name: "Mumbai",
        emoji: "🌆",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        description: "Mumbai is the City of Dreams and is famous for entertainment and sea views.",
        attractions: "Gateway of India, Marine Drive, Juhu Beach"
    }
 
];
 
 
// =========================================
// BOOKINGS
// =========================================
 
let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];
 
 
// =========================================
// SAVE FUNCTIONS
// =========================================
 
function saveBuses() {
 
    localStorage.setItem(
        "buses",
        JSON.stringify(buses)
    );
 
}
 
 
function saveHotels() {
 
    localStorage.setItem(
        "hotels",
        JSON.stringify(hotels)
    );
 
}
 
 
function savePackages() {
 
    localStorage.setItem(
        "packages",
        JSON.stringify(packages)
    );
 
}
 
 
function saveDestinations() {
 
    localStorage.setItem(
        "destinations",
        JSON.stringify(destinations)
    );
 
}
 
 
function saveBookings() {
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
}
 
 
// =========================================
// NAVBAR
// =========================================
 
function updateNavbar() {
 
    let currentUser =
    localStorage.getItem("currentUser");
 
    let userRole =
    localStorage.getItem("userRole");
 
    let navButtons =
    document.getElementById("navButtons");
 
 
    if (!navButtons) {
 
        return;
 
    }
 
 
    if (
        currentUser &&
        userRole === "customer"
    ) {
 
        navButtons.innerHTML = `
 
            <a
                href="bookings.html"
                class="my-bookings-btn"
            >
                📋 My Bookings
            </a>
 
            <button
                class="register-btn"
                onclick="logout()"
            >
                Logout
            </button>
 
        `;
 
    }
 
    else if (
        currentUser &&
        userRole === "admin"
    ) {
 
        navButtons.innerHTML = `
 
            <a
                href="admin-dashboard.html"
                class="my-bookings-btn"
            >
                📊 Dashboard
            </a>
 
            <button
                class="register-btn"
                onclick="logout()"
            >
                Logout
            </button>
 
        `;
 
    }
 
    else {
 
        navButtons.innerHTML = `
 
            <a
                href="login.html"
                class="login-btn"
            >
                Login
            </a>
 
            <a
                href="register.html"
                class="register-btn"
            >
                Register
            </a>
 
        `;
 
    }
 
}
 
 
// =========================================
// SEARCH BUSES
// =========================================
 
function searchBuses() {
 
    let from =
    document.getElementById("from");
 
    let to =
    document.getElementById("to");
 
    let result =
    document.getElementById("busResults");
 
 
    if (!from || !to || !result) {
 
        return;
 
    }
 
 
    let fromValue =
    from.value.toLowerCase().trim();
 
    let toValue =
    to.value.toLowerCase().trim();
 
 
    let filteredBuses =
    buses.filter(function(bus) {
 
        return (
 
            bus.from
            .toLowerCase()
            .includes(fromValue)
 
            &&
 
            bus.to
            .toLowerCase()
            .includes(toValue)
 
        );
 
    });
 
 
    if (
        filteredBuses.length === 0
    ) {
 
        result.innerHTML = `
 
            <div class="empty-message">
 
                <h3>
                    😔 No Buses Found
                </h3>
 
                <p>
                    Try searching for another route.
                </p>
 
                <button
                    onclick="showAllBuses()"
                    class="primary-btn"
                >
                    Show All Buses
                </button>
 
            </div>
 
        `;
 
        return;
 
    }
 
 
    displayBuses(filteredBuses);
 
}
 
 
// =========================================
// DISPLAY BUSES
// =========================================
 
function displayBuses(busList) {
 
    let result =
    document.getElementById("busResults");
 
 
    if (!result) {
 
        return;
 
    }
 
 
    result.innerHTML = "";
 
 
    busList.forEach(function(bus) {
 
        let index =
        buses.findIndex(function(item) {
 
            return (
 
                item.name === bus.name &&
                item.from === bus.from &&
                item.to === bus.to &&
                item.time === bus.time
 
            );
 
        });
 
 
        result.innerHTML += `
 
            <div class="bus-card-new">
 
                <div class="bus-company">
 
                    <div class="bus-icon-large">
                        🚌
                    </div>
 
                    <div>
 
                        <h3>
                            ${bus.name}
                        </h3>
 
                        <span>
                            Verified Travel Partner
                        </span>
 
                    </div>
 
                </div>
 
 
                <div class="bus-route">
 
                    <div>
 
                        <strong>
                            ${bus.from}
                        </strong>
 
                        <p>
                            Departure
                        </p>
 
                    </div>
 
 
                    <div class="route-line">
 
                        ───── 🚌 ─────
 
                    </div>
 
 
                    <div>
 
                        <strong>
                            ${bus.to}
                        </strong>
 
                        <p>
                            Destination
                        </p>
 
                    </div>
 
                </div>
 
 
                <div class="bus-time">
 
                    🕒 ${bus.time}
 
                </div>
 
 
                <div class="bus-booking-price">
 
                    <h2>
                        ₹${bus.price}
                    </h2>
 
                    <p>
                        Per Passenger
                    </p>
 
 
                    <button
                        class="primary-btn"
                        onclick="openBusBooking(${index})"
                    >
                        Book Now
                    </button>
 
                </div>
 
            </div>
 
        `;
 
    });
 
}
 
 
// =========================================
// SHOW ALL BUSES
// =========================================
 
function showAllBuses() {
 
    displayBuses(buses);
 
}
 
 
// =========================================
// HOME BUS SEARCH
// =========================================
 
function homeBusSearch() {
 
    let from =
    document.getElementById("homeFrom");
 
    let to =
    document.getElementById("homeTo");
 
 
    if (!from || !to) {
 
        return;
 
    }
 
 
    localStorage.setItem(
        "searchFrom",
        from.value
    );
 
 
    localStorage.setItem(
        "searchTo",
        to.value
    );
 
 
    window.location.href =
    "buses.html";
 
}
 
 
// =========================================
// LOAD SEARCH VALUES
// =========================================
 
function loadSearchValues() {
 
    let from =
    localStorage.getItem("searchFrom");
 
    let to =
    localStorage.getItem("searchTo");
 
 
    let fromInput =
    document.getElementById("from");
 
    let toInput =
    document.getElementById("to");
 
 
    if (fromInput && from) {
 
        fromInput.value = from;
 
    }
 
 
    if (toInput && to) {
 
        toInput.value = to;
 
    }
 
 
    if (from || to) {
 
        searchBuses();
 
        localStorage.removeItem("searchFrom");
 
        localStorage.removeItem("searchTo");
 
    }
 
}
 
 
// =========================================
// OPEN BUS BOOKING
// =========================================
 
function openBusBooking(index) {
 
    let user =
    localStorage.getItem("currentUser");
 
    let role =
    localStorage.getItem("userRole");
 
 
    if (
        !user ||
        role !== "customer"
    ) {
 
        alert(
            "Please login as a customer first!"
        );
 
        window.location.href =
        "login.html";
 
        return;
 
    }
 
 
    localStorage.setItem(
        "selectedBus",
        JSON.stringify(buses[index])
    );
 
 
    window.location.href =
    "bus-booking.html";
 
}
 
 
// =========================================
// LOAD BUS BOOKING
// =========================================
 
function loadBusBooking() {
 
    let bus =
    JSON.parse(
        localStorage.getItem("selectedBus")
    );
 
 
    let details =
    document.getElementById(
        "selectedBusDetails"
    );
 
 
    if (!bus || !details) {
 
        return;
 
    }
 
 
    details.innerHTML = `
 
        <div class="booking-summary">
 
            <h2>
                🚌 ${bus.name}
            </h2>
 
            <p>
                📍 ${bus.from}
                →
                ${bus.to}
            </p>
 
            <p>
                🕒 ${bus.time}
            </p>
 
            <h3>
                ₹${bus.price}
                Per Passenger
            </h3>
 
        </div>
 
    `;
 
}
 
 
// =========================================
// CONFIRM BUS BOOKING
// =========================================
 
function confirmBusBooking() {
 
    let bus =
    JSON.parse(
        localStorage.getItem("selectedBus")
    );
 
 
    let date =
    document.getElementById("travelDate");
 
    let passengers =
    document.getElementById("passengers");
 
 
    if (
        !bus ||
        !date ||
        !passengers
    ) {
 
        return;
 
    }
 
 
    if (
        !date.value ||
        !passengers.value
    ) {
 
        alert(
            "Please select date and passengers!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // PREVENT PAST DATE BOOKING
    // =========================================
 
    let selectedDate =
    new Date(date.value);
 
    selectedDate.setHours(
        0, 0, 0, 0
    );
 
 
    let today =
    new Date();
 
    today.setHours(
        0, 0, 0, 0
    );
 
 
    if (selectedDate < today) {
 
        alert(
            "You cannot book a bus for a past date!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // CALCULATE TOTAL
    // =========================================
 
    let total =
    bus.price *
    Number(passengers.value);
 
 
    let booking = {
 
        customer:
        localStorage.getItem("currentUser"),
 
        type:
        "Bus",
 
        name:
        bus.name,
 
        location:
        bus.from +
        " → " +
        bus.to,
 
        date:
        date.value,
 
        passengers:
        passengers.value,
 
        price:
        total,
 
        status:
        "Pending Payment"
 
    };
 
 
    localStorage.setItem(
        "pendingBooking",
        JSON.stringify(booking)
    );
 
 
    window.location.href =
    "payment.html";
 
}
// =========================================
// SHOW HOTELS
// =========================================
 
function showHotels() {
 
    let container =
    document.getElementById("hotelResults");
 
 
    if (!container) {
 
        return;
 
    }
 
 
    container.innerHTML = "";
 
 
    hotels.forEach(function(hotel, index) {
 
        let available =
        Number(hotel.availableRooms);
 
        let status = "";
 
        let button = "";
 
 
        if (available <= 0) {
 
            status = `
 
                <span class="hotel-unavailable">
                    ❌ Fully Occupied
                </span>
 
            `;
 
 
            button = `
 
                <button disabled>
                    Not Available
                </button>
 
            `;
 
        }
 
        else {
 
            status = `
 
                <span class="hotel-available">
                    ✅ ${available} Rooms Available
                </span>
 
            `;
 
 
            button = `
 
                <button
                    class="primary-btn"
                    onclick="openHotelBooking(${index})"
                >
                    Book Hotel
                </button>
 
            `;
 
        }
 
 
        container.innerHTML += `
 
            <div class="hotel-card">
 
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                >
 
 
                <div class="hotel-content">
 
                    <h2>
                        🏨 ${hotel.name}
                    </h2>
 
                    <p>
                        📍 ${hotel.location}
                    </p>
 
                    <p>
                        ⭐ 4.5 Rating
                    </p>
 
                    ${status}
 
                    <h3>
                        ₹${hotel.price}
                        <small>/ Night</small>
                    </h3>
 
                    ${button}
 
                </div>
 
            </div>
 
        `;
 
    });
 
}
 
 
// =========================================
// OPEN HOTEL BOOKING
// =========================================
 
function openHotelBooking(index) {
 
    let user =
    localStorage.getItem("currentUser");
 
    let role =
    localStorage.getItem("userRole");
 
 
    if (
        !user ||
        role !== "customer"
    ) {
 
        alert(
            "Please login as customer first!"
        );
 
        window.location.href =
        "login.html";
 
        return;
 
    }
 
 
    localStorage.setItem(
        "selectedHotel",
        JSON.stringify({
 
            hotel:
            hotels[index],
 
            index:
            index
 
        })
    );
 
 
    window.location.href =
    "hotel-booking.html";
 
}
 
 
// =========================================
// LOAD HOTEL BOOKING
// =========================================
 
function loadHotelBooking() {
 
    let data =
    JSON.parse(
        localStorage.getItem("selectedHotel")
    );
 
 
    let details =
    document.getElementById(
        "selectedHotelDetails"
    );
 
 
    if (!data || !details) {
 
        return;
 
    }
 
 
    let hotel =
    data.hotel;
 
 
    details.innerHTML = `
 
        <div class="booking-summary">
 
            <h2>
                🏨 ${hotel.name}
            </h2>
 
            <p>
                📍 ${hotel.location}
            </p>
 
            <p>
                🛏️ ${hotel.availableRooms}
                Rooms Available
            </p>
 
            <h3>
                ₹${hotel.price}
                Per Night
            </h3>
 
        </div>
 
    `;
 
}
 
 
// =========================================
// CALCULATE NIGHTS
// =========================================
 
function calculateNights(checkIn, checkOut) {
 
    let start =
    new Date(checkIn);
 
    let end =
    new Date(checkOut);
 
    let difference =
    end - start;
 
 
    return Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );
 
}
 
 
// =========================================
// CONFIRM HOTEL BOOKING
// =========================================
 
function confirmHotelBooking() {
 
    let data =
    JSON.parse(
        localStorage.getItem("selectedHotel")
    );
 
 
    if (!data) {
 
        return;
 
    }
 
 
    let checkIn =
    document.getElementById("checkIn").value;
 
    let checkOut =
    document.getElementById("checkOut").value;
 
    let rooms =
    Number(
        document.getElementById("rooms").value
    );
 
    let guests =
    document.getElementById("guests").value;
 
 
    // =========================================
    // CHECK EMPTY FIELDS
    // =========================================
 
    if (
        !checkIn ||
        !checkOut ||
        !rooms ||
        !guests
    ) {
 
        alert(
            "Please fill all booking details!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // PREVENT PAST DATE BOOKING
    // =========================================
 
    let today =
    new Date();
 
    today.setHours(
        0, 0, 0, 0
    );
 
 
    let checkInDate =
    new Date(checkIn);
 
    checkInDate.setHours(
        0, 0, 0, 0
    );
 
 
    let checkOutDate =
    new Date(checkOut);
 
    checkOutDate.setHours(
        0, 0, 0, 0
    );
 
 
    // Check past check-in date
 
    if (checkInDate < today) {
 
        alert(
            "You cannot select a past check-in date!"
        );
 
        return;
 
    }
 
 
    // Check past check-out date
 
    if (checkOutDate < today) {
 
        alert(
            "You cannot select a past check-out date!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // CHECK CHECK-OUT AFTER CHECK-IN
    // =========================================
 
    let nights =
    calculateNights(
        checkIn,
        checkOut
    );
 
 
    if (nights <= 0) {
 
        alert(
            "Check-out date must be after check-in!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // CHECK ROOM AVAILABILITY
    // =========================================
 
    let hotel =
    hotels[data.index];
 
 
    if (
        rooms >
        hotel.availableRooms
    ) {
 
        alert(
            "Only " +
            hotel.availableRooms +
            " rooms available!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // CALCULATE TOTAL
    // =========================================
 
    let total =
    hotel.price *
    nights *
    rooms;
 
 
    let booking = {
 
        customer:
        localStorage.getItem("currentUser"),
 
        type:
        "Hotel",
 
        name:
        hotel.name,
 
        location:
        hotel.location,
 
        checkIn:
        checkIn,
 
        checkOut:
        checkOut,
 
        nights:
        nights,
 
        rooms:
        rooms,
 
        guests:
        guests,
 
        hotelIndex:
        data.index,
 
        price:
        total,
 
        status:
        "Pending Payment"
 
    };
 
 
    localStorage.setItem(
        "pendingBooking",
        JSON.stringify(booking)
    );
 
 
    window.location.href =
    "payment.html";
 
}
// =========================================
// SHOW PACKAGES
// =========================================
 
function showPackages() {
 
    let container =
    document.getElementById(
        "packagesContainer"
    );
 
 
    if (!container) {
 
        return;
 
    }
 
 
    container.innerHTML = "";
 
 
    packages.forEach(
        function(pkg, index) {
 
            container.innerHTML += `
 
                <div class="package-card">
 
                    <div class="package-emoji">
 
                        ${pkg.emoji || "🎁"}
 
                    </div>
 
 
                    <h2>
 
                        ${pkg.name}
 
                    </h2>
 
 
                    <p>
 
                        📍 ${pkg.location}
 
                    </p>
 
 
                    <p>
 
                        ${pkg.description}
 
                    </p>
 
 
                    <h3>
 
                        ₹${pkg.price}
 
                    </h3>
 
 
                    <p>
 
                        🎉 ${pkg.discount}% Discount
 
                    </p>
 
 
                    <button
                        class="primary-btn"
                        onclick="selectPackage(${index})"
                    >
 
                        Book Now
 
                    </button>
 
 
                </div>
 
            `;
 
        }
    );
 
}
function selectPackage(index) {
 
    // CHECK IF CUSTOMER IS LOGGED IN
 
    let currentUser =
    localStorage.getItem(
        "currentUser"
    );
 
 
    if (!currentUser) {
 
        alert(
            "Please login first to book a travel package!"
        );
 
 
        window.location.href =
        "login.html";
 
 
        return;
 
    }
 
 
    let pkg =
    packages[index];
 
 
    if (!pkg) {
 
        alert(
            "Package not found!"
        );
 
        return;
 
    }
 
 
    // SAVE SELECTED PACKAGE
 
    localStorage.setItem(
        "selectedPackage",
        JSON.stringify(pkg)
    );
 
 
    // GO TO PACKAGE BOOKING PAGE
 
    window.location.href =
    "package-booking.html";
 
}
// =========================================
// OPEN PACKAGE BOOKING
// =========================================
 
function openPackageBooking(index) {
 
let user =
localStorage.getItem(
    "currentUser"
);
 
 
let role =
localStorage.getItem(
    "userRole"
);
 
 
if (
    !user ||
    role !== "customer"
) {
 
    alert(
        "Please login as customer first!"
    );
 
 
    window.location.href =
    "login.html";
 
 
    return;
 
}
 
 
localStorage.setItem(
    "selectedPackage",
    JSON.stringify({
 
        package:
        packages[index],
 
        index:
        index
 
    })
);
 
 
window.location.href =
"package-booking.html";
 
}
 
 
 
// =========================================
// LOAD PACKAGE BOOKING
// =========================================
 
function loadPackageBooking() {
 
    let data =
    JSON.parse(
        localStorage.getItem(
            "selectedPackage"
        )
    );
 
 
    let details =
    document.getElementById(
        "selectedPackageDetails"
    );
 
 
    if (!data || !details) {
 
        return;
 
    }
 
 
    // =========================================
    // GET PACKAGE DATA
    // =========================================
 
    let pkg =
    data.package || data;
 
 
    // =========================================
    // CHECK PACKAGE
    // =========================================
 
    if (!pkg.name) {
 
        details.innerHTML = `
 
            <div class="booking-summary">
 
                <h2>
                    Package Not Found 😔
                </h2>
 
                <p>
                    Please go back and select a package.
                </p>
 
            </div>
 
        `;
 
        return;
 
    }
 
 
    // =========================================
    // DISPLAY PACKAGE DETAILS
    // =========================================
 
    details.innerHTML = `
 
        <div class="booking-summary">
 
 
            <div class="package-booking-emoji">
 
                ${pkg.emoji || "🎁"}
 
            </div>
 
 
            <h2>
 
                ${pkg.name}
 
            </h2>
 
 
            <p class="package-location">
 
                📍 ${pkg.location || "N/A"}
 
            </p>
 
 
            <p class="package-description">
 
                ${pkg.description || "No description available"}
 
            </p>
 
 
            <div class="package-price">
 
                ₹${pkg.price || 0}
 
            </div>
 
 
            <div class="package-discount">
 
                🎉 ${pkg.discount || 0}% Discount
 
            </div>
 
 
        </div>
 
    `;
 
}
 
// =========================================
// CONFIRM PACKAGE BOOKING
// =========================================
 
function confirmPackageBooking() {
 
    let data =
    JSON.parse(
        localStorage.getItem(
            "selectedPackage"
        )
    );
 
 
    // =========================================
    // CHECK PACKAGE DATA
    // =========================================
 
    if (!data) {
 
        alert(
            "Package details not found!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // GET PACKAGE
    // =========================================
 
    let pkg =
    data.package || data;
 
 
    // =========================================
    // GET INPUT VALUES
    // =========================================
 
    let date =
    document.getElementById(
        "packageDate"
    );
 
 
    let guests =
    document.getElementById(
        "packageGuests"
    );
 
 
    // =========================================
    // CHECK INPUTS
    // =========================================
 
    if (
        !date ||
        !guests
    ) {
 
        return;
 
    }
 
 
    if (
        !date.value ||
        !guests.value ||
        Number(guests.value) <= 0
    ) {
 
        alert(
            "Please select travel date and number of guests!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // PREVENT PAST DATE BOOKING
    // =========================================
 
    let selectedDate =
    new Date(
        date.value
    );
 
 
    selectedDate.setHours(
        0,
        0,
        0,
        0
    );
 
 
    let today =
    new Date();
 
 
    today.setHours(
        0,
        0,
        0,
        0
    );
 
 
    if (
        selectedDate < today
    ) {
 
        alert(
            "You cannot book a package for a past date!"
        );
 
        return;
 
    }
 
 
    // =========================================
    // CALCULATE PRICE
    // =========================================
 
    let total =
    Number(pkg.price) *
    Number(guests.value);
 
 
    // =========================================
    // APPLY DISCOUNT
    // =========================================
 
    let discount =
    Number(pkg.discount) || 0;
 
 
    let discountAmount =
    (
        total *
        discount
    ) / 100;
 
 
    let finalPrice =
    total -
    discountAmount;
 
 
    // =========================================
    // CREATE BOOKING
    // =========================================
 
    let booking = {
 
        customer:
        localStorage.getItem(
            "currentUser"
        ),
 
        type:
        "Package",
 
        name:
        pkg.name,
 
        location:
        pkg.location,
 
        description:
        pkg.description,
 
        date:
        date.value,
 
        guests:
        guests.value,
 
        originalPrice:
        total,
 
        discount:
        discount,
 
        price:
        finalPrice,
 
        status:
        "Pending Payment"
 
    };
 
 
    // =========================================
    // SAVE PENDING BOOKING
    // =========================================
 
    localStorage.setItem(
        "pendingBooking",
        JSON.stringify(booking)
    );
 
 
    // =========================================
    // GO TO PAYMENT PAGE
    // =========================================
 
    window.location.href =
    "payment.html";
 
}
 
function setMinimumDates() {
 
    let today = new Date().toISOString().split("T")[0];
 
    let travelDate = document.getElementById("travelDate");
    let checkIn = document.getElementById("checkIn");
    let checkOut = document.getElementById("checkOut");
 
    if (travelDate) {
        travelDate.min = today;
    }
 
    if (checkIn) {
        checkIn.min = today;
 
        checkIn.addEventListener("change", function () {
            checkOut.min = checkIn.value;
        });
    }
 
    if (checkOut) {
        checkOut.min = today;
    }
}
 
// =========================================
// SHOW DESTINATIONS
// =========================================
 
function showDestinations() {
 
    let container =
    document.getElementById(
        "destinationResults"
    );
 
 
    if (!container) {
 
        return;
 
    }
 
 
    container.innerHTML = "";
 
 
    destinations.forEach(
        function(destination, index) {
 
            container.innerHTML += `
 
                <div class="destination-card-new">
 
                    <img
                        src="${destination.image}"
                    >
 
                    <div class="destination-content">
 
                        <h2>
 
                            ${destination.emoji}
                            ${destination.name}
 
                        </h2>
 
                        <p>
                            ${destination.description}
                        </p>
 
                        <button
                            class="primary-btn"
                            onclick="exploreDestination(${index})"
                        >
                            Explore More
                        </button>
 
                    </div>
 
                </div>
 
            `;
 
        }
    );
 
}
 
 
// =========================================
// EXPLORE DESTINATION
// =========================================
 
function exploreDestination(index) {
 
    localStorage.setItem(
        "selectedDestination",
        JSON.stringify(
            destinations[index]
        )
    );
 
 
    window.location.href =
    "destination-details.html";
 
}
 
 
// =========================================
// LOAD DESTINATION DETAILS
// =========================================
 
function loadDestinationDetails() {
 
    let destination =
    JSON.parse(
        localStorage.getItem(
            "selectedDestination"
        )
    );
 
 
    let container =
    document.getElementById(
        "destinationDetails"
    );
 
 
    if (
        !destination ||
        !container
    ) {
 
        return;
 
    }
 
 
    container.innerHTML = `
 
        <div class="destination-details-card">
 
            <img
                src="${destination.image}"
            >
 
            <div class="destination-details-content">
 
                <h1>
 
                    ${destination.emoji}
                    ${destination.name}
 
                </h1>
 
                <p>
                    ${destination.description}
                </p>
 
                <h3>
                    ⭐ Famous Places To Visit
                </h3>
 
                <p>
                    ${destination.attractions}
                </p>
 
                <button
                    class="primary-btn"
                    onclick="addDestinationToVisit()"
                >
                    ❤️ Add Destination To Visit
                </button>
 
            </div>
 
        </div>
 
    `;
 
}
 
 
// =========================================
// ADD DESTINATION TO VISIT
// =========================================
 
function addDestinationToVisit() {
 
    let destination =
    JSON.parse(
        localStorage.getItem(
            "selectedDestination"
        )
    );
 
 
    if (!destination) {
 
        return;
 
    }
 
 
    let user =
    localStorage.getItem("currentUser");
 
    let role =
    localStorage.getItem("userRole");
 
 
    if (
        !user ||
        role !== "customer"
    ) {
 
        alert(
            "Please login as customer first!"
        );
 
        window.location.href =
        "login.html";
 
        return;
 
    }
 
 
    let visitList =
    JSON.parse(
        localStorage.getItem(
            "visitList"
        )
    ) || [];
 
 
    let alreadyAdded =
    visitList.some(function(item) {
 
        return (
 
            item.name === destination.name &&
            item.customer === user
 
        );
 
    });
 
 
    if (alreadyAdded) {
 
        alert(
            "Destination is already added!"
        );
 
        return;
 
    }
 
 
    visitList.push({
 
        customer:
        user,
 
        name:
        destination.name,
 
        emoji:
        destination.emoji
 
    });
 
 
    localStorage.setItem(
        "visitList",
        JSON.stringify(visitList)
    );
 
 
    alert(
        destination.name +
        " added to your visit list ❤️"
    );
 
}
// =========================================
// GO TO VISIT LIST
// =========================================
 
function goToVisitList() {
 
    let user =
    localStorage.getItem("currentUser");
 
    let role =
    localStorage.getItem("userRole");
 
 
    if (
        !user ||
        role !== "customer"
    ) {
 
        alert(
            "Please login as customer first!"
        );
 
        window.location.href =
        "login.html";
 
        return;
 
    }
 
 
    window.location.href =
    "visit-list.html";
 
}
// =========================================
// LOAD PAYMENT DETAILS
// =========================================
 
function loadPaymentDetails() {
 
    let booking =
    JSON.parse(
        localStorage.getItem(
            "pendingBooking"
        )
    );
 
 
    let details =
    document.getElementById(
        "paymentDetails"
    );
 
 
    if (
        !booking ||
        !details
    ) {
 
        return;
 
    }
 
 
    let extra = "";
 
 
    if (
        booking.type === "Bus"
    ) {
 
        extra = `
 
            <p>
                <strong>Travel Date:</strong>
                ${booking.date}
            </p>
 
            <p>
                <strong>Passengers:</strong>
                ${booking.passengers}
            </p>
 
        `;
 
    }
 
    else if (
        booking.type === "Hotel"
    ) {
 
        extra = `
 
            <p>
                <strong>Check-In:</strong>
                ${booking.checkIn}
            </p>
 
            <p>
                <strong>Check-Out:</strong>
                ${booking.checkOut}
            </p>
 
            <p>
                <strong>Nights:</strong>
                ${booking.nights}
            </p>
 
            <p>
                <strong>Rooms:</strong>
                ${booking.rooms}
            </p>
 
            <p>
                <strong>Guests:</strong>
                ${booking.guests}
            </p>
 
        `;
 
    }
 
    else if (
        booking.type === "Package"
    ) {
 
        extra = `
 
            <p>
                <strong>Travel Date:</strong>
                ${booking.date}
            </p>
 
            <p>
                <strong>Guests:</strong>
                ${booking.guests}
            </p>
 
            <p>
                <strong>Discount:</strong>
                ${booking.discount}%
            </p>
 
        `;
 
    }
 
 
    details.innerHTML = `
 
        <div class="payment-booking-info">
 
            <h2>
                ${booking.type} Booking
            </h2>
 
            <p>
                <strong>Name:</strong>
                ${booking.name}
            </p>
 
            <p>
                <strong>Location:</strong>
                ${booking.location}
            </p>
 
            ${extra}
 
            <hr>
 
            <h2>
                Total Amount:
                ₹${booking.price}
            </h2>
 
        </div>
 
    `;
 
}
 
 
// =========================================
// PROCESS PAYMENT
// =========================================
 
function processPayment() {
 
    let booking =
    JSON.parse(
        localStorage.getItem(
            "pendingBooking"
        )
    );
 
 
    if (!booking) {
 
        alert(
            "Booking information not found!"
        );
 
        window.location.href =
        "index.html";
 
        return;
 
    }
 
 
    let paymentMethod =
    document.querySelector(
        'input[name="payment"]:checked'
    );
 
 
    if (!paymentMethod) {
 
        alert(
            "Please select payment method!"
        );
 
        return;
 
    }
 
 
    let confirmPayment =
    confirm(
        "Pay ₹" +
        booking.price +
        " using " +
        paymentMethod.value +
        "?"
    );
 
 
    if (!confirmPayment) {
 
        return;
 
    }
 
 
    if (
        booking.type === "Hotel"
    ) {
 
        let hotel =
        hotels[booking.hotelIndex];
 
 
        if (!hotel) {
 
            alert(
                "Hotel not found!"
            );
 
            return;
 
        }
 
 
        if (
            Number(booking.rooms) >
            Number(hotel.availableRooms)
        ) {
 
            alert(
                "Sorry! Rooms are no longer available."
            );
 
            return;
 
        }
 
 
        hotel.availableRooms -=
        Number(booking.rooms);
 
 
        saveHotels();
 
    }
 
 
    booking.paymentMethod =
    paymentMethod.value;
 
 
    booking.status =
    "Confirmed";
 
 
    booking.bookingId =
    "TE" +
    Date.now();
 
 
    bookings.push(booking);
 
    saveBookings();
 
    // =========================================
    // ADD PAYMENT TO OWNER REVENUE
    // =========================================
 
    let ownerRevenue =
        Number(
            localStorage.getItem("ownerRevenue")
        ) || 0;
 
    ownerRevenue +=
        Number(booking.price) || 0;
 
    localStorage.setItem(
        "ownerRevenue",
        ownerRevenue.toString()
    );
    localStorage.setItem(
        "latestBill",
        JSON.stringify(booking)
    );
 
 
    localStorage.removeItem(
        "pendingBooking"
    );
 
    localStorage.removeItem(
        "selectedBus"
    );
 
    localStorage.removeItem(
        "selectedHotel"
    );
 
    localStorage.removeItem(
        "selectedPackage"
    );
 
 
    alert(
        "Payment successful! 🎉 Booking confirmed."
    );
 
 
    window.location.href =
    "bill.html";
 
}
 
 
// =========================================
// =========================================
// CUSTOMER PASSWORD HELPERS
// Passwords are hashed with PBKDF2 before they are stored in localStorage.
// This is a client-side improvement, not a substitute for server-side auth.
// =========================================
 
async function hashCustomerPassword(password, saltBase64) {
    if (!window.crypto || !window.crypto.subtle) {
        throw new Error("Secure password storage requires HTTPS or a supported secure browser.");
    }
 
    const encoder = new TextEncoder();
    const salt = saltBase64
        ? Uint8Array.from(atob(saltBase64), char => char.charCodeAt(0))
        : window.crypto.getRandomValues(new Uint8Array(16));
 
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
 
    const derivedBits = await window.crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 210000,
            hash: "SHA-256"
        },
        keyMaterial,
        256
    );
 
    const hashBytes = new Uint8Array(derivedBits);
    const hashBase64 = btoa(String.fromCharCode.apply(null, hashBytes));
    const saltEncoded = btoa(String.fromCharCode.apply(null, salt));
 
    return { passwordHash: hashBase64, passwordSalt: saltEncoded };
}
 
async function verifyCustomerPassword(password, user) {
    if (user.passwordHash && user.passwordSalt) {
        const calculated = await hashCustomerPassword(password, user.passwordSalt);
        return calculated.passwordHash === user.passwordHash;
    }
 
    // One-time compatibility for old accounts that stored plaintext passwords.
    // A successful login immediately upgrades that record to PBKDF2.
    return typeof user.password === "string" && user.password === password;
}
 
 
// =========================================
// REGISTER USER
// =========================================
 
async function registerUser() {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
 
    const name = nameField ? nameField.value.trim() : "";
    const email = emailField ? emailField.value.trim().toLowerCase() : "";
    const password = passwordField ? passwordField.value : "";
 
    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }
    if (password.length < 8) {
        alert("Please use a password with at least 8 characters.");
        return;
    }
 
    try {
        const passwordData = await hashCustomerPassword(password);
        const response = await fetch(window.location.origin + "/api/auth/customer-register", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            cache: "no-store",
            body: JSON.stringify({
                name: name,
                email: email,
                passwordHash: passwordData.passwordHash,
                passwordSalt: passwordData.passwordSalt
            })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
            throw new Error(result.message || "Registration failed. Please try again.");
        }
        alert("Registration successful! Please log in.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("TravelEase customer registration failed:", error);
        alert(error.message || "Unable to register. Please check your connection and try again.");
    }
}
 
 
// CUSTOMER LOGIN
// =========================================
 
async function loginUser() {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
 
    const email = emailField ? emailField.value.trim().toLowerCase() : "";
    const password = passwordField ? passwordField.value : "";
 
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }
 
    try {
        const saltResponse = await fetch(
            window.location.origin + "/api/auth/customer-salt?email=" + encodeURIComponent(email),
            { method: "GET", headers: { "Accept": "application/json" }, cache: "no-store" }
        );
        const saltResult = await saltResponse.json().catch(() => ({}));
        if (!saltResponse.ok || !saltResult.ok || !saltResult.passwordSalt) {
            throw new Error(saltResult.message || "Customer account not found on the server. Please register first.");
        }
 
        const passwordData = await hashCustomerPassword(password, saltResult.passwordSalt);
        const loginResponse = await fetch(window.location.origin + "/api/auth/customer-login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            cache: "no-store",
            body: JSON.stringify({ email: email, passwordHash: passwordData.passwordHash })
        });
        const loginResult = await loginResponse.json().catch(() => ({}));
        if (!loginResponse.ok || !loginResult.ok || !loginResult.token) {
            throw new Error(loginResult.message || "Invalid email or password.");
        }
 
        localStorage.setItem("customerToken", loginResult.token);
        localStorage.setItem("currentUser", loginResult.user.email);
        localStorage.setItem("currentUserName", loginResult.user.name || "");
        localStorage.setItem("userRole", "customer");
 
        const bookingsResponse = await fetch(window.location.origin + "/api/customer/bookings", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + loginResult.token
            },
            cache: "no-store"
        });
        if (bookingsResponse.ok) {
            const bookingsResult = await bookingsResponse.json().catch(() => ({}));
            if (bookingsResult.ok && Array.isArray(bookingsResult.bookings)) {
                localStorage.setItem("bookings", JSON.stringify(bookingsResult.bookings));
            }
        }
 
        alert("Login successful!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("TravelEase customer login failed:", error);
        alert(error.message || "Unable to log in. Please check your connection and try again.");
    }
}
 
 
// LOGOUT
// =========================================
 
function logout() {
 
    localStorage.removeItem(
        "currentUser"
    );
 
    localStorage.removeItem(
        "userRole"
    );
 
 
    window.location.href =
    "index.html";
 
}
// =========================================
// SHOW CUSTOMER BOOKINGS
// =========================================
 
function showBookings() {
 
    let table =
    document.getElementById(
        "bookingTable"
    );
 
 
    if (!table) {
 
        return;
 
    }
 
 
    let currentUser =
    localStorage.getItem(
        "currentUser"
    );
 
 
    if (!currentUser) {
 
        return;
 
    }
 
 
    let userBookings =
    bookings.filter(function(booking) {
 
        return (
            booking.customer ===
            currentUser
        );
 
    });
 
 
    table.innerHTML = "";
 
 
    if (
        userBookings.length === 0
    ) {
 
        table.innerHTML = `
 
            <tr>
 
                <td colspan="6">
 
                    No bookings yet 😔
 
                </td>
 
            </tr>
 
        `;
 
        updateBookingStats(userBookings);
 
        return;
 
    }
 
 
    userBookings.forEach(function(booking) {
 
        let index =
        bookings.indexOf(booking);
 
 
        table.innerHTML += `
 
            <tr>
 
                <td>
                    ${booking.type}
                </td>
 
                <td>
                    ${booking.name}
                </td>
 
                <td>
                    ${booking.location}
                </td>
 
                <td>
                    ₹${booking.price}
                </td>
 
                <td>
                    ${booking.status}
                </td>
 
                <td>
 
                    <button
                        onclick="viewBookingBill(${index})"
                    >
                        Bill
                    </button>
 
                    <button
                        onclick="cancelBooking(${index})"
                    >
                        Cancel
                    </button>
 
                </td>
 
            </tr>
 
        `;
 
    });
 
 
    updateBookingStats(userBookings);
 
}
 
 
// =========================================
// UPDATE BOOKING STATS
// =========================================
 
function updateBookingStats(userBookings) {
 
    let busCount = 0;
 
    let hotelCount = 0;
 
    let packageCount = 0;
 
    let totalSpent = 0;
 
 
    userBookings.forEach(function(booking) {
 
        if (booking.type === "Bus") {
 
            busCount++;
 
        }
 
        else if (booking.type === "Hotel") {
 
            hotelCount++;
 
        }
 
        else if (booking.type === "Package") {
 
            packageCount++;
 
        }
 
 
        totalSpent +=
        Number(booking.price) || 0;
 
    });
 
 
    let busBookingCount =
    document.getElementById(
        "busBookingCount"
    );
 
    let hotelBookingCount =
    document.getElementById(
        "hotelBookingCount"
    );
 
    let packageBookingCount =
    document.getElementById(
        "packageBookingCount"
    );
 
    let totalSpentElement =
    document.getElementById(
        "totalSpent"
    );
 
 
    if (busBookingCount) {
 
        busBookingCount.innerText =
        busCount;
 
    }
 
 
    if (hotelBookingCount) {
 
        hotelBookingCount.innerText =
        hotelCount;
 
    }
 
 
    if (packageBookingCount) {
 
        packageBookingCount.innerText =
        packageCount;
 
    }
 
 
    if (totalSpentElement) {
 
        totalSpentElement.innerText =
        "₹" + totalSpent;
 
    }
 
}
 
 
// =========================================
// VIEW BOOKING BILL
// =========================================
 
function viewBookingBill(index) {
 
    localStorage.setItem(
        "latestBill",
        JSON.stringify(
            bookings[index]
        )
    );
 
 
    window.location.href =
    "bill.html";
 
}
 
 
// =========================================
// CANCEL BOOKING
// =========================================
 
// =========================================
// CANCEL BOOKING
// REFUND CUSTOMER
// REDUCE OWNER REVENUE ONCE
// CREATE OWNER NOTIFICATION
// =========================================
 
// =========================================
// CANCEL BOOKING
// =========================================
 
function cancelBooking(index)
{
    let bookingsData =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];
 
    let booking =
        bookingsData[index];
 
    if(!booking)
    {
        alert("Booking not found!");
        return;
    }
 
 
    // =========================================
    // CHECK CURRENT STATUS
    // =========================================
 
    let status =
        (booking.status || "Confirmed")
        .trim()
        .toLowerCase();
 
    if(status === "cancelled")
    {
        alert("This booking is already cancelled.");
        return;
    }
 
    if(status === "expired")
    {
        alert("Expired bookings cannot be cancelled.");
        return;
    }
 
    if(status === "pending payment")
    {
        alert("Pending payment bookings cannot be cancelled.");
        return;
    }
 
 
    // =========================================
    // CONFIRM CANCELLATION
    // =========================================
 
    let confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );
 
    if(!confirmCancel)
    {
        return;
    }
 
 
    // =========================================
    // BOOKING AMOUNT
    // =========================================
 
    let bookingAmount =
        Number(booking.price) || 0;
 
 
    // =========================================
    // RESTORE HOTEL ROOMS
    // =========================================
 
    if(booking.type === "Hotel")
    {
        let hotelsData =
            JSON.parse(
                localStorage.getItem("hotels")
            ) || [];
 
        let hotel =
            hotelsData.find(
                function(item)
                {
                    return (
                        item.name ===
                        booking.name
                    );
                }
            );
 
        if(hotel)
        {
            let rooms =
                Number(booking.rooms) || 0;
 
            hotel.availableRooms =
                Number(hotel.availableRooms || 0)
                + rooms;
 
            localStorage.setItem(
                "hotels",
                JSON.stringify(hotelsData)
            );
 
            // Keep global hotels array updated
            hotels = hotelsData;
        }
    }
 
 
    // =========================================
    // REFUND CUSTOMER
    // =========================================
 
    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];
 
    let customer =
        users.find(
            function(user)
            {
                return (
                    user.email ===
                    booking.customer
                );
            }
        );
 
    if(customer)
    {
        customer.balance =
            Number(customer.balance || 0)
            + bookingAmount;
 
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
    }
 
 
    // =========================================
    // REDUCE OWNER REVENUE ONLY ONCE
    // =========================================
 
    if(booking.refunded !== true)
    {
        let ownerRevenue =
            Number(
                localStorage.getItem(
                    "ownerRevenue"
                )
            ) || 0;
 
        ownerRevenue =
            ownerRevenue - bookingAmount;
 
        if(ownerRevenue < 0)
        {
            ownerRevenue = 0;
        }
 
        localStorage.setItem(
            "ownerRevenue",
            ownerRevenue.toString()
        );
 
        booking.refunded = true;
 
        booking.refundAmount =
            bookingAmount;
    }
 
 
    // =========================================
    // MARK BOOKING AS CANCELLED
    // =========================================
 
    booking.status =
        "Cancelled";
 
    booking.cancelledAt =
        new Date().toISOString();
 
 
    // =========================================
    // SAVE OWNER NOTIFICATION
    // =========================================
 
    let notifications =
        JSON.parse(
            localStorage.getItem(
                "ownerNotifications"
            )
        ) || [];
 
    notifications.push(
        {
            id:
                "NT" +
                Date.now(),
 
            type:
                "booking-cancelled",
 
            title:
                "Booking Cancelled",
 
            message:
                (booking.customer || "Customer") +
                " cancelled " +
                (booking.type || "booking") +
                " - " +
                (booking.name || "N/A"),
 
            customer:
                booking.customer ||
                "Unknown Customer",
 
            bookingName:
                booking.name ||
                "N/A",
 
            bookingType:
                booking.type ||
                "N/A",
 
            amount:
                bookingAmount,
 
            bookingId:
                booking.bookingId ||
                "N/A",
 
            createdAt:
                new Date().toISOString(),
 
            read:
                false
        }
    );
 
    localStorage.setItem(
        "ownerNotifications",
        JSON.stringify(
            notifications
        )
    );
 
 
    // =========================================
    // SAVE BOOKINGS
    // =========================================
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(
            bookingsData
        )
    );
 
 
    // =========================================
    // REFRESH PAGE DATA
    // =========================================
 
    bookings =
        bookingsData;
 
    renderBookings();
 
    showAdminBookings();
 
    updateRevenue();
 
    updateBookingStatusCounts();
 
    showOwnerNotifications();
 
 
    alert(
        "Booking cancelled successfully! Refund: ₹" +
        bookingAmount
    );
}
// =========================================
// SHOW OWNER NOTIFICATIONS
// =========================================
 
function showOwnerNotifications()
{
    let notifications =
        JSON.parse(
            localStorage.getItem(
                "ownerNotifications"
            )
        ) || [];
 
 
    let notificationList =
        document.getElementById(
            "ownerNotificationList"
        );
 
 
    let notificationCount =
        document.getElementById(
            "ownerNotificationCount"
        );
 
 
    let notificationSubtitle =
        document.getElementById(
            "ownerNotificationSubtitle"
        );
 
 
    if(!notificationList)
    {
        return;
    }
 
 
    let unreadCount =
        notifications.filter(
            function(notification)
            {
                return(
                    notification.read !== true
                );
            }
        ).length;
 
 
    if(notificationCount)
    {
        notificationCount.textContent =
            unreadCount;
 
        notificationCount.style.display =
            unreadCount > 0
            ? "flex"
            : "none";
    }
 
 
    if(notificationSubtitle)
    {
        notificationSubtitle.textContent =
            unreadCount > 0
            ? unreadCount + " new notification" +
              (unreadCount > 1 ? "s" : "")
            : "No new notifications";
    }
 
 
    if(notifications.length === 0)
    {
        notificationList.innerHTML = `
 
            <div class="no-owner-notifications">
 
                🔔
 
                <p>
                    No notifications yet.
                </p>
 
            </div>
 
        `;
 
        return;
    }
 
 
    notificationList.innerHTML = "";
 
 
    [...notifications]
        .reverse()
        .forEach(
            function(notification, reverseIndex)
            {
 
                let originalIndex =
                    notifications.length -
                    1 -
                    reverseIndex;
 
 
                let dateText =
                    notification.createdAt
                    ? new Date(
                        notification.createdAt
                    ).toLocaleString()
                    : "N/A";
 
 
                let unreadClass =
                    notification.read === true
                    ? ""
                    : "unread";
 
 
                notificationList.innerHTML += `
 
                    <div
                        class="
                            owner-notification-item
                            ${unreadClass}
                        "
                    >
 
                        <div
                            class="owner-notification-icon"
                        >
                            ❌
                        </div>
 
 
                        <div
                            class="owner-notification-content"
                        >
 
                            <strong>
 
                                ${
                                    notification.title ||
                                    "Booking Cancelled"
                                }
 
                            </strong>
 
 
                            <p>
 
                                ${
                                    notification.message ||
                                    "A customer cancelled a booking."
                                }
 
                            </p>
 
 
                            <small>
                                👤
                                ${
                                    notification.customer ||
                                    "Unknown Customer"
                                }
                            </small>
 
 
                            <small>
                                🎫
                                ${
                                    notification.bookingName ||
                                    "N/A"
                                }
                            </small>
 
 
                            <small>
                                💰
                                ₹${notification.amount || 0}
                            </small>
 
 
                            <small>
                                📅
                                ${dateText}
                            </small>
 
                        </div>
 
 
                        ${
                            notification.read !== true
                            ? `
                                <button
                                    type="button"
                                    class="owner-mark-read"
                                    onclick="
                                        markOwnerNotificationRead(
                                            ${originalIndex}
                                        )
                                    "
                                >
                                    ✓
                                </button>
                            `
                            : ""
                        }
 
                    </div>
 
                `;
 
            }
        );
}
// =========================================
// TOGGLE OWNER NOTIFICATIONS
// =========================================
 
function toggleOwnerNotifications()
{
    let panel =
        document.getElementById(
            "ownerNotificationPanel"
        );
 
    if(!panel)
    {
        return;
    }
 
    if(panel.style.display === "block")
    {
        panel.style.display = "none";
    }
    else
    {
        panel.style.display = "block";
        showOwnerNotifications();
    }
}   
// =========================================
// MARK OWNER NOTIFICATION AS READ
// =========================================
 
function markOwnerNotificationRead(index)
{
    let notifications =
        JSON.parse(
            localStorage.getItem(
                "ownerNotifications"
            )
        ) || [];
 
 
    if(!notifications[index])
    {
        return;
    }
 
 
    notifications[index].read =
        true;
 
 
    localStorage.setItem(
        "ownerNotifications",
        JSON.stringify(
            notifications
        )
    );
 
 
    showOwnerNotifications();
}
// =========================================
// CLEAR OWNER NOTIFICATIONS
// =========================================
 
function clearOwnerNotifications()
{
    let notifications =
        JSON.parse(
            localStorage.getItem(
                "ownerNotifications"
            )
        ) || [];
 
 
    if(notifications.length === 0)
    {
        return;
    }
 
 
    let confirmClear =
        confirm(
            "Are you sure you want to clear all notifications?"
        );
 
 
    if(!confirmClear)
    {
        return;
    }
 
 
    localStorage.setItem(
        "ownerNotifications",
        JSON.stringify([])
    );
 
 
    showOwnerNotifications();
}
// =========================================
// CLOSE OWNER NOTIFICATION ON OUTSIDE CLICK
// =========================================
 
document.addEventListener(
    "click",
    function(event)
    {
        let panel =
            document.getElementById(
                "ownerNotificationPanel"
            );
 
        let wrapper =
            document.querySelector(
                ".owner-notification-wrapper"
            );
 
        if(!panel || !wrapper)
        {
            return;
        }
 
        // Clicked outside notification area
        if(!wrapper.contains(event.target))
        {
            panel.style.display = "none";
        }
    }
);
 
 
// =========================================
// CLOSE OWNER NOTIFICATION ON SCROLL
// =========================================
 
window.addEventListener(
    "scroll",
    function()
    {
        let panel =
            document.getElementById(
                "ownerNotificationPanel"
            );
 
        if(panel)
        {
            panel.style.display = "none";
        }
    },
    true
);
// =========================================
// GET BOOKING STATUS CLASS
// =========================================
 
function getStatusClass(status) {
 
    status =
    (status || "Confirmed")
    .toLowerCase();
 
 
    if (status === "expired") {
 
        return "status-expired";
 
    }
 
 
    else if (status === "active") {
 
        return "status-active";
 
    }
 
 
    else if (status === "confirmed") {
 
        return "status-confirmed";
 
    }
 
 
    else if (
        status === "pending payment"
    ) {
 
        return "status-pending";
 
    }
 
 
    else if (
        status === "cancelled"
    ) {
 
        return "status-cancelled";
 
    }
 
 
    return "status-confirmed";
 
}
 
// =========================================
// renderBookings
// =========================================
 
function renderBookings()
{
 
    let bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
 
 
    // =========================================
    // GET TODAY DATE
    // =========================================
 
    let today =
    new Date();
 
    today.setHours(
        0,
        0,
        0,
        0
    );
 
 
    // =========================================
    // UPDATE EXPIRED BOOKINGS
    // DO NOT DELETE AUTOMATICALLY
    // =========================================
 
    bookings.forEach(
        function(booking)
        {
 
            let bookingDateString = "";
 
 
            // BUS AND PACKAGE
 
            if(
                booking.type === "Bus" ||
                booking.type === "Package"
            )
            {
                bookingDateString =
                booking.date;
            }
 
 
            // HOTEL
            // HOTEL EXPIRES AFTER CHECKOUT
 
            else if(
                booking.type === "Hotel"
            )
            {
                bookingDateString =
                booking.checkOut;
            }
 
 
            if(!bookingDateString)
            {
                return;
            }
 
 
            let bookingDate =
            new Date(
                bookingDateString
            );
 
            bookingDate.setHours(
                0,
                0,
                0,
                0
            );
 
 
            // =========================================
            // EXPIRE ONLY CONFIRMED / ACTIVE BOOKINGS
            // =========================================
 
            let currentStatus =
            (
                booking.status ||
                "Confirmed"
            )
            .trim()
            .toLowerCase();
 
 
            if(
                bookingDate < today &&
                (
                    currentStatus === "confirmed" ||
                    currentStatus === "active"
                )
            )
            {
                booking.status =
                "Expired";
            }
 
        }
    );
 
 
    // =========================================
    // SAVE UPDATED BOOKINGS
    // =========================================
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    // =========================================
    // CURRENT USER
    // =========================================
 
    let currentUser =
    localStorage.getItem(
        "currentUser"
    );
 
 
    // =========================================
    // GET BOOKING TABLES
    // =========================================
 
    let busTable =
    document.getElementById(
        "busBookingTable"
    );
 
 
    let hotelTable =
    document.getElementById(
        "hotelBookingTable"
    );
 
 
    let packageTable =
    document.getElementById(
        "packageBookingTable"
    );
 
 
    // =========================================
    // IF NOT BOOKINGS PAGE
    // =========================================
 
    if(
        !busTable &&
        !hotelTable &&
        !packageTable
    )
    {
        return;
    }
 
 
    // =========================================
    // CLEAR TABLES
    // =========================================
 
    if(busTable)
    {
        busTable.innerHTML = "";
    }
 
 
    if(hotelTable)
    {
        hotelTable.innerHTML = "";
    }
 
 
    if(packageTable)
    {
        packageTable.innerHTML = "";
    }
 
 
    // =========================================
    // GET CURRENT USER BOOKINGS
    // HIDE SOFT-DELETED BOOKINGS FROM CUSTOMER
    // =========================================
 
    let userBookings =
    bookings.filter(
        function(booking)
        {
 
            if(!currentUser)
            {
                return false;
            }
 
 
            return(
                booking.customer === currentUser &&
                booking.deleted !== true
            );
 
        }
    );
 
 
    // =========================================
    // SEPARATE BOOKINGS BY TYPE
    // =========================================
 
    let busBookings = [];
 
    let hotelBookings = [];
 
    let packageBookings = [];
 
 
    userBookings.forEach(
        function(booking)
        {
 
            let type =
            (
                booking.type ||
                ""
            )
            .toLowerCase();
 
 
            if(type === "bus")
            {
                busBookings.push(
                    booking
                );
            }
 
 
            else if(type === "hotel")
            {
                hotelBookings.push(
                    booking
                );
            }
 
 
            else if(type === "package")
            {
                packageBookings.push(
                    booking
                );
            }
 
        }
    );
 
 
    // =========================================
    // FUNCTION TO CREATE ACTION MENU
    // =========================================
 
    function createActionMenu(
        booking,
        bookingIndex
    )
    {
 
        let status =
        (
            booking.status ||
            "Confirmed"
        )
        .trim()
        .toLowerCase();
 
 
        // =========================================
        // EXPIRED
        // =========================================
 
        if(status === "expired")
        {
 
            return `
 
                <button
                    onclick="viewBooking(${bookingIndex})"
                >
                    👁️ View Booking
                </button>
 
 
                <button
                    onclick="viewBookingBill(${bookingIndex})"
                >
                    🧾 View Receipt
                </button>
 
 
                <button
                    class="booking-delete-option"
                    onclick="deleteExpiredBooking(${bookingIndex})"
                >
                    🗑️ Delete Booking
                </button>
 
            `;
 
        }
 
 
        // =========================================
        // CANCELLED
        // =========================================
 
        else if(status === "cancelled")
        {
 
            return `
 
                <button
                    onclick="viewBooking(${bookingIndex})"
                >
                    👁️ View Booking
                </button>
 
 
                <button
                    onclick="viewBookingBill(${bookingIndex})"
                >
                    🧾 View Receipt
                </button>
 
 
                <button
                    class="booking-delete-option"
                    onclick="deleteCancelledBooking(${bookingIndex})"
                >
                    🗑️ Delete Booking
                </button>
 
            `;
 
        }
 
 
        // =========================================
        // PENDING PAYMENT
        // =========================================
 
        else if(status === "pending payment")
        {
 
            return `
 
                <button
                    onclick="viewBooking(${bookingIndex})"
                >
                    👁️ View Booking
                </button>
 
 
                <button
                    onclick="viewBookingBill(${bookingIndex})"
                >
                    🧾 View Receipt
                </button>
 
            `;
 
        }
 
 
        // =========================================
        // CONFIRMED / ACTIVE
        // =========================================
 
        else
        {
 
            return `
 
                <button
                    onclick="viewBooking(${bookingIndex})"
                >
                    👁️ View Booking
                </button>
 
 
                <button
                    onclick="viewBookingBill(${bookingIndex})"
                >
                    🧾 View Receipt
                </button>
 
 
                <button
                    class="booking-cancel-option"
                    onclick="cancelBooking(${bookingIndex})"
                >
                    ❌ Cancel Booking
                </button>
 
            `;
 
        }
 
    }
 
 
    // =========================================
    // DISPLAY BUS BOOKINGS
    // =========================================
 
    if(busTable)
    {
 
        if(busBookings.length === 0)
        {
 
            busTable.innerHTML = `
 
                <tr>
 
                    <td colspan="7">
 
                        No Bus Bookings Found 😔
 
                    </td>
 
                </tr>
 
            `;
 
        }
 
 
        else
        {
 
            busBookings.forEach(
                function(booking)
                {
 
                    let busName =
                    booking.name ||
                    "N/A";
 
 
                    let route =
                    booking.location ||
                    "N/A";
 
 
                    let date =
                    booking.date ||
                    "N/A";
 
 
                    let passengers =
                    booking.passengers ||
                    "1";
 
 
                    let amount =
                    booking.price ||
                    0;
 
 
                    let status =
                    booking.status ||
                    "Confirmed";
 
 
                    let bookingIndex =
                    bookings.indexOf(
                        booking
                    );
 
 
                    let actionMenu =
                    createActionMenu(
                        booking,
                        bookingIndex
                    );
 
 
                    busTable.innerHTML += `
 
                        <tr>
 
                            <td>
 
                                🚌 ${busName}
 
                            </td>
 
 
                            <td>
 
                                ${route}
 
                            </td>
 
 
                            <td>
 
                                ${date}
 
                            </td>
 
 
                            <td>
 
                                ${passengers}
 
                            </td>
 
 
                            <td>
 
                                ₹${amount}
 
                            </td>
 
 
                            <td>
 
                                <span
                                    class="booking-status ${getStatusClass(status)}"
                                >
 
                                    ${status}
 
                                </span>
 
                            </td>
 
 
                            <td>
 
                                <div
                                    class="booking-menu-container"
                                >
 
                                    <button
                                        class="booking-menu-btn"
                                        onclick="toggleBookingMenu(event, ${bookingIndex})"
                                    >
 
                                        ⋮
 
                                    </button>
 
 
                                    <div
                                        class="booking-menu"
                                        id="bookingMenu-${bookingIndex}"
                                    >
 
                                        ${actionMenu}
 
                                    </div>
 
                                </div>
 
                            </td>
 
                        </tr>
 
                    `;
 
                }
            );
 
        }
 
    }
 
 
    // =========================================
    // DISPLAY HOTEL BOOKINGS
    // =========================================
 
    if(hotelTable)
    {
 
        if(hotelBookings.length === 0)
        {
 
            hotelTable.innerHTML = `
 
                <tr>
 
                    <td colspan="8">
 
                        No Hotel Bookings Found 😔
 
                    </td>
 
                </tr>
 
            `;
 
        }
 
 
        else
        {
 
            hotelBookings.forEach(
                function(booking)
                {
 
                    let hotelName =
                    booking.name ||
                    "N/A";
 
 
                    let location =
                    booking.location ||
                    "N/A";
 
 
                    let checkIn =
                    booking.checkIn ||
                    "N/A";
 
 
                    let checkOut =
                    booking.checkOut ||
                    "N/A";
 
 
                    let rooms =
                    booking.rooms ||
                    "1";
 
 
                    let amount =
                    booking.price ||
                    0;
 
 
                    let status =
                    booking.status ||
                    "Confirmed";
 
 
                    let bookingIndex =
                    bookings.indexOf(
                        booking
                    );
 
 
                    let actionMenu =
                    createActionMenu(
                        booking,
                        bookingIndex
                    );
 
 
                    hotelTable.innerHTML += `
 
                        <tr>
 
                            <td>
 
                                🏨 ${hotelName}
 
                            </td>
 
 
                            <td>
 
                                ${location}
 
                            </td>
 
 
                            <td>
 
                                ${checkIn}
 
                            </td>
 
 
                            <td>
 
                                ${checkOut}
 
                            </td>
 
 
                            <td>
 
                                ${rooms}
 
                            </td>
 
 
                            <td>
 
                                ₹${amount}
 
                            </td>
 
 
                            <td>
 
                                <span
                                    class="booking-status ${getStatusClass(status)}"
                                >
 
                                    ${status}
 
                                </span>
 
                            </td>
 
 
                            <td>
 
                                <div
                                    class="booking-menu-container"
                                >
 
                                    <button
                                        class="booking-menu-btn"
                                        onclick="toggleBookingMenu(event, ${bookingIndex})"
                                    >
 
                                        ⋮
 
                                    </button>
 
 
                                    <div
                                        class="booking-menu"
                                        id="bookingMenu-${bookingIndex}"
                                    >
 
                                        ${actionMenu}
 
                                    </div>
 
                                </div>
 
                            </td>
 
                        </tr>
 
                    `;
 
                }
            );
 
        }
 
    }
 
 
    // =========================================
    // DISPLAY PACKAGE BOOKINGS
    // =========================================
 
    if(packageTable)
    {
 
        if(packageBookings.length === 0)
        {
 
            packageTable.innerHTML = `
 
                <tr>
 
                    <td colspan="7">
 
                        No Package Bookings Found 😔
 
                    </td>
 
                </tr>
 
            `;
 
        }
 
 
        else
        {
 
            packageBookings.forEach(
                function(booking)
                {
 
                    let packageName =
                    booking.name ||
                    "N/A";
 
 
                    let destination =
                    booking.location ||
                    "N/A";
 
 
                    let description =
                    booking.description ||
                    "Travel Package";
 
 
                    let guests =
                    booking.guests ||
                    "1";
 
 
                    let amount =
                    booking.price ||
                    0;
 
 
                    let status =
                    booking.status ||
                    "Confirmed";
 
 
                    let bookingIndex =
                    bookings.indexOf(
                        booking
                    );
 
 
                    let actionMenu =
                    createActionMenu(
                        booking,
                        bookingIndex
                    );
 
 
                    packageTable.innerHTML += `
 
                        <tr>
 
                            <td>
 
                                🎁 ${packageName}
 
                            </td>
 
 
                            <td>
 
                                ${destination}
 
                            </td>
 
 
                            <td>
 
                                ${description}
 
                            </td>
 
 
                            <td>
 
                                ${guests}
 
                            </td>
 
 
                            <td>
 
                                ₹${amount}
 
                            </td>
 
 
                            <td>
 
                                <span
                                    class="booking-status ${getStatusClass(status)}"
                                >
 
                                    ${status}
 
                                </span>
 
                            </td>
 
 
                            <td>
 
                                <div
                                    class="booking-menu-container"
                                >
 
                                    <button
                                        class="booking-menu-btn"
                                        onclick="toggleBookingMenu(event, ${bookingIndex})"
                                    >
 
                                        ⋮
 
                                    </button>
 
 
                                    <div
                                        class="booking-menu"
                                        id="bookingMenu-${bookingIndex}"
                                    >
 
                                        ${actionMenu}
 
                                    </div>
 
                                </div>
 
                            </td>
 
                        </tr>
 
                    `;
 
                }
            );
 
        }
 
    }
 
 
    // =========================================
    // UPDATE BOOKING COUNTS
    // =========================================
 
    let busCount =
    document.getElementById(
        "busBookingCount"
    );
 
 
    let hotelCount =
    document.getElementById(
        "hotelBookingCount"
    );
 
 
    let packageCount =
    document.getElementById(
        "packageBookingCount"
    );
 
 
    if(busCount)
    {
 
        busCount.textContent =
        busBookings.length;
 
    }
 
 
    if(hotelCount)
    {
 
        hotelCount.textContent =
        hotelBookings.length;
 
    }
 
 
    if(packageCount)
    {
 
        packageCount.textContent =
        packageBookings.length;
 
    }
 
 
    // =========================================
    // CALCULATE TOTAL SPENT
    // CONFIRMED / ACTIVE / EXPIRED = INCLUDE
    // CANCELLED / PENDING PAYMENT = EXCLUDE
    // DELETED EXPIRED = STILL INCLUDE
    // DELETED CANCELLED = STILL EXCLUDE
    // =========================================
 
    let totalSpent = 0;
 
 
    bookings.forEach(
        function(booking)
        {
 
            if(
                booking.customer !==
                currentUser
            )
            {
                return;
            }
 
 
            let status =
            (
                booking.status ||
                "Confirmed"
            )
            .trim()
            .toLowerCase();
 
 
            if(
                status !== "cancelled" &&
                status !== "pending payment"
            )
            {
 
                totalSpent +=
                Number(
                    booking.price
                ) || 0;
 
            }
 
        }
    );
 
 
    let totalSpentElement =
    document.getElementById(
        "totalSpent"
    );
 
 
    if(totalSpentElement)
    {
 
        totalSpentElement.textContent =
        "₹" + totalSpent;
 
    }
 
 
    // =========================================
    // UPDATE BOOKING LABELS
    // =========================================
 
    let busLabel =
    document.getElementById(
        "busBookingLabel"
    );
 
 
    let hotelLabel =
    document.getElementById(
        "hotelBookingLabel"
    );
 
 
    let packageLabel =
    document.getElementById(
        "packageBookingLabel"
    );
 
 
    if(busLabel)
    {
 
        busLabel.textContent =
        busBookings.length +
        " Bookings";
 
    }
 
 
    if(hotelLabel)
    {
 
        hotelLabel.textContent =
        hotelBookings.length +
        " Bookings";
 
    }
 
 
    if(packageLabel)
    {
 
        packageLabel.textContent =
        packageBookings.length +
        " Bookings";
 
    }
 
 
    // =========================================
    // SHOW EMPTY MESSAGE
    // =========================================
 
    let bookingEmpty =
    document.getElementById(
        "bookingEmpty"
    );
 
 
    if(bookingEmpty)
    {
 
        if(userBookings.length === 0)
        {
 
            bookingEmpty.style.display =
            "block";
 
        }
 
 
        else
        {
 
            bookingEmpty.style.display =
            "none";
 
        }
 
    }
 
}
 
// =========================================
// DELETE EXPIRED BOOKING
// =========================================
 
function deleteExpiredBooking(index)
{
    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];
 
 
    let booking =
        bookings[index];
 
 
    if(!booking)
    {
        alert("Booking not found!");
        return;
    }
 
 
    let status =
        (
            booking.status ||
            ""
        )
        .trim()
        .toLowerCase();
 
 
    if(status !== "expired")
    {
        alert(
            "Only expired bookings can be deleted."
        );
        return;
    }
 
 
    let confirmDelete =
        confirm(
            "Are you sure you want to delete this expired booking?"
        );
 
 
    if(!confirmDelete)
    {
        return;
    }
 
 
    // =========================================
    // SOFT DELETE
    // DO NOT USE bookings.splice()
    // =========================================
 
    booking.deleted = true;
 
    booking.deletedBy = "customer";
 
    booking.deletedAt =
        new Date().toISOString();
 
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    renderBookings();
 
 
    alert(
        "Expired booking deleted successfully."
    );
}
// =========================================
// DELETE CANCELLED BOOKING
// SOFT DELETE ONLY
// =========================================
 
function deleteCancelledBooking(index)
{
    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];
 
 
    let booking =
        bookings[index];
 
 
    if(!booking)
    {
        alert("Booking not found!");
        return;
    }
 
 
    let status =
        (
            booking.status ||
            ""
        )
        .trim()
        .toLowerCase();
 
 
    if(status !== "cancelled")
    {
        alert(
            "Only cancelled bookings can be deleted."
        );
        return;
    }
 
 
    let confirmDelete =
        confirm(
            "Are you sure you want to delete this cancelled booking?"
        );
 
 
    if(!confirmDelete)
    {
        return;
    }
 
 
    // =========================================
    // SOFT DELETE
    // KEEP BOOKING IN LOCALSTORAGE
    // =========================================
 
    booking.deleted = true;
 
    booking.deletedBy = "customer";
 
    booking.deletedAt =
        new Date().toISOString();
 
 
    // Keep original cancelled status
    booking.status = "Cancelled";
 
 
    // =========================================
    // SAVE
    // =========================================
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    // =========================================
    // REFRESH CUSTOMER PAGE
    // =========================================
 
    renderBookings();
 
 
    alert(
        "Cancelled booking deleted successfully."
    );
}
 
let activeBookingMenu = null;
let activeBookingButton = null;
 
 
 
function toggleBookingMenu(event, index)
{
    event.stopPropagation();
 
    let menu =
    document.getElementById(
        "bookingMenu-" + index
    );
 
    let button =
    event.currentTarget;
 
    if(!menu)
    {
        return;
    }
 
 
    // =========================================
    // CLOSE CURRENT MENU
    // =========================================
 
    if(
        activeBookingMenu === menu &&
        menu.classList.contains("show")
    )
    {
        menu.classList.remove("show");
 
        activeBookingMenu = null;
        activeBookingButton = null;
 
        return;
    }
 
 
    // =========================================
    // CLOSE OTHER MENUS
    // =========================================
 
    document.querySelectorAll(
        ".booking-menu"
    ).forEach(
        function(otherMenu)
        {
            otherMenu.classList.remove("show");
        }
    );
 
 
    // =========================================
    // REMEMBER ACTIVE MENU
    // =========================================
 
    activeBookingMenu = menu;
    activeBookingButton = button;
 
 
    // =========================================
    // OPEN MENU
    // =========================================
 
    menu.classList.add("show");
 
 
    positionBookingMenu();
}
function positionBookingMenu()
{
    if(
        !activeBookingMenu ||
        !activeBookingButton ||
        !activeBookingMenu.classList.contains("show")
    )
    {
        return;
    }
 
 
    let buttonRect =
    activeBookingButton.getBoundingClientRect();
 
    let menuWidth =
    activeBookingMenu.offsetWidth;
 
    let menuHeight =
    activeBookingMenu.offsetHeight;
 
 
    let gap = 8;
 
 
    // =========================================
    // HORIZONTAL POSITION
    // =========================================
 
    let left =
    buttonRect.right -
    menuWidth;
 
 
    // Keep inside screen
 
    if(left < 10)
    {
        left = 10;
    }
 
 
    if(
        left + menuWidth >
        window.innerWidth - 10
    )
    {
        left =
        window.innerWidth -
        menuWidth -
        10;
    }
 
 
    // =========================================
    // AVAILABLE SPACE
    // =========================================
 
    let spaceBelow =
    window.innerHeight -
    buttonRect.bottom;
 
    let spaceAbove =
    buttonRect.top;
 
 
    // =========================================
    // OPEN UPWARD
    // =========================================
 
    if(
        spaceBelow <
        menuHeight + gap
        &&
        spaceAbove >
        menuHeight + gap
    )
    {
        activeBookingMenu.style.left =
        left + "px";
 
        activeBookingMenu.style.top =
        (
            buttonRect.top -
            menuHeight -
            gap
        ) + "px";
    }
 
 
    // =========================================
    // OPEN DOWNWARD
    // =========================================
 
    else
    {
        activeBookingMenu.style.left =
        left + "px";
 
        activeBookingMenu.style.top =
        (
            buttonRect.bottom +
            gap
        ) + "px";
    }
}
// =========================================
// UPDATE MENU POSITION WHILE SCROLLING
// =========================================
 
window.addEventListener(
    "scroll",
    function()
    {
        positionBookingMenu();
    },
    true
);
 
 
// =========================================
// UPDATE MENU POSITION WHEN WINDOW RESIZES
// =========================================
 
window.addEventListener(
    "resize",
    function()
    {
        positionBookingMenu();
    }
);  
document.addEventListener(
    "click",
    function()
    {
        document.querySelectorAll(
            ".booking-menu"
        ).forEach(
            function(menu)
            {
                menu.classList.remove("show");
            }
        );
 
        activeBookingMenu = null;
        activeBookingButton = null;
    }
);
// =========================================
// VIEW BOOKING DETAILS
// =========================================
 
function viewBooking(index)
{
    let bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
 
 
    let booking =
    bookings[index];
 
 
    if(!booking)
    {
        alert("Booking not found!");
        return;
    }
 
 
    let type =
    (booking.type || "")
    .toLowerCase();
 
 
    let details = "";
 
 
    // =========================================
    // BUS BOOKING
    // =========================================
 
    if(type === "bus")
    {
 
        details = `
 
            <div class="booking-detail-row">
 
                <span>🚌 Bus Name</span>
 
                <strong>
                    ${booking.name || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📍 Route</span>
 
                <strong>
                    ${booking.location || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📅 Travel Date</span>
 
                <strong>
                    ${booking.date || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>👥 Passengers</span>
 
                <strong>
                    ${booking.passengers || "1"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>💰 Amount</span>
 
                <strong>
                    ₹${booking.price || 0}
                </strong>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // HOTEL BOOKING
    // =========================================
 
    else if(type === "hotel")
    {
 
        details = `
 
            <div class="booking-detail-row">
 
                <span>🏨 Hotel Name</span>
 
                <strong>
                    ${booking.name || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📍 Location</span>
 
                <strong>
                    ${booking.location || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📅 Check-in</span>
 
                <strong>
                    ${booking.checkIn || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📅 Check-out</span>
 
                <strong>
                    ${booking.checkOut || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>🛏 Rooms</span>
 
                <strong>
                    ${booking.rooms || "1"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>👥 Guests</span>
 
                <strong>
                    ${booking.guests || "1"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>💰 Amount</span>
 
                <strong>
                    ₹${booking.price || 0}
                </strong>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // PACKAGE BOOKING
    // =========================================
 
    else if(type === "package")
    {
 
        details = `
 
            <div class="booking-detail-row">
 
                <span>🎁 Package</span>
 
                <strong>
                    ${booking.name || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📍 Destination</span>
 
                <strong>
                    ${booking.location || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📝 Description</span>
 
                <strong>
                    ${booking.description || "Travel Package"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>📅 Travel Date</span>
 
                <strong>
                    ${booking.date || "N/A"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>👥 Guests</span>
 
                <strong>
                    ${booking.guests || "1"}
                </strong>
 
            </div>
 
 
            <div class="booking-detail-row">
 
                <span>💰 Amount</span>
 
                <strong>
                    ₹${booking.price || 0}
                </strong>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // COMMON DETAILS
    // =========================================
 
    let status =
    booking.status ||
    "Confirmed";
 
 
    let customer =
    booking.customer ||
    "N/A";
 
 
    // =========================================
    // CREATE POPUP
    // =========================================
 
    let oldPopup =
    document.getElementById(
        "bookingDetailsPopup"
    );
 
 
    if(oldPopup)
    {
        oldPopup.remove();
    }
 
 
    let popup =
    document.createElement(
        "div"
    );
 
 
    popup.id =
    "bookingDetailsPopup";
 
 
    popup.className =
    "booking-details-overlay";
 
 
    popup.innerHTML = `
 
        <div class="booking-details-popup">
 
 
            <button
                class="booking-details-close"
                onclick="closeBookingDetails()"
            >
 
                ×
 
            </button>
 
 
            <div class="booking-details-header">
 
                <div class="booking-details-icon">
 
                    ${
                        type === "bus"
                        ? "🚌"
                        : type === "hotel"
                        ? "🏨"
                        : "🎁"
                    }
 
                </div>
 
 
                <div>
 
                    <h2>
 
                        Booking Details
 
                    </h2>
 
 
                    <p>
 
                        ${booking.name || "Travel Booking"}
 
                    </p>
 
                </div>
 
            </div>
 
 
            <div class="booking-details-content">
 
                ${details}
 
 
                <div class="booking-detail-row">
 
                    <span>📌 Status</span>
 
                    <strong
                        class="booking-details-status ${getStatusClass(status)}"
                    >
 
                        ${status}
 
                    </strong>
 
                </div>
 
 
                <div class="booking-detail-row">
 
                    <span>👤 Customer</span>
 
                    <strong>
 
                        ${customer}
 
                    </strong>
 
                </div>
 
            </div>
 
 
            <button
                class="booking-details-close-btn"
                onclick="closeBookingDetails()"
            >
 
                Close
 
            </button>
 
 
        </div>
 
    `;
 
 
    document.body.appendChild(
        popup
    );
 
 
    // CLOSE WHEN CLICKING OUTSIDE
 
    popup.addEventListener(
        "click",
        function(event)
        {
 
            if(
                event.target === popup
            )
            {
 
                closeBookingDetails();
 
            }
 
        }
    );
 
}
 
 
 
// =========================================
// CLOSE BOOKING DETAILS
// =========================================
 
function closeBookingDetails()
{
 
    let popup =
    document.getElementById(
        "bookingDetailsPopup"
    );
 
 
    if(popup)
    {
 
        popup.remove();
 
    }
 
}
// =========================================
// ADD BUS
// =========================================
 
function addBus() {
 
    let name =
    document.getElementById(
        "busName"
    ).value.trim();
 
 
    let from =
    document.getElementById(
        "busFrom"
    ).value.trim();
 
 
    let to =
    document.getElementById(
        "busTo"
    ).value.trim();
 
 
    let time =
    document.getElementById(
        "busTime"
    ).value.trim();
 
 
    let price =
    document.getElementById(
        "busPrice"
    ).value.trim();
 
 
    if (
        !name ||
        !from ||
        !to ||
        !time ||
        !price
    ) {
 
        alert(
            "Please fill all bus details!"
        );
 
        return;
 
    }
 
 
    buses.push({
 
        name:
        name,
 
        from:
        from,
 
        to:
        to,
 
        time:
        time,
 
        price:
        Number(price)
 
    });
 
 
    saveBuses();
 
 
    showAdminBuses();
 
 
    showAllBuses();
 
 
    updateAdminCounts();
 
 
    document.getElementById(
        "busName"
    ).value = "";
 
 
    document.getElementById(
        "busFrom"
    ).value = "";
 
 
    document.getElementById(
        "busTo"
    ).value = "";
 
 
    document.getElementById(
        "busTime"
    ).value = "";
 
 
    document.getElementById(
        "busPrice"
    ).value = "";
 
 
    alert(
        "Bus added successfully!"
    );
 
}
// =========================================
// DELETE BUS
// =========================================
 
function deleteBus(index) {
 
    if (
        localStorage.getItem(
            "userRole"
        ) !== "admin"
    ) {
 
        alert(
            "Access denied!"
        );
 
        return;
 
    }
 
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete this bus?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    buses.splice(
        index,
        1
    );
 
 
    saveBuses();
 
 
    showAdminBuses();
 
 
    showAllBuses();
 
 
    updateAdminCounts();
 
 
    alert(
        "Bus deleted successfully!"
    );
 
}
// =========================================
// ADD HOTEL
// =========================================
 
function addHotel() {
 
    let name =
    document.getElementById(
        "hotelName"
    ).value.trim();
 
 
    let location =
    document.getElementById(
        "hotelLocation"
    ).value.trim();
 
 
    let price =
    document.getElementById(
        "hotelPrice"
    ).value;
 
 
    let totalRooms =
    document.getElementById(
        "totalRooms"
    ).value;
 
 
    let availableRooms =
    document.getElementById(
        "availableRooms"
    ).value;
 
 
    if (
 
        !name ||
        !location ||
        !price ||
        !totalRooms ||
        availableRooms === ""
 
    ) {
 
        alert(
            "Please fill all hotel details!"
        );
 
        return;
 
    }
 
 
    hotels.push({
 
        name:
        name,
 
        location:
        location,
 
        price:
        Number(price),
 
        totalRooms:
        Number(totalRooms),
 
        availableRooms:
        Number(availableRooms)
 
    });
 
 
    saveHotels();
 
 
    showAdminHotels();
 
 
    showHotels();
 
 
    updateAdminCounts();
 
 
    document.getElementById(
        "hotelName"
    ).value = "";
 
 
    document.getElementById(
        "hotelLocation"
    ).value = "";
 
 
    document.getElementById(
        "hotelPrice"
    ).value = "";
 
 
    document.getElementById(
        "totalRooms"
    ).value = "";
 
 
    document.getElementById(
        "availableRooms"
    ).value = "";
 
 
    alert(
        "Hotel added successfully!"
    );
 
}
// =========================================
// DELETE HOTEL
// =========================================
 
function deleteHotel(index) {
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete this hotel?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    hotels.splice(
        index,
        1
    );
 
 
    saveHotels();
 
 
    showAdminHotels();
 
 
    showHotels();
 
 
    updateAdminCounts();
 
 
    alert(
        "Hotel deleted successfully!"
    );
 
}
 
// =========================================
// ADD PACKAGE
// =========================================
 
function addPackage() {
 
    let name =
    document.getElementById(
        "packageName"
    ).value.trim();
 
 
    let location =
    document.getElementById(
        "packageLocation"
    ).value.trim();
 
 
    let description =
    document.getElementById(
        "packageDescription"
    ).value.trim();
 
 
    let price =
    document.getElementById(
        "packagePrice"
    ).value;
 
 
    let discount =
    document.getElementById(
        "packageDiscount"
    ).value;
 
 
    if (
 
        !name ||
        !location ||
        !description ||
        !price ||
        discount === ""
 
    ) {
 
        alert(
            "Please fill all package details!"
        );
 
        return;
 
    }
 
 
    packages.push({
 
        name: name,
 
        location: location,
 
        description: description,
 
        price: Number(price),
 
        discount: Number(discount)
 
    });
 
 
    savePackages();
 
 
    showAdminPackages();
 
 
    showPackages();
 
 
    updateAdminCounts();
 
 
    document.getElementById(
        "packageName"
    ).value = "";
 
 
    document.getElementById(
        "packageLocation"
    ).value = "";
 
 
    document.getElementById(
        "packageDescription"
    ).value = "";
 
 
    document.getElementById(
        "packagePrice"
    ).value = "";
 
 
    document.getElementById(
        "packageDiscount"
    ).value = "";
 
 
    alert(
        "Package created successfully!"
    );
 
}
// =========================================
// DELETE PACKAGE
// =========================================
 
function deletePackage(index) {
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete this package?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    packages.splice(
        index,
        1
    );
 
 
    savePackages();
 
 
    showAdminPackages();
 
 
    showPackages();
 
 
    updateAdminCounts();
 
 
    alert(
        "Package deleted successfully!"
    );
 
}
// =========================================
// ADD DESTINATION
// =========================================
 
function addDestination() {
 
    let name =
    document.getElementById(
        "destinationName"
    ).value.trim();
 
 
    let description =
    document.getElementById(
        "destinationDescription"
    ).value.trim();
 
 
    let attractions =
    document.getElementById(
        "destinationAttractions"
    ).value.trim();
 
 
    let image =
    document.getElementById(
        "destinationImage"
    ).value.trim();
 
 
    if (
 
        !name ||
        !description ||
        !attractions
 
    ) {
 
        alert(
            "Please fill all destination details!"
        );
 
        return;
 
    }
 
 
    destinations.push({
 
    name: name,
 
    emoji: "📍",
 
    description: description,
 
    attractions: attractions,
 
    image: image
 
});
 
 
    saveDestinations();
 
 
    showAdminDestinations();
 
 
    showDestinations();
 
 
    updateAdminCounts();
 
 
    document.getElementById(
        "destinationName"
    ).value = "";
 
 
    document.getElementById(
        "destinationDescription"
    ).value = "";
 
 
    document.getElementById(
        "destinationAttractions"
    ).value = "";
 
 
    document.getElementById(
        "destinationImage"
    ).value = "";
 
 
    alert(
        "Destination added successfully!"
    );
 
}
// =========================================
// DELETE DESTINATION
// =========================================
 
function deleteDestination(index) {
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete this destination?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    destinations.splice(
        index,
        1
    );
 
 
    saveDestinations();
 
 
    showAdminDestinations();
 
 
    showDestinations();
 
 
    updateAdminCounts();
 
 
    alert(
        "Destination deleted successfully!"
    );
 
}
 
 
 
// =========================================
// SHOW ADMIN BUSES
// =========================================
 
function showAdminBuses() {
 
    let table =
    document.getElementById(
        "adminBusTable"
    );
 
 
    if (!table) {
 
        return;
 
    }
 
 
    table.innerHTML = "";
 
 
    if (buses.length === 0) {
 
        table.innerHTML = `
 
            <tr>
 
                <td colspan="6">
 
                    No buses available.
 
                </td>
 
            </tr>
 
        `;
 
        return;
 
    }
 
 
    buses.forEach(
        function(bus, index) {
 
            table.innerHTML += `
 
                <tr>
 
                    <td>
                        ${bus.name}
                    </td>
 
                    <td>
                        ${bus.from}
                    </td>
 
                    <td>
                        ${bus.to}
                    </td>
 
                    <td>
                        ${bus.time}
                    </td>
 
                    <td>
                        ₹${bus.price}
                    </td>
 
                    <td>
 
                        <button
                            class="edit-btn"
                            onclick="openEditModal('bus', ${index})"
                        >
 
                            ✏️ Edit
 
                        </button>
 
 
                        <button
                            class="delete-btn"
                            onclick="deleteBus(${index})"
                        >
 
                            🗑 Delete
 
                        </button>
 
                    </td>
 
                </tr>
 
            `;
 
        }
    );
 
}
// =========================================
// SHOW ADMIN HOTELS
// =========================================
 
function showAdminHotels() {
 
    let table =
    document.getElementById(
        "adminHotelTable"
    );
 
 
    if (!table) {
 
        return;
 
    }
 
 
    table.innerHTML = "";
 
 
    if (hotels.length === 0) {
 
        table.innerHTML = `
 
            <tr>
 
                <td colspan="6">
 
                    No hotels available.
 
                </td>
 
            </tr>
 
        `;
 
        return;
 
    }
 
 
    hotels.forEach(
        function(hotel, index) {
 
            table.innerHTML += `
 
                <tr>
 
                    <td>
                        ${hotel.name}
                    </td>
 
                    <td>
                        ${hotel.location}
                    </td>
 
                    <td>
                        ₹${hotel.price}
                    </td>
 
                    <td>
                        ${hotel.totalRooms}
                    </td>
 
                    <td>
                        ${hotel.availableRooms}
                    </td>
 
                    <td>
 
                        <button
                            class="edit-btn"
                            onclick="openEditModal('hotel', ${index})"
                        >
 
                            ✏️ Edit
 
                        </button>
 
 
                        <button
                            class="delete-btn"
                            onclick="deleteHotel(${index})"
                        >
 
                            🗑 Delete
 
                        </button>
 
                    </td>
 
                </tr>
 
            `;
 
        }
    );
 
}
// =========================================
// SHOW ADMIN PACKAGES
// =========================================
 
function showAdminPackages() {
 
    let table =
    document.getElementById(
        "adminPackageTable"
    );
 
 
    if (!table) {
 
        return;
 
    }
 
 
    table.innerHTML = "";
 
 
    if (packages.length === 0) {
 
        table.innerHTML = `
 
            <tr>
 
                <td colspan="7">
 
                    No packages available.
 
                </td>
 
            </tr>
 
        `;
 
        return;
 
    }
 
 
    packages.forEach(
        function(pkg, index) {
 
            table.innerHTML += `
 
                <tr>
 
                    <td>
                        ${pkg.emoji || "🎁"}
                    </td>
 
                    <td>
                        ${pkg.name}
                    </td>
 
                    <td>
                        ${pkg.location}
                    </td>
 
                    <td>
                        ${pkg.description}
                    </td>
 
                    <td>
                        ₹${pkg.price}
                    </td>
 
                    <td>
                        ${pkg.discount}%
                    </td>
 
                    <td>
 
                        <button
                            class="edit-btn"
                            onclick="openEditModal('package', ${index})"
                        >
 
                            ✏️ Edit
 
                        </button>
 
 
                        <button
                            class="delete-btn"
                            onclick="deletePackage(${index})"
                        >
 
                            🗑 Delete
 
                        </button>
 
                    </td>
 
                </tr>
 
            `;
 
        }
    );
 
}
// =========================================
// SHOW ADMIN DESTINATIONS
// =========================================
 
function showAdminDestinations() {
 
    let table =
    document.getElementById(
        "adminDestinationTable"
    );
 
 
    if (!table) {
 
        return;
 
    }
 
 
    table.innerHTML = "";
 
 
    if (destinations.length === 0) {
 
        table.innerHTML = `
 
            <tr>
 
                <td colspan="5">
 
                    No destinations available.
 
                </td>
 
            </tr>
 
        `;
 
        return;
 
    }
 
 
    destinations.forEach(
        function(destination, index) {
 
            table.innerHTML += `
 
                <tr>
 
                    <td>
                        ${destination.emoji || "🌍"}
                    </td>
 
                    <td>
                        ${destination.name}
                    </td>
 
                    <td>
                        ${destination.description}
                    </td>
 
                    <td>
                        ${destination.attractions}
                    </td>
 
                    <td>
 
                        <button
                            class="edit-btn"
                            onclick="openEditModal('destination', ${index})"
                        >
 
                            ✏️ Edit
 
                        </button>
 
 
                        <button
                            class="delete-btn"
                            onclick="deleteDestination(${index})"
                        >
 
                            🗑 Delete
 
                        </button>
 
                    </td>
 
                </tr>
 
            `;
 
        }
    );
 
}
// =========================================
// EDIT VARIABLES
// =========================================
 
let editType = "";
 
let editIndex = -1;
 
 
// =========================================
// OPEN EDIT MODAL
// =========================================
 
function openEditModal(type, index) {
 
    editType = type;
 
    editIndex = index;
 
 
    let modal =
    document.getElementById(
        "editModal"
    );
 
 
    let title =
    document.getElementById(
        "editModalTitle"
    );
 
 
    let fields =
    document.getElementById(
        "editModalFields"
    );
 
 
    if (
        !modal ||
        !title ||
        !fields
    ) {
 
        return;
 
    }
 
 
    // =========================================
    // EDIT BUS
    // =========================================
 
    if (type === "bus") {
 
        let bus =
        buses[index];
 
 
        title.innerHTML =
        "🚌 Edit Bus";
 
 
        fields.innerHTML = `
 
            <input
                type="text"
                id="editBusName"
                value="${bus.name}"
                placeholder="Bus Name"
            >
 
 
            <input
                type="text"
                id="editBusFrom"
                value="${bus.from}"
                placeholder="From Location"
            >
 
 
            <input
                type="text"
                id="editBusTo"
                value="${bus.to}"
                placeholder="To Location"
            >
 
 
            <input
                type="text"
                id="editBusTime"
                value="${bus.time}"
                placeholder="Departure Time"
            >
 
 
            <input
                type="number"
                id="editBusPrice"
                value="${bus.price}"
                placeholder="Ticket Price"
                min="1"
            >
 
        `;
 
    }
 
 
    // =========================================
    // EDIT HOTEL
    // =========================================
 
    else if (type === "hotel") {
 
        let hotel =
        hotels[index];
 
 
        title.innerHTML =
        "🏨 Edit Hotel";
 
 
        fields.innerHTML = `
 
            <input
                type="text"
                id="editHotelName"
                value="${hotel.name}"
                placeholder="Hotel Name"
            >
 
 
            <input
                type="text"
                id="editHotelLocation"
                value="${hotel.location}"
                placeholder="Hotel Location"
            >
 
 
            <input
                type="number"
                id="editHotelPrice"
                value="${hotel.price}"
                placeholder="Price Per Night"
                min="1"
            >
 
 
            <input
                type="number"
                id="editTotalRooms"
                value="${hotel.totalRooms}"
                placeholder="Total Rooms"
                min="1"
            >
 
 
            <input
                type="number"
                id="editAvailableRooms"
                value="${hotel.availableRooms}"
                placeholder="Available Rooms"
                min="0"
            >
 
        `;
 
    }
 
 
    // =========================================
    // EDIT PACKAGE
    // =========================================
 
    else if (type === "package") {
 
        let pkg =
        packages[index];
 
 
        title.innerHTML =
        "🎁 Edit Package";
 
 
        fields.innerHTML = `
 
            <input
                type="text"
                id="editPackageEmoji"
                value="${pkg.emoji || ""}"
                placeholder="Package Emoji"
            >
 
 
            <input
                type="text"
                id="editPackageName"
                value="${pkg.name}"
                placeholder="Package Name"
            >
 
 
            <input
                type="text"
                id="editPackageLocation"
                value="${pkg.location}"
                placeholder="Destination"
            >
 
 
            <input
                type="text"
                id="editPackageDescription"
                value="${pkg.description}"
                placeholder="Package Description"
            >
 
 
            <input
                type="number"
                id="editPackagePrice"
                value="${pkg.price}"
                placeholder="Package Price"
                min="1"
            >
 
 
            <input
                type="number"
                id="editPackageDiscount"
                value="${pkg.discount}"
                placeholder="Discount Percentage"
                min="0"
                max="100"
            >
 
        `;
 
    }
 
 
    // =========================================
    // EDIT DESTINATION
    // =========================================
 
    else if (type === "destination") {
 
        let destination =
        destinations[index];
 
 
        title.innerHTML =
        "🌍 Edit Destination";
 
 
        fields.innerHTML = `
 
            <input
                type="text"
                id="editDestinationEmoji"
                value="${destination.emoji || ""}"
                placeholder="Destination Emoji"
            >
 
 
            <input
                type="text"
                id="editDestinationName"
                value="${destination.name}"
                placeholder="Destination Name"
            >
 
 
            <input
                type="text"
                id="editDestinationDescription"
                value="${destination.description}"
                placeholder="Destination Description"
            >
 
 
            <input
                type="text"
                id="editDestinationAttractions"
                value="${destination.attractions}"
                placeholder="Famous Attractions"
            >
 
 
            <input
                type="text"
                id="editDestinationImage"
                value="${destination.image || ""}"
                placeholder="Image URL (Optional)"
            >
 
        `;
 
    }
 
 
    // =========================================
    // SHOW MODAL
    // =========================================
 
    modal.style.display =
    "flex";
 
}
 
 
// =========================================
// CLOSE EDIT MODAL
// =========================================
 
function closeEditModal() {
 
    let modal =
    document.getElementById(
        "editModal"
    );
 
 
    if (modal) {
 
        modal.style.display =
        "none";
 
    }
 
 
    editType = "";
 
    editIndex = -1;
 
}
 
 
// =========================================
// SAVE EDIT
// =========================================
 
function saveEdit() {
 
    // =========================================
    // SAVE BUS
    // =========================================
 
    if (editType === "bus") {
 
        let name =
        document.getElementById(
            "editBusName"
        ).value.trim();
 
 
        let from =
        document.getElementById(
            "editBusFrom"
        ).value.trim();
 
 
        let to =
        document.getElementById(
            "editBusTo"
        ).value.trim();
 
 
        let time =
        document.getElementById(
            "editBusTime"
        ).value.trim();
 
 
        let price =
        document.getElementById(
            "editBusPrice"
        ).value;
 
 
        if (
            !name ||
            !from ||
            !to ||
            !time ||
            !price ||
            Number(price) <= 0
        ) {
 
            alert(
                "Please fill all bus details correctly!"
            );
 
            return;
 
        }
 
 
        buses[editIndex] = {
 
            name: name,
 
            from: from,
 
            to: to,
 
            time: time,
 
            price: Number(price)
 
        };
 
 
        saveBuses();
 
        showAdminBuses();
 
        showAllBuses();
 
        alert(
            "Bus updated successfully!"
        );
 
    }
 
 
    // =========================================
    // SAVE HOTEL
    // =========================================
 
    else if (editType === "hotel") {
 
        let name =
        document.getElementById(
            "editHotelName"
        ).value.trim();
 
 
        let location =
        document.getElementById(
            "editHotelLocation"
        ).value.trim();
 
 
        let price =
        document.getElementById(
            "editHotelPrice"
        ).value;
 
 
        let totalRooms =
        document.getElementById(
            "editTotalRooms"
        ).value;
 
 
        let availableRooms =
        document.getElementById(
            "editAvailableRooms"
        ).value;
 
 
        if (
            !name ||
            !location ||
            !price ||
            !totalRooms ||
            availableRooms === ""
        ) {
 
            alert(
                "Please fill all hotel details!"
            );
 
            return;
 
        }
 
 
        if (
            Number(price) <= 0 ||
            Number(totalRooms) <= 0 ||
            Number(availableRooms) < 0
        ) {
 
            alert(
                "Please enter valid hotel details!"
            );
 
            return;
 
        }
 
 
        if (
            Number(availableRooms) >
            Number(totalRooms)
        ) {
 
            alert(
                "Available rooms cannot be greater than total rooms!"
            );
 
            return;
 
        }
 
 
        hotels[editIndex] = {
 
            name: name,
 
            location: location,
 
            price: Number(price),
 
            totalRooms: Number(totalRooms),
 
            availableRooms:
            Number(availableRooms)
 
        };
 
 
        saveHotels();
 
        showAdminHotels();
 
        showHotels();
 
        alert(
            "Hotel updated successfully!"
        );
 
    }
 
 
    // =========================================
    // SAVE PACKAGE
    // =========================================
 
    else if (editType === "package") {
 
        let emoji =
        document.getElementById(
            "editPackageEmoji"
        ).value.trim();
 
 
        let name =
        document.getElementById(
            "editPackageName"
        ).value.trim();
 
 
        let location =
        document.getElementById(
            "editPackageLocation"
        ).value.trim();
 
 
        let description =
        document.getElementById(
            "editPackageDescription"
        ).value.trim();
 
 
        let price =
        document.getElementById(
            "editPackagePrice"
        ).value;
 
 
        let discount =
        document.getElementById(
            "editPackageDiscount"
        ).value;
 
 
        if (
            !name ||
            !location ||
            !description ||
            !price ||
            discount === ""
        ) {
 
            alert(
                "Please fill all package details!"
            );
 
            return;
 
        }
 
 
        if (
            Number(price) <= 0 ||
            Number(discount) < 0 ||
            Number(discount) > 100
        ) {
 
            alert(
                "Please enter valid package details!"
            );
 
            return;
 
        }
 
 
        packages[editIndex] = {
 
            emoji:
            emoji || "🎁",
 
            name: name,
 
            location: location,
 
            description: description,
 
            price: Number(price),
 
            discount: Number(discount)
 
        };
 
 
        savePackages();
 
        showAdminPackages();
 
        showPackages();
 
        alert(
            "Package updated successfully!"
        );
 
    }
 
 
    // =========================================
    // SAVE DESTINATION
    // =========================================
 
    else if (editType === "destination") {
 
        let emoji =
        document.getElementById(
            "editDestinationEmoji"
        ).value.trim();
 
 
        let name =
        document.getElementById(
            "editDestinationName"
        ).value.trim();
 
 
        let description =
        document.getElementById(
            "editDestinationDescription"
        ).value.trim();
 
 
        let attractions =
        document.getElementById(
            "editDestinationAttractions"
        ).value.trim();
 
 
        let image =
        document.getElementById(
            "editDestinationImage"
        ).value.trim();
 
 
        if (
            !name ||
            !description ||
            !attractions
        ) {
 
            alert(
                "Please fill all destination details!"
            );
 
            return;
 
        }
 
 
        destinations[editIndex] = {
 
            emoji:
            emoji || "🌍",
 
            name: name,
 
            description: description,
 
            attractions: attractions,
 
            image: image
 
        };
 
 
        saveDestinations();
 
        showAdminDestinations();
 
        showDestinations();
 
        alert(
            "Destination updated successfully!"
        );
 
    }
 
 
    else {
 
        return;
 
    }
 
 
    // =========================================
    // UPDATE DASHBOARD
    // =========================================
 
    updateAdminCounts();
 
    closeEditModal();
 
}
 
// =========================================
// SHOW ADMIN / OWNER BOOKINGS
// =========================================
 
function showAdminBookings()
{
 
    // =====================================
    // LOAD LATEST BOOKINGS
    // =====================================
 
    bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
 
 
    let container =
    document.getElementById(
        "adminBookingTable"
    );
 
 
    if(!container)
    {
        return;
    }
 
 
    container.innerHTML = "";
 
 
    // =====================================
    // NO BOOKINGS
    // =====================================
 
    if(bookings.length === 0)
    {
 
        container.innerHTML = `
 
            <div class="no-customers-message">
 
                No customers yet 😔
 
            </div>
 
        `;
 
        return;
    }
 
 
    // =====================================
    // GROUP BOOKINGS BY CUSTOMER
    // =====================================
 
    let customerBookings = {};
 
 
    bookings.forEach(
        function(booking)
        {
 
            let customer =
            booking.customer ||
            "Unknown Customer";
 
 
            if(
                !customerBookings[customer]
            )
            {
                customerBookings[customer] = [];
            }
 
 
            customerBookings[customer].push(
                booking
            );
 
        }
    );
 
 
    // =====================================
    // DISPLAY CUSTOMERS
    // =====================================
 
    for(
        let customer in customerBookings
    )
    {
 
        let customerBookingList =
        customerBookings[customer];
 
 
        // =====================================
        // TOTAL SPENT
        //
        // CONFIRMED  = INCLUDE
        // ACTIVE     = INCLUDE
        // EXPIRED    = INCLUDE
        // CANCELLED  = EXCLUDE
        // PENDING    = EXCLUDE
        // DELETED EXPIRED = INCLUDE
        // DELETED CANCELLED = EXCLUDE
        // =====================================
 
        let totalAmount = 0;
 
 
        customerBookingList.forEach(
            function(booking)
            {
 
                let status =
                (
                    booking.status ||
                    "Confirmed"
                )
                .trim()
                .toLowerCase();
 
 
                if(
                    status === "cancelled" ||
                    status === "pending payment"
                )
                {
                    return;
                }
 
 
                totalAmount +=
                Number(
                    booking.price
                ) || 0;
 
            }
        );
 
 
        // =====================================
        // ACTIVE BOOKING COUNT
        //
        // ONLY CONFIRMED / ACTIVE
        // NOT DELETED
        // =====================================
 
        let activeBookingCount = 0;
 
 
        customerBookingList.forEach(
            function(booking)
            {
 
                let status =
                (
                    booking.status ||
                    "Confirmed"
                )
                .trim()
                .toLowerCase();
 
 
                if(
                    booking.deleted !== true &&
                    (
                        status === "confirmed" ||
                        status === "active"
                    )
                )
                {
                    activeBookingCount++;
                }
 
            }
        );
 
 
        // =====================================
        // CREATE SAFE CUSTOMER VALUE
        // =====================================
 
        let encodedCustomer =
        encodeURIComponent(
            customer
        );
 
 
        // =====================================
        // CUSTOMER CARD
        // =====================================
 
        container.innerHTML += `
 
            <div
                class="customer-card"
                onclick="
                    openCustomerDetails(
                        decodeURIComponent(
                            '${encodedCustomer}'
                        )
                    )
                "
            >
 
 
                <!-- CUSTOMER INFO -->
 
                <div class="customer-card-info">
 
                    <div class="customer-avatar">
 
                        👤
 
                    </div>
 
 
                    <div class="customer-details">
 
                        <h3>
 
                            ${customer}
 
                        </h3>
 
 
                        <p>
 
                            📧 Customer Account
 
                        </p>
 
                    </div>
 
                </div>
 
 
                <!-- CUSTOMER STATS -->
 
                <div class="customer-card-stats">
 
 
                    <div class="customer-stat">
 
                        <strong>
 
                            📋
                            ${activeBookingCount}
 
                        </strong>
 
 
                        <span>
 
                            Active Bookings
 
                        </span>
 
                    </div>
 
 
                    <div class="customer-stat">
 
                        <strong>
 
                            💰 ₹${totalAmount.toFixed(2)}
 
                        </strong>
 
 
                        <span>
 
                            Total Spent
 
                        </span>
 
                    </div>
 
                </div>
 
 
                <!-- ================================= -->
                <!-- 3 DOT MENU -->
                <!-- ================================= -->
 
                <div
                    class="customer-menu-container"
                    onclick="event.stopPropagation()"
                >
 
                    <button
                        type="button"
                        class="customer-menu-btn"
                        onclick="
                            toggleCustomerMenu(
                                event,
                                '${encodedCustomer}'
                            )
                        "
                    >
 
                        ⋮
 
                    </button>
 
 
                    <div
                        class="customer-menu"
                        id="customerMenu-${encodedCustomer}"
                    >
 
 
                        <!-- VIEW DETAILS -->
 
                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
 
                                openCustomerDetails(
                                    decodeURIComponent(
                                        '${encodedCustomer}'
                                    )
                                )
                            "
                        >
 
                            👁 View Details
 
                        </button>
 
 
                        <!-- CANCELLED -->
 
                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
 
                                openCustomerBookingCategory(
                                    '${encodedCustomer}',
                                    'cancelled'
                                )
                            "
                        >
 
                            ❌ Cancelled Bookings
 
                        </button>
 
 
                        <!-- EXPIRED -->
 
                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
 
                                openCustomerBookingCategory(
                                    '${encodedCustomer}',
                                    'expired'
                                )
                            "
                        >
 
                            🔴 Expired Bookings
 
                        </button>
 
 
                        <!-- PENDING PAYMENT -->
 
                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
 
                                openCustomerBookingCategory(
                                    '${encodedCustomer}',
                                    'pending payment'
                                )
                            "
                        >
 
                            🟠 Pending Payments
 
                        </button>
 
 
                        <!-- DELETED -->
 
                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
 
                                openCustomerBookingCategory(
                                    '${encodedCustomer}',
                                    'deleted'
                                )
                            "
                        >
 
                            🗑️ Deleted Bookings
 
                        </button>
 
 
                    </div>
 
                </div>
 
 
            </div>
 
        `;
 
    }
 
}
 
// =========================================
// SHOW CUSTOMER BOOKING CATEGORY
// =========================================
function openCustomerBookingCategory(
    encodedCustomer,
    category
)
{
 
    let customer =
    decodeURIComponent(
        encodedCustomer
    );
 
 
    let allBookings =
    JSON.parse(
        localStorage.getItem(
            "bookings"
        )
    ) || [];
 
 
    // =========================================
    // GET THIS CUSTOMER'S BOOKINGS
    // =========================================
 
    let customerBookings =
    allBookings.filter(
        function(booking)
        {
 
            return(
                booking.customer ===
                customer
            );
 
        }
    );
 
 
    // =========================================
    // FILTER CATEGORY
    // =========================================
 
    let filteredBookings = [];
 
 
    // =========================================
    // CANCELLED BOOKINGS
    // SHOW ONLY IF NOT DELETED
    // =========================================
 
    if(category === "cancelled")
    {
 
        filteredBookings =
        customerBookings.filter(
            function(booking)
            {
 
                let status =
                (
                    booking.status ||
                    ""
                )
                .trim()
                .toLowerCase();
 
 
                return(
                    status === "cancelled" &&
                    booking.deleted !== true
                );
 
            }
        );
 
    }
 
 
    // =========================================
    // EXPIRED BOOKINGS
    // SHOW ONLY IF NOT DELETED
    // =========================================
 
    else if(category === "expired")
    {
 
        filteredBookings =
        customerBookings.filter(
            function(booking)
            {
 
                let status =
                (
                    booking.status ||
                    ""
                )
                .trim()
                .toLowerCase();
 
 
                return(
                    status === "expired" &&
                    booking.deleted !== true
                );
 
            }
        );
 
    }
 
 
    // =========================================
    // PENDING PAYMENTS
    // =========================================
 
    else if(category === "pending payment")
    {
 
        filteredBookings =
        customerBookings.filter(
            function(booking)
            {
 
                let status =
                (
                    booking.status ||
                    ""
                )
                .trim()
                .toLowerCase();
 
 
                return(
                    status ===
                    "pending payment" &&
                    booking.deleted !== true
                );
 
            }
        );
 
    }
 
 
    // =========================================
    // DELETED BOOKINGS
    // SHOW ANY DELETED BOOKING
    // =========================================
 
    else if(category === "deleted")
    {
 
        filteredBookings =
        customerBookings.filter(
            function(booking)
            {
 
                return(
                    booking.deleted === true
                );
 
            }
        );
 
    }
 
 
    // =========================================
    // CATEGORY TITLE
    // =========================================
 
    let title = "";
 
 
    if(category === "cancelled")
    {
        title =
        "❌ Cancelled Bookings";
    }
 
 
    else if(category === "expired")
    {
        title =
        "🔴 Expired Bookings";
    }
 
 
    else if(category === "pending payment")
    {
        title =
        "🟠 Pending Payments";
    }
 
 
    else if(category === "deleted")
    {
        title =
        "🗑️ Deleted Bookings";
    }
 
 
    // =========================================
    // NO BOOKINGS
    // =========================================
 
    if(filteredBookings.length === 0)
    {
 
        alert(
            customer +
            " has no " +
            title
        );
 
        return;
 
    }
 
 
    // =========================================
    // CREATE BOOKING LIST
    // =========================================
 
    let bookingList = "";
 
 
    filteredBookings.forEach(
        function(booking)
        {
 
            let typeIcon =
            "🎁";
 
 
            if(
                booking.type === "Bus"
            )
            {
                typeIcon = "🚌";
            }
 
 
            else if(
                booking.type === "Hotel"
            )
            {
                typeIcon = "🏨";
            }
 
 
            // =========================================
            // SHOW ORIGINAL STATUS
            // =========================================
 
            let bookingStatus =
            booking.status ||
            "N/A";
 
 
            // =========================================
            // DELETED INFO
            // =========================================
 
            let deletedInfo = "";
 
 
            if(
                booking.deleted === true
            )
            {
 
                let deletedDate =
                booking.deletedAt
                    ? new Date(
                        booking.deletedAt
                    ).toLocaleString()
                    : "N/A";
 
 
                deletedInfo = `
 
                    <p>
 
                        🗑️
                        <strong>Deleted By:</strong>
                        Customer
 
                    </p>
 
                    <p>
 
                        📅
                        <strong>Deleted On:</strong>
                        ${deletedDate}
 
                    </p>
 
                `;
 
            }
 
 
            bookingList += `
 
                <div
                    class="admin-category-booking"
                >
 
                    <div>
 
                        <strong>
 
                            ${typeIcon}
 
                            ${booking.name || "N/A"}
 
                        </strong>
 
 
                        <p>
 
                            📍
                            ${booking.location || "N/A"}
 
                        </p>
 
 
                        <p>
 
                            💰
                            ₹${booking.price || 0}
 
                        </p>
 
 
                        <p>
 
                            📋
                            <strong>Status:</strong>
                            ${bookingStatus}
 
                        </p>
 
 
                        ${deletedInfo}
 
                    </div>
 
                </div>
 
            `;
 
        }
    );
 
 
    // =========================================
    // REMOVE OLD POPUP
    // =========================================
 
    let oldPopup =
    document.getElementById(
        "adminCategoryPopup"
    );
 
 
    if(oldPopup)
    {
        oldPopup.remove();
    }
 
 
    // =========================================
    // CREATE POPUP
    // =========================================
 
    let popup =
    document.createElement(
        "div"
    );
 
 
    popup.id =
    "adminCategoryPopup";
 
 
    popup.className =
    "admin-category-overlay";
 
 
    popup.innerHTML = `
 
        <div
            class="admin-category-popup"
            onclick="event.stopPropagation()"
        >
 
            <div
                class="admin-category-header"
            >
 
                <div>
 
                    <h2>
 
                        ${title}
 
                    </h2>
 
 
                    <p>
 
                        ${customer}
 
                    </p>
 
                </div>
 
 
                <button
                    type="button"
                    class="admin-category-close"
                    onclick="event.stopPropagation(); closeCustomerBookingCategory()"
                >
 
                    ×
 
                </button>
 
            </div>
 
 
            <div
                class="admin-category-content"
            >
 
                ${bookingList}
 
            </div>
 
        </div>
 
    `;
 
 
    document.body.appendChild(
        popup
    );
 
}
// =========================================
// CLOSE CUSTOMER BOOKING CATEGORY POPUP
// =========================================
 
function closeCustomerBookingCategory()
{
    let popup =
        document.getElementById(
            "adminCategoryPopup"
        );
 
    if(popup)
    {
        popup.remove();
    }
}
// =====================================
// TOGGLE CUSTOMER 3-DOT MENU
// =====================================
 
function toggleCustomerMenu(event, customer)
{
    event.stopPropagation();
 
 
    // =========================================
    // CLOSE ALL OTHER CUSTOMER MENUS
    // =========================================
 
    document
        .querySelectorAll(".customer-menu")
        .forEach(
            function(menu)
            {
                menu.style.display = "none";
            }
        );
 
 
    // =========================================
    // GET SELECTED CUSTOMER MENU
    // =========================================
 
    let menu =
        document.getElementById(
            "customerMenu-" + customer
        );
 
 
    if(!menu)
    {
        return;
    }
 
 
    // =========================================
    // TOGGLE SELECTED MENU
    // =========================================
 
    if(
        menu.style.display === "block"
    )
    {
        menu.style.display = "none";
    }
    else
    {
        menu.style.display = "block";
    }
}
// Close menu when clicking outside
document.addEventListener(
    "click",
    function()
    {
        document
            .querySelectorAll(".customer-menu")
            .forEach(
                function(menu)
                {
                    menu.style.display = "none";
                }
            );
    }
);
 
 
 
// =========================================
// OPEN CUSTOMER DETAILS
// SHOW ONLY CONFIRMED / ACTIVE BOOKINGS
// =========================================
 
function openCustomerDetails(customer)
{
 
    // =========================================
    // CLOSE CUSTOMER 3-DOT MENUS
    // =========================================
 
    document
        .querySelectorAll(".customer-menu")
        .forEach(
            function(menu)
            {
                menu.style.display = "none";
            }
        );
 
 
    // =========================================
    // LOAD LATEST BOOKINGS
    // =========================================
 
    let allBookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
 
 
    // =========================================
    // GET ONLY CONFIRMED / ACTIVE BOOKINGS
    // NOT DELETED
    // =========================================
 
    let customerBookingList =
    allBookings.filter(
        function(booking)
        {
 
            let status =
            (
                booking.status ||
                "Confirmed"
            )
            .trim()
            .toLowerCase();
 
 
            return(
                booking.customer === customer &&
                booking.deleted !== true &&
                (
                    status === "confirmed" ||
                    status === "active"
                )
            );
 
        }
    );
 
 
    // =========================================
    // GET ALL CUSTOMER BOOKINGS
    // USED ONLY FOR TOTAL SPENT
    // =========================================
 
    let allCustomerBookings =
    allBookings.filter(
        function(booking)
        {
 
            return(
                booking.customer ===
                customer
            );
 
        }
    );
 
 
    // =========================================
    // CHECK IF CUSTOMER HAS ACTIVE BOOKINGS
    // =========================================
 
    if(
        customerBookingList.length === 0
    )
    {
        alert(
            "No confirmed or active bookings found for " +
            customer
        );
 
        return;
    }
 
 
    // =========================================
    // CALCULATE ACTUAL TOTAL SPENT
    //
    // CONFIRMED  = INCLUDE
    // ACTIVE     = INCLUDE
    // EXPIRED    = INCLUDE
    // CANCELLED  = EXCLUDE
    // PENDING    = EXCLUDE
    // DELETED EXPIRED = INCLUDE
    // DELETED CANCELLED = EXCLUDE
    // =========================================
 
    let totalAmount = 0;
 
 
    allCustomerBookings.forEach(
        function(booking)
        {
 
            let status =
            (
                booking.status ||
                "Confirmed"
            )
            .trim()
            .toLowerCase();
 
 
            if(
                status === "cancelled" ||
                status === "pending payment"
            )
            {
                return;
            }
 
 
            totalAmount +=
            Number(
                booking.price
            ) || 0;
 
        }
    );
 
 
    // =========================================
    // CREATE BOOKING HTML
    // ONLY CONFIRMED / ACTIVE
    // =========================================
 
    let bookingHTML = "";
 
 
    customerBookingList.forEach(
        function(booking)
        {
 
            let status =
            booking.status ||
            "Confirmed";
 
 
            let type =
            (
                booking.type ||
                ""
            )
            .toLowerCase();
 
 
            let icon =
            "🎁";
 
 
            if(type === "bus")
            {
                icon = "🚌";
            }
 
            else if(type === "hotel")
            {
                icon = "🏨";
            }
 
 
            bookingHTML += `
 
                <div class="customer-booking-item">
 
                    <div class="customer-booking-icon">
 
                        ${icon}
 
                    </div>
 
 
                    <div class="customer-booking-details">
 
                        <strong>
 
                            ${booking.name || "N/A"}
 
                        </strong>
 
 
                        <span>
 
                            ${booking.type || "Booking"}
 
                        </span>
 
 
                        <small>
 
                            📍
                            ${booking.location || "N/A"}
 
                        </small>
 
                    </div>
 
 
                    <div class="customer-booking-price">
 
                        ₹${booking.price || 0}
 
 
                        <span
                            class="booking-status ${getStatusClass(status)}"
                        >
 
                            ${status}
 
                        </span>
 
                    </div>
 
                </div>
 
            `;
 
        }
    );
 
 
    // =========================================
    // REMOVE OLD POPUP
    // =========================================
 
    let oldPopup =
    document.getElementById(
        "customerDetailsModal"
    );
 
 
    if(oldPopup)
    {
        oldPopup.remove();
    }
 
 
    // =========================================
    // CREATE POPUP
    // =========================================
 
    let popup =
    document.createElement(
        "div"
    );
 
 
    popup.id =
    "customerDetailsModal";
 
 
    popup.className =
    "customer-details-modal";
 
 
    popup.innerHTML = `
 
        <div
            class="customer-details-overlay"
            onclick="closeCustomerDetails()"
        >
 
            <div
                class="customer-details-popup"
                onclick="event.stopPropagation()"
            >
 
                <button
                    type="button"
                    class="customer-details-close"
                    onclick="closeCustomerDetails()"
                >
 
                    ×
 
                </button>
 
 
                <div class="customer-popup-header">
 
                    <div class="customer-popup-avatar">
 
                        👤
 
                    </div>
 
 
                    <div>
 
                        <h2>
 
                            Customer Details
 
                        </h2>
 
 
                        <p>
 
                            ${customer}
 
                        </p>
 
                    </div>
 
                </div>
 
 
                <!-- ================================= -->
                <!-- CUSTOMER SUMMARY -->
                <!-- ================================= -->
 
                <div class="customer-summary">
 
 
                    <div>
 
                        <span>
 
                            📋
 
                        </span>
 
 
                        <strong>
 
                            ${customerBookingList.length}
 
                        </strong>
 
 
                        <small>
 
                            Active Bookings
 
                        </small>
 
                    </div>
 
 
                    <div>
 
                        <span>
 
                            💰
 
                        </span>
 
 
                        <strong>
 
                            ₹${totalAmount.toFixed(2)}
 
                        </strong>
 
 
                        <small>
 
                            Total Spent
 
                        </small>
 
                    </div>
 
                </div>
 
 
                <h3 class="customer-history-title">
 
                    Current Booking Details
 
                </h3>
 
 
                <div class="customer-booking-list">
 
                    ${bookingHTML}
 
                </div>
 
 
                <div class="customer-popup-actions">
 
 
                    <button
                        class="customer-delete-btn"
                        onclick="deleteCustomerBookings('${customer}')"
                    >
 
                        🗑 Delete Customer
 
                    </button>
 
 
                    <button
                        class="customer-close-btn"
                        onclick="closeCustomerDetails()"
                    >
 
                        Close
 
                    </button>
 
 
                </div>
 
            </div>
 
        </div>
 
    `;
 
 
    document.body.appendChild(
        popup
    );
 
}
 
 
// =====================================
// CLOSE CUSTOMER DETAILS
// =====================================
 
function closeCustomerDetails() {
 
    let popup =
    document.getElementById(
        "customerDetailsModal"
    );
 
 
    if (popup) {
 
        popup.remove();
 
    }
 
}
 
 
 
// =====================================
// DELETE CUSTOMER
// =====================================
 
function deleteCustomerBookings(customer) {
 
    let confirmation =
    confirm(
        "Are you sure you want to delete this customer?"
    );
 
 
    if (!confirmation) {
 
        return;
 
    }
 
 
    // Remove all bookings of this customer
    bookings =
    bookings.filter(function(booking) {
 
        return (
            (booking.customer ||
            "Unknown Customer") !==
            customer
        );
 
    });
 
 
    // Save updated bookings
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    // Remove customer account if users are stored
    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];
 
 
    users =
    users.filter(function(user) {
 
        return (
            user.email !== customer &&
            user.username !== customer
        );
 
    });
 
 
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
 
 
    // Close popup
    closeCustomerDetails();
 
 
    // Refresh admin page
    showAdminBookings();
 
    updateAdminCounts();
 
    updateBookingStatusCounts();
 
 
    alert(
        "Customer deleted successfully!"
    );
 
}
function deleteSingleBooking(index) {
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete this booking?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    bookings.splice(
        index,
        1
    );
 
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    showAdminBookings();
 
    updateAdminCounts();
 
    updateBookingStatusCounts();
 
 
    alert(
        "Booking deleted successfully!"
    );
 
}
function deleteCustomerBookings(customer) {
 
    let confirmDelete =
    confirm(
        "Are you sure you want to delete all bookings of " +
        customer +
        "?"
    );
 
 
    if (!confirmDelete) {
 
        return;
 
    }
 
 
    bookings =
    bookings.filter(
        function(booking) {
 
            return booking.customer !== customer;
 
        }
    );
 
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
 
 
    showAdminBookings();
 
    updateAdminCounts();
 
    updateBookingStatusCounts();
 
 
    alert(
        "All bookings of " +
        customer +
        " deleted successfully!"
    );
 
}
// =========================================
// ADMIN COUNTS
// =========================================
 
function updateAdminCounts() {
 
    let busCount =
    document.getElementById("busCount");
 
    let hotelCount =
    document.getElementById("hotelCount");
 
    let bookingCount =
    document.getElementById("bookingCount");
 
    let packageCount =
    document.getElementById("packageCount");
 
    let destinationCount =
    document.getElementById(
        "destinationCount"
    );
 
 
    if (busCount) {
 
        busCount.innerText =
        buses.length;
 
    }
 
 
    if (hotelCount) {
 
        hotelCount.innerText =
        hotels.length;
 
    }
 
 
    if (bookingCount) {
 
        bookingCount.innerText =
        bookings.length;
 
    }
 
 
    if (packageCount) {
 
        packageCount.innerText =
        packages.length;
 
    }
 
 
    if (destinationCount) {
 
        destinationCount.innerText =
        destinations.length;
 
    }
 
 
    updateRevenue();
 
}
// =========================================
// UPDATE BOOKING STATUS COUNTS
// =========================================
 
function updateBookingStatusCounts() {
 
    let bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
 
 
    let active = 0;
 
    let confirmed = 0;
 
    let expired = 0;
 
    let pending = 0;
 
    let cancelled = 0;
 
 
    bookings.forEach(function(booking) {
 
        let status =
        (
            booking.status || "confirmed"
        )
        .toLowerCase()
        .trim();
 
 
        if (status === "active") {
 
            active++;
 
        }
 
 
        else if (status === "confirmed") {
 
            confirmed++;
 
        }
 
 
        else if (status === "expired") {
 
            expired++;
 
        }
 
 
        else if (
            status === "pending payment"
        ) {
 
            pending++;
 
        }
 
 
        else if (
            status === "cancelled"
        ) {
 
            cancelled++;
 
        }
 
    });
 
 
    let activeCount =
    document.getElementById(
        "activeBookingCount"
    );
 
 
    let confirmedCount =
    document.getElementById(
        "confirmedBookingCount"
    );
 
 
    let expiredCount =
    document.getElementById(
        "expiredBookingCount"
    );
 
 
    let pendingCount =
    document.getElementById(
        "pendingBookingCount"
    );
 
 
    let cancelledCount =
    document.getElementById(
        "cancelledBookingCount"
    );
 
 
    if (activeCount) {
 
        activeCount.innerText = active;
 
    }
 
 
    if (confirmedCount) {
 
        confirmedCount.innerText = confirmed;
 
    }
 
 
    if (expiredCount) {
 
        expiredCount.innerText = expired;
 
    }
 
 
    if (pendingCount) {
 
        pendingCount.innerText = pending;
 
    }
 
 
    if (cancelledCount) {
 
        cancelledCount.innerText = cancelled;
 
    }
 
}
 
// =========================================
// ADMIN TOTAL REVENUE
// =========================================
 
function updateRevenue()
{
    let totalRevenue =
        Number(
            localStorage.getItem("ownerRevenue")
        ) || 0;
 
 
    totalRevenue =
        Math.round(
            (totalRevenue + Number.EPSILON) * 100
        ) / 100;
 
 
    let revenueCount =
        document.getElementById(
            "revenueCount"
        );
 
 
    if(revenueCount)
    {
        revenueCount.innerText =
            "₹" +
            totalRevenue.toFixed(2);
    }
}
// =========================================
// INITIALIZE OWNER REVENUE FOR OLD BOOKINGS
// RUNS ONLY ONCE
// =========================================
 
function initializeOwnerRevenue()
{
    let existingRevenue =
        localStorage.getItem("ownerRevenue");
 
 
    // If ownerRevenue already exists,
    // do not calculate again
 
    if(existingRevenue !== null)
    {
        return;
    }
 
 
    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];
 
 
    let totalRevenue = 0;
 
 
    bookings.forEach(
        function(booking)
        {
 
            let status =
            (
                booking.status ||
                ""
            )
            .trim()
            .toLowerCase();
 
 
            // Ignore unpaid bookings
 
            if(status === "pending payment")
            {
                return;
            }
 
 
            // Ignore cancelled bookings
 
            if(status === "cancelled")
            {
                return;
            }
 
 
            let amount =
            Number(
                booking.price
            ) || 0;
 
 
            totalRevenue +=
            amount;
 
        }
    );
 
 
    localStorage.setItem(
        "ownerRevenue",
        totalRevenue.toString()
    );
}
 
// =========================================
// CHECK ADMIN ACCESS
// =========================================
 
function checkAdminAccess() {
 
    let role =
    localStorage.getItem(
        "userRole"
    );
 
 
    if (
        role !== "admin"
    ) {
 
        alert(
            "Access denied!"
        );
 
        window.location.href =
        "admin-login.html";
 
    }
 
}
 
 
// =========================================
// SHOW BILL
// =========================================
 
function showBill()
{
 
    let billData =
    JSON.parse(
        localStorage.getItem(
            "latestBill"
        )
    );
 
 
    let bill =
    document.getElementById(
        "billContent"
    );
 
 
    if(
        !billData ||
        !bill
    )
    {
        return;
    }
 
 
    // =========================================
    // GET BOOKING STATUS
    // =========================================
 
    let status =
    (
        billData.status ||
        "Confirmed"
    )
    .trim()
    .toLowerCase();
 
 
    let statusText =
    billData.status ||
    "Confirmed";
 
 
    let statusIcon =
    "✅";
 
 
    if(status === "cancelled")
    {
        statusIcon = "❌";
    }
 
    else if(status === "expired")
    {
        statusIcon = "🔴";
    }
 
    else if(status === "pending payment")
    {
        statusIcon = "🟠";
    }
 
 
    // =========================================
    // EXTRA DETAILS
    // =========================================
 
    let extra = "";
 
 
    // =========================================
    // BUS
    // =========================================
 
    if(
        billData.type === "Bus"
    )
    {
 
        extra = `
 
            <div class="bill-details">
 
                <p>
                    <strong>Travel Date:</strong>
                    ${billData.date || "N/A"}
                </p>
 
                <p>
                    <strong>Passengers:</strong>
                    ${billData.passengers || "N/A"}
                </p>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // HOTEL
    // =========================================
 
    else if(
        billData.type === "Hotel"
    )
    {
 
        extra = `
 
            <div class="bill-details">
 
                <p>
                    <strong>Check-In:</strong>
                    ${billData.checkIn || "N/A"}
                </p>
 
                <p>
                    <strong>Check-Out:</strong>
                    ${billData.checkOut || "N/A"}
                </p>
 
                <p>
                    <strong>Nights:</strong>
                    ${billData.nights || "N/A"}
                </p>
 
                <p>
                    <strong>Rooms:</strong>
                    ${billData.rooms || "N/A"}
                </p>
 
                <p>
                    <strong>Guests:</strong>
                    ${billData.guests || "N/A"}
                </p>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // PACKAGE
    // =========================================
 
    else if(
        billData.type === "Package"
    )
    {
 
        extra = `
 
            <div class="bill-details">
 
                <p>
                    <strong>Travel Date:</strong>
                    ${billData.date || "N/A"}
                </p>
 
                <p>
                    <strong>Guests:</strong>
                    ${billData.guests || "N/A"}
                </p>
 
                <p>
                    <strong>Discount:</strong>
                    ${billData.discount || 0}%
                </p>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // REFUND SECTION
    // =========================================
 
    let refundSection = "";
 
 
    if(
        status === "cancelled"
    )
    {
 
        let refundAmount =
        Number(
            billData.refundAmount
        ) || Number(
            billData.price
        ) || 0;
 
 
        refundSection = `
 
            <div
                class="bill-details"
                style="
                    margin-top: 15px;
                    padding: 15px;
                    border-radius: 10px;
                    background: #fff1f2;
                    border: 1px solid #fecdd3;
                "
            >
 
                <p>
                    <strong>Refund Status:</strong>
                    Refunded
                </p>
 
                <p>
                    <strong>Refund Amount:</strong>
                    ₹${refundAmount}
                </p>
 
            </div>
 
        `;
 
    }
 
 
    // =========================================
    // CREATE BILL
    // =========================================
 
    bill.innerHTML = `
 
        <div class="bill-header">
 
            <h1>
                🚌 TravelEase
            </h1>
 
            <p>
                Your Travel Partner
            </p>
 
        </div>
 
 
        <h2>
            Booking Receipt
        </h2>
 
 
        <hr>
 
 
        <div class="bill-details">
 
            <p>
                <strong>Booking ID:</strong>
                ${billData.bookingId || "N/A"}
            </p>
 
            <p>
                <strong>Customer:</strong>
                ${billData.customer || "N/A"}
            </p>
 
            <p>
                <strong>Booking Type:</strong>
                ${billData.type || "N/A"}
            </p>
 
            <p>
                <strong>Name:</strong>
                ${billData.name || "N/A"}
            </p>
 
            <p>
                <strong>Location:</strong>
                ${billData.location || "N/A"}
            </p>
 
            <p>
                <strong>Payment Method:</strong>
                ${billData.paymentMethod || "N/A"}
            </p>
 
        </div>
 
 
        ${extra}
 
 
        <hr>
 
 
        <div class="bill-total">
 
            <h2>
                Total Amount
            </h2>
 
            <h1>
                ₹${billData.price || 0}
            </h1>
 
        </div>
 
 
        ${refundSection}
 
 
        <p class="bill-status">
 
            <strong>Status:</strong>
            ${statusText} ${statusIcon}
 
        </p>
 
 
        <hr>
 
 
        <div class="bill-footer">
 
            <p>
                Thank you for choosing TravelEase! ❤️
            </p>
 
            <small>
                Have a safe and happy journey!
            </small>
 
        </div>
 
    `;
 
}
 
 
// =========================================
// PRINT BILL
// =========================================
 
function printBill() {
 
    let billContent =
    document.getElementById("billContent");
 
 
    if (!billContent) {
 
        alert(
            "Bill not found!"
        );
 
        return;
 
    }
 
 
    let printWindow =
    window.open(
        "",
        "",
        "width=800,height=700"
    );
 
 
    printWindow.document.write(`
 
        <html>
 
        <head>
 
            <title>
                TravelEase Booking Receipt
            </title>
 
            <style>
 
                body {
 
                    font-family:
                    Arial, sans-serif;
 
                    padding:
                    40px;
 
                    color:
                    #222;
 
                    background:
                    white;
 
                }
 
 
                #billContent {
 
                    max-width:
                    650px;
 
                    margin:
                    auto;
 
                    border:
                    2px solid #333;
 
                    border-radius:
                    10px;
 
                    padding:
                    30px;
 
                }
 
 
                .bill-header {
 
                    text-align:
                    center;
 
                }
 
 
                .bill-total {
 
                    text-align:
                    center;
 
                    padding:
                    15px;
 
                    background:
                    #f3f4f6;
 
                }
 
 
                .bill-footer {
 
                    text-align:
                    center;
 
                }
 
            </style>
 
        </head>
 
 
        <body>
 
            <div id="billContent">
 
                ${billContent.innerHTML}
 
            </div>
 
        </body>
 
        </html>
 
    `);
 
 
    printWindow.document.close();
 
 
    setTimeout(function() {
 
        printWindow.print();
 
        printWindow.close();
 
    }, 500);
 
}
 
// =========================================
// SHOW VISIT LIST
// =========================================
 
function showVisitList() {
 
    let container =
    document.getElementById(
        "visitListResults"
    );
 
 
    if (!container) {
 
        return;
 
    }
 
 
    let currentUser =
    localStorage.getItem(
        "currentUser"
    );
 
 
    if (!currentUser) {
 
        container.innerHTML = `
 
            <div class="empty-message">
 
                <h3>
                    Please login first!
                </h3>
 
            </div>
 
        `;
 
        return;
 
    }
 
 
    let visitList =
    JSON.parse(
        localStorage.getItem(
            "visitList"
        )
    ) || [];
 
 
    let userVisitList =
    visitList.filter(function(item) {
 
        return (
            item.customer === currentUser
        );
 
    });
 
 
    container.innerHTML = "";
 
 
    if (
        userVisitList.length === 0
    ) {
 
        container.innerHTML = `
 
            <div class="empty-message">
 
                <h3>
                    ❤️ No Destinations Added Yet
                </h3>
 
                <p>
                    Explore destinations and add places
                    you want to visit.
                </p>
 
                <a
                    href="destinations.html"
                    class="primary-btn"
                >
 
                    Explore Destinations
 
                </a>
 
            </div>
 
        `;
 
        return;
 
    }
 
 
    userVisitList.forEach(
        function(item, index) {
 
            container.innerHTML += `
 
                <div class="visit-card">
 
                    <div class="visit-icon">
 
                        ${item.emoji}
 
                    </div>
 
 
                    <div class="visit-info">
 
                        <h2>
 
                            ${item.name}
 
                        </h2>
 
                        <p>
 
                            ❤️ Added to your travel
                            wishlist
 
                        </p>
 
                    </div>
 
 
                    <button
                        class="delete-btn"
                        onclick="removeFromVisitList(${index})"
                    >
 
                        Remove
 
                    </button>
 
                </div>
 
            `;
 
        }
    );
 
}
// =========================================
// UPDATE EXPIRED BOOKINGS
// =========================================
 
// =========================================
// UPDATE EXPIRED / ACTIVE BOOKINGS
// =========================================
 
function updateExpiredBookings()
{
 
    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];
 
 
    let today =
        new Date();
 
    today.setHours(
        0,
        0,
        0,
        0
    );
 
 
    bookings.forEach(
        function(booking)
        {
 
            // =========================================
            // GET BOOKING DATE
            // =========================================
 
            let bookingDateValue =
                booking.date;
 
 
            // HOTEL USES CHECK-OUT DATE
            if(
                booking.type === "Hotel"
            )
            {
                bookingDateValue =
                    booking.checkOut;
            }
 
 
            // =========================================
            // NO DATE = DO NOTHING
            // =========================================
 
            if(!bookingDateValue)
            {
                return;
            }
 
 
            // =========================================
            // CREATE BOOKING DATE
            // =========================================
 
            let bookingDate =
                new Date(
                    bookingDateValue +
                    "T00:00:00"
                );
 
 
            // =========================================
            // INVALID DATE SAFETY
            // =========================================
 
            if(
                isNaN(
                    bookingDate.getTime()
                )
            )
            {
                return;
            }
 
 
            // =========================================
            // GET CURRENT STATUS
            // =========================================
 
            let status =
            (
                booking.status ||
                "Confirmed"
            )
            .trim()
            .toLowerCase();
 
 
            // =========================================
            // DO NOT CHANGE CANCELLED BOOKINGS
            // =========================================
 
            if(
                status === "cancelled"
            )
            {
                return;
            }
 
 
            // =========================================
            // DO NOT CHANGE PENDING PAYMENT
            // =========================================
 
            if(
                status === "pending payment"
            )
            {
                return;
            }
 
 
            // =========================================
            // FUTURE BOOKING
            // =========================================
 
            if(
                bookingDate > today
            )
            {
 
                /*
                    If an old status was Expired
                    or Active, restore it to Confirmed.
                */
 
                if(
                    status === "expired" ||
                    status === "active"
                )
                {
                    booking.status =
                        "Confirmed";
                }
 
                return;
            }
 
 
            // =========================================
            // TODAY'S BOOKING
            // =========================================
 
            if(
                bookingDate.getTime() ===
                today.getTime()
            )
            {
                booking.status =
                    "Active";
 
                return;
            }
 
 
            // =========================================
            // PAST BOOKING
            // =========================================
 
            booking.status =
                "Expired";
 
 
            // =========================================
            // IMPORTANT
            // DO NOT DELETE BOOKING
            // =========================================
 
            return;
 
        }
    );
 
 
    // =========================================
    // SAVE UPDATED BOOKINGS
    // =========================================
 
    localStorage.setItem(
        "bookings",
        JSON.stringify(
            bookings
        )
    );
 
 
    // =========================================
    // UPDATE GLOBAL BOOKINGS ARRAY
    // =========================================
 
    window.bookings =
        bookings;
 
}
// =========================================
// PAGE LOAD
// =========================================
window.addEventListener(
    "DOMContentLoaded",
    function()
    {
 
        // =========================================
        // INITIALIZE OWNER REVENUE
        // =========================================
 
        initializeOwnerRevenue();
 
 
        // =========================================
        // LOAD OWNER NOTIFICATIONS
        // =========================================
 
        showOwnerNotifications();
 
 
        // =========================================
        // UPDATE BOOKING STATUS FIRST
        // =========================================
 
        updateExpiredBookings();
 
 
        updateNavbar();
 
 
        showAllBuses();
 
 
        showHotels();
 
 
        showPackages();
 
 
        showDestinations();
 
 
        renderBookings();
 
 
        showVisitList();
 
 
        // =========================================
        // ADMIN FUNCTIONS
        // =========================================
 
        showAdminBookings();
 
 
        showAdminBuses();
 
 
        showAdminHotels();
 
 
        showAdminPackages();
 
 
        showAdminDestinations();
 
 
        updateAdminCounts();
 
 
        // =========================================
        // UPDATE BOOKING STATUS COUNTS
        // =========================================
 
        updateBookingStatusCounts();
 
 
        loadSearchValues();
 
 
        loadBusBooking();
 
 
        loadHotelBooking();
 
 
        loadPackageBooking();
 
 
        loadDestinationDetails();
 
 
        loadPaymentDetails();
 
 
        showBill();
 
 
        setMinimumDates();
 
    }
);
/* ========================================================================
   TravelEase MongoDB Backend Bridge - FINAL
   Public visitors receive catalogue data only.
   Admin sessions alone can read/write complete private state.
   Customer bookings are created through the payment API, not full-state PUT.
   ======================================================================== */
(function () {
    "use strict";
    const API_BASE = window.location.origin + "/api";
    const PERSISTENT_KEYS = ["buses", "hotels", "packages", "destinations", "bookings", "users", "ownerRevenue"];
    const CATALOG_KEYS = ["buses", "hotels", "packages", "destinations"];
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    const originalGetItem = Storage.prototype.getItem;
    let backendReady = false, backendSyncPaused = false, syncTimer = null;
    let syncQueue = Promise.resolve(), hydrationPromise = null, pendingLocalChange = false;
 
    function isAdminSession() {
        return originalGetItem.call(localStorage, "userRole") === "admin" &&
            !!originalGetItem.call(localStorage, "adminToken");
    }
    function adminHeaders(extra) {
        const headers = Object.assign({ "Accept": "application/json" }, extra || {});
        const token = originalGetItem.call(localStorage, "adminToken");
        if (token) headers.Authorization = "Bearer " + token;
        return headers;
    }
    function parseStoredValue(key) {
        const raw = originalGetItem.call(localStorage, key);
        if (raw === null) return undefined;
        try { return JSON.parse(raw); } catch (error) { return undefined; }
    }
    function getDefaultValue(key) {
        try {
            if (key === "buses" && Array.isArray(buses)) return buses;
            if (key === "hotels" && Array.isArray(hotels)) return hotels;
            if (key === "packages" && Array.isArray(packages)) return packages;
            if (key === "destinations" && Array.isArray(destinations)) return destinations;
            if (key === "bookings" && Array.isArray(bookings)) return bookings;
            if (key === "users") return [];
            if (key === "ownerRevenue") return 0;
        } catch (error) {}
        return undefined;
    }
    function readPersistentState() {
        const state = {};
        PERSISTENT_KEYS.forEach(key => {
            const stored = parseStoredValue(key);
            state[key] = stored !== undefined ? stored : getDefaultValue(key);
        });
        return state;
    }
    function validateFullState(state) {
        if (!state || typeof state !== "object" || Array.isArray(state)) return false;
        return ["buses", "hotels", "packages", "destinations", "bookings", "users"]
            .every(key => Array.isArray(state[key])) &&
            (typeof state.ownerRevenue === "number" || typeof state.ownerRevenue === "string");
    }
    function refreshPage() {
        ["updateNavbar", "showAllBuses", "showHotels", "showPackages", "showDestinations",
         "renderBookings", "showBookings", "showAdminBookings", "showAdminBuses",
         "showAdminHotels", "showAdminPackages", "showAdminDestinations",
         "updateAdminCounts", "updateBookingStatusCounts", "updateRevenue"].forEach(name => {
            try { if (typeof window[name] === "function") window[name](); }
            catch (error) { console.warn("TravelEase UI refresh skipped:", name, error); }
        });
    }
    function applyCatalogue(state) {
        if (!state || typeof state !== "object" || Array.isArray(state)) throw new Error("Invalid public catalogue.");
        backendSyncPaused = true;
        try {
            CATALOG_KEYS.forEach(key => {
                if (!Array.isArray(state[key])) throw new Error("Catalogue is missing " + key + ".");
                originalSetItem.call(localStorage, key, JSON.stringify(state[key]));
            });
            buses = state.buses; hotels = state.hotels; packages = state.packages; destinations = state.destinations;
        } finally { backendSyncPaused = false; }
        refreshPage();
    }
    function applyFullState(state) {
        if (!validateFullState(state)) throw new Error("Backend returned incomplete TravelEase admin data.");
        backendSyncPaused = true;
        try {
            PERSISTENT_KEYS.forEach(key => originalSetItem.call(localStorage, key, JSON.stringify(state[key])));
            buses = state.buses; hotels = state.hotels; packages = state.packages;
            destinations = state.destinations; bookings = state.bookings;
        } finally { backendSyncPaused = false; }
        refreshPage();
    }
    async function requestBackendState() {
        const admin = isAdminSession();
        const response = await fetch(API_BASE + (admin ? "/state" : "/public/state"), {
            method: "GET", cache: "no-store",
            headers: admin ? adminHeaders() : { "Accept": "application/json" }
        });
        if (!response.ok) {
            if (admin && response.status === 401) originalRemoveItem.call(localStorage, "adminToken");
            throw new Error("Backend state request failed: HTTP " + response.status);
        }
        const payload = await response.json();
        if (!payload || typeof payload !== "object") throw new Error("Invalid backend response.");
        return { payload, admin };
    }
    async function sendStateToBackend() {
        if (!backendReady || backendSyncPaused || !isAdminSession()) return false;
        const state = readPersistentState();
        if (!validateFullState(state)) throw new Error("Admin save cancelled; local data is incomplete.");
        const response = await fetch(API_BASE + "/state", {
            method: "PUT",
            headers: adminHeaders({ "Content-Type": "application/json" }),
            body: JSON.stringify(state)
        });
        if (!response.ok) {
            if (response.status === 401) originalRemoveItem.call(localStorage, "adminToken");
            throw new Error("Backend save failed: HTTP " + response.status);
        }
        return true;
    }
    function queueBackendSave() {
        if (!isAdminSession() || !backendReady || backendSyncPaused) return;
        clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
            syncQueue = syncQueue.then(sendStateToBackend).catch(error => {
                console.error("TravelEase: Admin cloud save failed; local copy is retained.", error);
            });
        }, 400);
    }
    Storage.prototype.setItem = function (key, value) {
        originalSetItem.call(this, key, value);
        if (this === localStorage && PERSISTENT_KEYS.includes(String(key))) queueBackendSave();
    };
    Storage.prototype.removeItem = function (key) {
        originalRemoveItem.call(this, key);
        if (this === localStorage && PERSISTENT_KEYS.includes(String(key))) queueBackendSave();
    };
    async function refreshCustomerBookingStatuses() {
        if (isAdminSession()) return;
        const localBookings = parseStoredValue("bookings");
        if (!Array.isArray(localBookings) || localBookings.length === 0) return;
        let changed = false;
        for (const item of localBookings) {
            if (!item || !item.bookingId) continue;
            try {
                const response = await fetch(API_BASE + "/bookings/" +
                    encodeURIComponent(item.bookingId) + "/status", {
                    method: "GET", cache: "no-store",
                    headers: { "Accept": "application/json" }
                });
                if (!response.ok) continue;
                const latest = await response.json();
                if (!latest || !latest.ok) continue;
                item.status = latest.status || item.status;
                item.paymentStatus = latest.paymentStatus || item.paymentStatus;
                item.refundStatus = latest.refundStatus || item.refundStatus;
                if (latest.paymentVerifiedAt) item.paymentVerifiedAt = latest.paymentVerifiedAt;
                if (latest.refundedAt) item.refundedAt = latest.refundedAt;
                changed = true;
            } catch (error) {
                console.warn("TravelEase booking status refresh skipped:", error);
            }
        }
        if (changed) {
            originalSetItem.call(localStorage, "bookings", JSON.stringify(localBookings));
            bookings = localBookings;
            refreshPage();
        }
    }
 
    async function hydrateFromBackend(forceRefresh) {
        if (hydrationPromise && !forceRefresh) return hydrationPromise;
        hydrationPromise = (async function () {
            backendReady = false;
            try {
                const result = await requestBackendState(), payload = result.payload;
                if (!payload.initialized || !payload.state) {
                    if (!result.admin) { console.warn("TravelEase catalogue is not initialized."); return false; }
                    throw new Error("TravelEase database is not initialized; no browser defaults were uploaded.");
                }
                if (result.admin) {
                    const merged = {};
                    PERSISTENT_KEYS.forEach(key => {
                        if (Object.prototype.hasOwnProperty.call(payload.state, key)) merged[key] = payload.state[key];
                        else {
                            const local = parseStoredValue(key);
                            merged[key] = local !== undefined ? local : getDefaultValue(key);
                        }
                    });
                    applyFullState(merged);
                    backendReady = true;
                    if (pendingLocalChange) { pendingLocalChange = false; queueBackendSave(); }
                    console.log("TravelEase protected admin data loaded.");
                } else {
                    applyCatalogue(payload.state);
                    backendReady = false; // no full-state writes from customer/public browsers
                    console.log("TravelEase public catalogue loaded.");
                }
                return true;
            } catch (error) {
                backendReady = false;
                console.error("TravelEase backend hydration failed; local data is retained and cloud sync is paused.", error);
                return false;
            }
        })();
        return hydrationPromise;
    }
    window.travelEaseSaveNow = async function () {
        if (!isAdminSession()) return false;
        await hydrateFromBackend();
        if (!backendReady) return false;
        clearTimeout(syncTimer);
        await syncQueue;
        return await sendStateToBackend();
    };
    window.travelEaseRefreshFromBackend = async function () {
        hydrationPromise = null;
        return await hydrateFromBackend(true);
    };
    window.travelEaseRetrySync = async function () {
        hydrationPromise = null;
        const ok = await hydrateFromBackend(true);
        if (!ok || !isAdminSession()) return false;
        await syncQueue;
        return await sendStateToBackend();
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => hydrateFromBackend(), { once: true });
    } else hydrateFromBackend();
    window.addEventListener("online", function () {
        if (!backendReady) { hydrationPromise = null; hydrateFromBackend(); }
    });
})();
document.addEventListener("DOMContentLoaded", function () {
    const fieldGroups = [
        ["busName", "busFrom", "busTo", "busTime", "busPrice"],
        ["hotelName", "hotelLocation", "hotelPrice", "totalRooms", "availableRooms"],
        ["packageEmoji", "packageName", "packageLocation", "packageDescription", "packagePrice", "packageDiscount"],
        ["destinationEmoji", "destinationName", "destinationDescription", "destinationAttractions", "destinationImage"]
    ];
 
    fieldGroups.forEach(function (group) {
        const fields = group
            .map(id => document.getElementById(id))
            .filter(Boolean);
 
        fields.forEach(function (field, index) {
            field.addEventListener("keydown", function (event) {
                if (field.tagName === "TEXTAREA") return;
                if (event.ctrlKey || event.altKey || event.metaKey) return;
 
                const textInputTypes = [
                    "text", "search", "email", "url", "tel", "password"
                ];
 
                const supportsTextSelection =
                    textInputTypes.includes(field.type);
 
                if (event.key === "ArrowRight") {
                    const atEnd = !supportsTextSelection ||
                        (field.selectionStart === field.value.length &&
                         field.selectionEnd === field.value.length);
 
                    if (atEnd && index < fields.length - 1) {
                        event.preventDefault();
                        fields[index + 1].focus();
                    }
                }
 
                if (event.key === "ArrowLeft") {
                    const atStart = !supportsTextSelection ||
                        (field.selectionStart === 0 &&
                         field.selectionEnd === 0);
 
                    if (atStart && index > 0) {
                        event.preventDefault();
                        fields[index - 1].focus();
                    }
                }
            });
        });
    });
});
 
document.addEventListener("DOMContentLoaded", function () {
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
 
    [email, username, password].forEach(function (field) {
        if (field) {
            field.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
 
                    if (typeof adminLogin === "function" &&
                        username && username.value.trim() !== "") {
                        adminLogin();
                    } else if (typeof loginUser === "function") {
                        loginUser();
                    }
                }
            });
        }
    });
});
 
 
/* ========================================================================
   TravelEase Payment + Refund Integration
   Uses the payment/refund endpoints added in the updated server.js.
   Customer payments remain pending until the owner verifies the UTR.
   ======================================================================== */
(function () {
    "use strict";
 
    const TE_API = window.location.origin + "/api";
 
    function teGetJSON(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value == null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }
 
    function teSetMessage(message, isError) {
        const element = document.getElementById("paymentMessage");
        if (element) {
            element.textContent = message;
            element.style.color = isError ? "#b42318" : "#137333";
        } else {
            alert(message);
        }
    }
 
    async function teApi(path, options) {
        const config = options || {};
        config.headers = Object.assign(
            { "Accept": "application/json" },
            config.headers || {}
        );
        const response = await fetch(TE_API + path, config);
        let payload = {};
        try { payload = await response.json(); } catch (error) {}
        if (!response.ok) {
            throw new Error(payload.message || ("Request failed: HTTP " + response.status));
        }
        return payload;
    }
 
    function teEnsureBookingId(booking) {
        if (!booking.bookingId) {
            booking.bookingId = "TE-" + Date.now() + "-" +
                Math.random().toString(36).slice(2, 8).toUpperCase();
        }
        return booking.bookingId;
    }
 
    async function teSaveBookingToCloud(booking) {
        // Keep all existing bookings; only add/update the booking being paid.
        const saved = teGetJSON("bookings", Array.isArray(window.bookings) ? window.bookings : []);
        const index = saved.findIndex(item =>
            item && String(item.bookingId || "") === String(booking.bookingId)
        );
        if (index >= 0) saved[index] = Object.assign({}, saved[index], booking);
        else saved.push(booking);
 
        localStorage.setItem("bookings", JSON.stringify(saved));
        window.bookings = saved;
        // Customer browsers cannot upload private full-state data. The payment API
        // persists this booking on the server together with its UTR submission.
    }
 
    async function teLoadUpiConfig() {
        const info = document.getElementById("upiPaymentInfo");
        const qrContainer = document.getElementById("upiQrContainer");
        const openLink = document.getElementById("openUpiApp");
        if (!info) return;
 
        try {
            const config = await teApi("/payment/config");
            const booking = teGetJSON("pendingBooking", null);
            if (!booking) throw new Error("Booking information not found. Please start booking again.");
 
            const upiId = String(config.upiId || "").trim();
            const payeeName = String(config.payeeName || "TravelEase").trim();
            if (!upiId) throw new Error("Owner UPI ID is not configured.");
 
            const amount = Number(booking.price);
            const params = new URLSearchParams({
                pa: upiId,
                pn: payeeName,
                am: amount.toFixed(2),
                cu: "INR",
                tn: "TravelEase " + (booking.bookingId || "Booking")
            });
            const upiLink = "upi://pay?" + params.toString();
 
            info.textContent = "UPI ID: " + upiId + " | Payee: " + payeeName;
            if (openLink) {
                openLink.href = upiLink;
                openLink.hidden = false;
                openLink.setAttribute("target", "_blank");
                openLink.setAttribute("rel", "noopener");
            }
            if (qrContainer) {
                const qr = document.createElement("img");
                qr.alt = "UPI payment QR code";
                qr.width = 220;
                qr.height = 220;
                qr.loading = "lazy";
                qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
                    encodeURIComponent(upiLink);
                qrContainer.replaceChildren(qr);
            }
        } catch (error) {
            info.textContent = error.message;
            if (openLink) openLink.hidden = true;
            if (qrContainer) qrContainer.replaceChildren();
        }
    }
 
    async function teProcessPayment() {
        const button = document.getElementById("submitPaymentBtn");
        const utrInput = document.getElementById("paymentUtr");
        const booking = teGetJSON("pendingBooking", null);
 
        if (!booking) {
            teSetMessage("Booking information not found. Please start booking again.", true);
            return;
        }
        const utr = utrInput ? utrInput.value.trim() : "";
        if (!/^[A-Za-z0-9-]{6,40}$/.test(utr)) {
            teSetMessage("Please enter a valid UPI UTR / transaction reference (6–40 letters or numbers).", true);
            if (utrInput) utrInput.focus();
            return;
        }
 
        const amount = Number(booking.price);
        if (!Number.isFinite(amount) || amount <= 0) {
            teSetMessage("Invalid booking amount. Please contact the owner.", true);
            return;
        }
 
        if (button) {
            button.disabled = true;
            button.textContent = "Submitting...";
        }
 
        try {
            teEnsureBookingId(booking);
            booking.status = "Pending Payment";
            booking.paymentStatus = "PAYMENT_SUBMITTED";
            booking.paymentMethod = "UPI";
            booking.paymentUtr = utr;
            booking.paymentSubmittedAt = new Date().toISOString();
 
            // Persist booking first so the API can find it by bookingId.
            await teSaveBookingToCloud(booking);
            localStorage.setItem("pendingBooking", JSON.stringify(booking));
 
            const users = teGetJSON("users", []);
            const customer = users.find(user =>
                user && user.email === localStorage.getItem("currentUser")
            ) || {};
 
            const result = await teApi("/payments/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId: booking.bookingId,
                    utr: utr,
                    amount: amount,
                    booking: booking,
                    customerName: customer.name || booking.customer || "",
                    customerMobile: customer.mobile || customer.phone || ""
                })
            });
 
            booking.paymentStatus = result.status || "PAYMENT_SUBMITTED";
            booking.status = "Pending Payment";
            const latestBookings = teGetJSON("bookings", []);
            const idx = latestBookings.findIndex(item =>
                item && item.bookingId === booking.bookingId
            );
            if (idx >= 0) latestBookings[idx] = Object.assign({}, latestBookings[idx], booking);
            localStorage.setItem("bookings", JSON.stringify(latestBookings));
            window.bookings = latestBookings;
            localStorage.setItem("pendingBooking", JSON.stringify(booking));
            teSetMessage("UTR submitted successfully. Your booking is still pending and will be confirmed only after the owner verifies the payment.");
            if (button) button.textContent = "Submitted – Awaiting Verification";
            if (utrInput) utrInput.disabled = true;
        } catch (error) {
            teSetMessage(error.message || "Unable to submit payment details. Please try again.", true);
            if (button) {
                button.disabled = false;
                button.textContent = "Submit Payment for Verification";
            }
        }
    }
 
    async function teCancelBooking(index) {
        const list = teGetJSON("bookings", Array.isArray(window.bookings) ? window.bookings : []);
        const booking = list[index];
        if (!booking) {
            alert("Booking not found!");
            return;
        }
 
        const status = String(booking.status || "").toLowerCase();
        if (["cancelled", "expired", "pending payment"].includes(status)) {
            alert("This booking cannot be cancelled in its current status.");
            return;
        }
        if (booking.refundStatus === "CANCEL_REQUESTED" ||
            booking.refundStatus === "REFUND_PENDING" ||
            booking.refundStatus === "REFUNDED") {
            alert("A cancellation/refund request is already in progress or completed.");
            return;
        }
        if (!booking.bookingId) {
            alert("This older booking has no server booking ID. Please contact the owner to request cancellation; no automatic refund has been made.");
            return;
        }
        if (!confirm("Send a cancellation and refund request to the owner? The refund is not automatic.")) return;
 
        try {
            const result = await teApi("/refunds/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId: booking.bookingId,
                    reason: "Customer requested cancellation"
                })
            });
            booking.refundStatus = result.refund ? result.refund.status : "CANCEL_REQUESTED";
            list[index] = booking;
            localStorage.setItem("bookings", JSON.stringify(list));
            window.bookings = list;
            alert("Cancellation request sent. The owner must approve it and manually transfer any refund.");
            if (typeof showBookings === "function") showBookings();
            if (typeof renderBookings === "function") renderBookings();
        } catch (error) {
            alert(error.message || "Unable to send cancellation request.");
        }
    }
 
    async function teAdminLogin() {
        const usernameField = document.getElementById("username");
        const passwordField = document.getElementById("password");
        const username = usernameField ? usernameField.value.trim() : "";
        const password = passwordField ? passwordField.value : "";
 
        if (!username || !password) {
            alert("Please enter admin username and password.");
            return;
        }
 
        try {
            const result = await teApi("/auth/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (!result.token) throw new Error("Admin token was not returned by the server.");
            localStorage.setItem("adminToken", result.token);
            localStorage.setItem("currentUser", result.displayName || "TravelEase Owner");
            localStorage.setItem("userRole", "admin");
            alert("Owner login successful!");
            window.location.href = "admin-dashboard.html";
        } catch (error) {
            alert(error.message || "Admin login failed.");
        }
    }
 
    async function teLoadAdminPaymentData() {
        if (localStorage.getItem("userRole") !== "admin") return;
        const token = localStorage.getItem("adminToken");
        if (!token) return;
 
        const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
        try {
            const [paymentData, refundData] = await Promise.all([
                teApi("/admin/payments", { headers }),
                teApi("/admin/refunds", { headers })
            ]);
            window.travelEaseAdminPayments = paymentData.payments || [];
            window.travelEaseAdminRefunds = refundData.refunds || [];
            document.dispatchEvent(new CustomEvent("travelease:admin-payment-data", {
                detail: {
                    payments: window.travelEaseAdminPayments,
                    refunds: window.travelEaseAdminRefunds
                }
            }));
            // Dashboard sections are added in the admin-dashboard.html update.
            if (typeof window.renderAdminPayments === "function") window.renderAdminPayments(window.travelEaseAdminPayments);
            if (typeof window.renderAdminRefunds === "function") window.renderAdminRefunds(window.travelEaseAdminRefunds);
        } catch (error) {
            console.error("TravelEase admin payment data:", error);
            if (error.message && /session|authentication|admin/i.test(error.message)) {
                localStorage.removeItem("adminToken");
            }
        }
    }
 
    async function teAdminPaymentDecision(paymentId, decision) {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Admin session missing. Please log in again.");
        if (!confirm(decision === "VERIFY"
            ? "Have you independently confirmed this payment in your UPI/bank account?"
            : "Reject this payment submission?")) return;
 
        try {
            await teApi("/admin/payments/" + encodeURIComponent(paymentId) + "/decision", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ decision: decision })
            });
            alert(decision === "VERIFY" ? "Payment verified and booking confirmed." : "Payment rejected.");
            if (typeof window.travelEaseRefreshFromBackend === "function") await window.travelEaseRefreshFromBackend();
            await teLoadAdminPaymentData();
        } catch (error) {
            alert(error.message || "Unable to update payment.");
        }
    }
 
    async function teAdminRefundDecision(refundId, decision) {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Admin session missing. Please log in again.");
        if (!confirm(decision === "APPROVE"
            ? "Approve the cancellation request? This does not transfer money."
            : "Reject this cancellation/refund request?")) return;
 
        try {
            await teApi("/admin/refunds/" + encodeURIComponent(refundId) + "/decision", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ decision: decision })
            });
            alert(decision === "APPROVE"
                ? "Refund approved. Transfer the money manually, then record its UTR."
                : "Refund request rejected.");
            if (typeof window.travelEaseRefreshFromBackend === "function") await window.travelEaseRefreshFromBackend();
            await teLoadAdminPaymentData();
        } catch (error) {
            alert(error.message || "Unable to update refund request.");
        }
    }
 
    async function teCompleteRefund(refundId) {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Admin session missing. Please log in again.");
        const utr = prompt("Enter the refund transaction UTR after you have actually transferred the money:");
        if (!utr) return;
        if (!/^[A-Za-z0-9-]{6,40}$/.test(utr.trim())) {
            alert("Please enter a valid refund UTR.");
            return;
        }
        try {
            await teApi("/admin/refunds/" + encodeURIComponent(refundId) + "/complete", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refundUtr: utr.trim() })
            });
            alert("Refund marked complete after recording the transfer UTR.");
            if (typeof window.travelEaseRefreshFromBackend === "function") await window.travelEaseRefreshFromBackend();
            await teLoadAdminPaymentData();
        } catch (error) {
            alert(error.message || "Unable to complete refund.");
        }
    }
 
    // Public functions used by existing HTML onclick handlers and the admin page.
    window.processPayment = teProcessPayment;
    window.cancelBooking = teCancelBooking;
    window.adminLogin = teAdminLogin;
    window.loadTravelEaseAdminPayments = teLoadAdminPaymentData;
    window.adminPaymentDecision = teAdminPaymentDecision;
    window.adminRefundDecision = teAdminRefundDecision;
    window.completeTravelEaseRefund = teCompleteRefund;
 
    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById("paymentSubmissionForm")) {
            teLoadUpiConfig();
        }
        if (localStorage.getItem("userRole") === "admin") {
            teLoadAdminPaymentData();
        }
    });
})();
