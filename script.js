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

}function confirmBusBooking() {

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
// REGISTER USER
// =========================================

function registerUser() {

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();


    if (
        !name ||
        !email ||
        !password
    ) {

        alert(
            "Please fill all fields!"
        );

        return;

    }


    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


    let existingUser =
    users.find(function(user) {

        return (
            user.email === email
        );

    });


    if (existingUser) {

        alert(
            "Email already registered!"
        );

        return;

    }


    users.push({
    name: name,
    email: email,
    password: password,
    role: "customer",
    balance: 0
    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    alert(
        "Registration successful!"
    );


    window.location.href =
    "login.html";

}


// =========================================
// CUSTOMER LOGIN
// =========================================

function loginUser() {

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();


    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


    let user =
    users.find(function(item) {

        return (

            item.email === email &&

            item.password === password

        );

    });


    if (user) {

        localStorage.setItem(
            "currentUser",
            user.email
        );


        localStorage.setItem(
            "userRole",
            "customer"
        );


        alert(
            "Login successful!"
        );


        window.location.href =
        "index.html";

    }

    else {

        alert(
            "Invalid email or password!"
        );

    }

}


// =========================================
// ADMIN LOGIN
// =========================================

function adminLogin() {

    let username =
    document.getElementById(
        "username"
    ).value.trim();


    let password =
    document.getElementById(
        "password"
    ).value.trim();


    if (

        username === "admin" &&

        password === "admin123"

    ) {

        localStorage.setItem(
            "currentUser",
            "TravelEase Owner"
        );


        localStorage.setItem(
            "userRole",
            "admin"
        );


        alert(
            "Owner login successful!"
        );


        window.location.href =
        "admin-dashboard.html";

    }

    else {

        alert(
            "Invalid owner login details!"
        );

    }

}   


// =========================================
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
   TravelEase MongoDB Backend Bridge
   - Existing UI / HTML / CSS / functions unchanged
   - Saves important localStorage data to MongoDB through /api/state
   ======================================================================== */

(function () {

    const API_BASE = window.location.origin + "/api";

    const PERSISTENT_KEYS = [
        "buses",
        "hotels",
        "packages",
        "destinations",
        "bookings",
        "users",
        "ownerRevenue"
    ];

    const originalSetItem =
        Storage.prototype.setItem;

    const originalRemoveItem =
        Storage.prototype.removeItem;

    let backendSyncPaused = false;
    let syncTimer = null;


    // =========================================================
    // READ CURRENT FRONTEND DATA
    // =========================================================

    function readPersistentState() {

        const state = {};

        PERSISTENT_KEYS.forEach(function (key) {

            const value =
                localStorage.getItem(key);

            if (value !== null) {

                try {

                    state[key] =
                        JSON.parse(value);

                }
                catch (error) {

                    state[key] =
                        value;

                }

                return;
            }


            // Default frontend data

            try {

                if (
                    key === "buses" &&
                    Array.isArray(buses)
                ) {

                    state[key] = buses;

                }

                else if (
                    key === "hotels" &&
                    Array.isArray(hotels)
                ) {

                    state[key] = hotels;

                }

                else if (
                    key === "packages" &&
                    Array.isArray(packages)
                ) {

                    state[key] = packages;

                }

                else if (
                    key === "destinations" &&
                    Array.isArray(destinations)
                ) {

                    state[key] = destinations;

                }

                else if (
                    key === "bookings" &&
                    Array.isArray(bookings)
                ) {

                    state[key] = bookings;

                }

                else if (key === "users") {

                    state[key] = [];

                }

                else if (key === "ownerRevenue") {

                    state[key] = 0;

                }

            }
            catch (error) {}

        });

        return state;
    }


    // =========================================================
    // APPLY MONGODB DATA TO FRONTEND
    // =========================================================

    function refreshFrontendFromState(state) {

        if (
            !state ||
            typeof state !== "object"
        ) {

            return;
        }


        backendSyncPaused = true;


        try {

            PERSISTENT_KEYS.forEach(function (key) {

                if (
                    Object.prototype.hasOwnProperty.call(
                        state,
                        key
                    )
                ) {

                    originalSetItem.call(
                        localStorage,
                        key,
                        JSON.stringify(state[key])
                    );

                }

            });


            // Update global arrays

            if (Array.isArray(state.buses)) {

                buses = state.buses;

            }


            if (Array.isArray(state.hotels)) {

                hotels = state.hotels;

            }


            if (Array.isArray(state.packages)) {

                packages = state.packages;

            }


            if (Array.isArray(state.destinations)) {

                destinations =
                    state.destinations;

            }


            if (Array.isArray(state.bookings)) {

                bookings =
                    state.bookings;

            }

        }
        finally {

            backendSyncPaused = false;

        }


        // =====================================================
        // REFRESH CURRENT PAGE
        // =====================================================

        try {

            if (
                typeof updateNavbar === "function"
            ) {

                updateNavbar();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAllBuses === "function"
            ) {

                showAllBuses();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showHotels === "function"
            ) {

                showHotels();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showPackages === "function"
            ) {

                showPackages();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showDestinations === "function"
            ) {

                showDestinations();

            }

        }
        catch (e) {}


        try {

            if (
                typeof renderBookings === "function"
            ) {

                renderBookings();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showBookings === "function"
            ) {

                showBookings();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAdminBookings === "function"
            ) {

                showAdminBookings();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAdminBuses === "function"
            ) {

                showAdminBuses();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAdminHotels === "function"
            ) {

                showAdminHotels();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAdminPackages === "function"
            ) {

                showAdminPackages();

            }

        }
        catch (e) {}


        try {

            if (
                typeof showAdminDestinations === "function"
            ) {

                showAdminDestinations();

            }

        }
        catch (e) {}


        try {

            if (
                typeof updateAdminCounts === "function"
            ) {

                updateAdminCounts();

            }

        }
        catch (e) {}


        try {

            if (
                typeof updateBookingStatusCounts === "function"
            ) {

                updateBookingStatusCounts();

            }

        }
        catch (e) {}


        try {

            if (
                typeof updateRevenue === "function"
            ) {

                updateRevenue();

            }

        }
        catch (e) {}

    }


    // =========================================================
    // SAVE COMPLETE STATE TO MONGODB
    // =========================================================

    async function pushState() {

        if (backendSyncPaused) {

            return;

        }


        try {

            const state =
                readPersistentState();


            const response =
                await fetch(
                    API_BASE + "/state",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(state)
                    }
                );


            if (!response.ok) {

                console.error(
                    "TravelEase: Backend save failed."
                );

                return;

            }


            console.log(
                "TravelEase: Data saved to MongoDB."
            );

        }
        catch (error) {

            console.error(
                "TravelEase: MongoDB sync error:",
                error
            );

        }

    }


    // =========================================================
    // DELAYED SYNC
    // =========================================================

    function scheduleSync() {

        if (backendSyncPaused) {

            return;

        }


        clearTimeout(syncTimer);


        syncTimer =
            setTimeout(
                function () {

                    pushState();

                },
                500
            );

    }


    // =========================================================
    // INTERCEPT localStorage.setItem
    // =========================================================

    Storage.prototype.setItem =
        function (key, value) {

            originalSetItem.call(
                this,
                key,
                value
            );


            if (
                this === localStorage &&
                PERSISTENT_KEYS.includes(key)
            ) {

                scheduleSync();

            }

        };


    // =========================================================
    // INTERCEPT localStorage.removeItem
    // =========================================================

    Storage.prototype.removeItem =
        function (key) {

            originalRemoveItem.call(
                this,
                key
            );


            if (
                this === localStorage &&
                PERSISTENT_KEYS.includes(key)
            ) {

                scheduleSync();

            }

        };


    // =========================================================
    // LOAD DATA FROM MONGODB
    // =========================================================

    async function hydrateFromBackend() {

        try {

            const response =
                await fetch(
                    API_BASE + "/state",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                console.error(
                    "TravelEase: Unable to load backend data."
                );

                return;

            }


            const payload =
                await response.json();


            // =================================================
            // MONGODB HAS DATA
            // =================================================

            if (
                payload.initialized &&
                payload.state &&
                Object.keys(payload.state).length > 0
            ) {

                console.log(
                    "TravelEase: Loading data from MongoDB."
                );


                refreshFrontendFromState(
                    payload.state
                );

            }


            // =================================================
            // FIRST RUN
            // =================================================

            else {

                console.log(
                    "TravelEase: Initial data upload."
                );


                await pushState();

            }

        }
        catch (error) {

            console.error(
                "TravelEase: Backend unavailable.",
                error
            );

        }

    }


    // =========================================================
    // ADMIN LOGIN → BACKEND
    // =========================================================

    if (
        typeof adminLogin === "function"
    ) {

        adminLogin = async function () {

            const usernameElement =
                document.getElementById(
                    "username"
                );


            const passwordElement =
                document.getElementById(
                    "password"
                );


            const username =
                usernameElement
                    ? usernameElement.value.trim()
                    : "";


            const password =
                passwordElement
                    ? passwordElement.value.trim()
                    : "";


            if (
                !username ||
                !password
            ) {

                alert(
                    "Please enter owner login details!"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        API_BASE +
                        "/auth/admin-login",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username,
                                    password
                                })

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    alert(
                        result.message ||
                        "Invalid owner login details!"
                    );

                    return;

                }


                localStorage.setItem(
                    "currentUser",
                    result.displayName ||
                    "TravelEase Owner"
                );


                localStorage.setItem(
                    "userRole",
                    "admin"
                );


                alert(
                    "Owner login successful!"
                );


                window.location.href =
                    "admin-dashboard.html";

            }
            catch (error) {

                alert(
                    "Unable to connect to backend. Please try again."
                );

            }

        };

    }


    // =========================================================
    // START BACKEND HYDRATION
    // =========================================================

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            hydrateFromBackend
        );

    }

    else {

        hydrateFromBackend();

    }

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

