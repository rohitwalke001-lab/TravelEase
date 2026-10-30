/* ================= HOTEL DATA ================= */

const hotels = [

    {

        name: "Taj Resort & Convention Centre",

        city: "Goa",

        price: 6500,

        rating: "4.8",

        type: "Premium Hotel",

        image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"

    },


    {

        name: "Goa Beach Resort",

        city: "Goa",

        price: 3200,

        rating: "4.5",

        type: "Beach Resort",

        image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"

    },


    {

        name: "Snow Valley Resort",

        city: "Manali",

        price: 4500,

        rating: "4.7",

        type: "Mountain Resort",

        image:
        "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=900&q=80"

    },


    {

        name: "The Oberoi Udaivilas",

        city: "Udaipur",

        price: 12000,

        rating: "4.9",

        type: "Luxury Hotel",

        image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80"

    },


    {

        name: "Mumbai Grand Hotel",

        city: "Mumbai",

        price: 5500,

        rating: "4.6",

        type: "City Hotel",

        image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"

    },


    {

        name: "Pune Residency",

        city: "Pune",

        price: 2800,

        rating: "4.4",

        type: "Budget Hotel",

        image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80"

    }

];



/* ================= VARIABLES ================= */

let selectedHotel = "";

let selectedHotelPrice = 0;

let selectedRoom = "Standard Room";



/* ================= DISPLAY HOTELS ================= */

function displayHotels(hotelList) {

    const results =
        document.getElementById("hotelResults");


    results.innerHTML = "";


    hotelList.forEach(hotel => {


        results.innerHTML += `

            <div class="hotel-card">

                <img
                    src="${hotel.image}"
                    alt="${hotel.name}"
                >


                <div class="hotel-card-content">


                    <span class="hotel-location">

                        📍 ${hotel.city}

                    </span>


                    <h3>

                        ${hotel.name}

                    </h3>


                    <p>

                        ${hotel.type}

                    </p>


                    <div class="hotel-rating">

                        ★ ${hotel.rating}

                    </div>



                    <div class="hotel-bottom">


                        <div class="hotel-price">


                            <small>

                                Per Night

                            </small>


                            <strong>

                                ₹${hotel.price}

                            </strong>


                        </div>



                        <button
                            onclick="openHotelModal(
                                '${hotel.name}',
                                ${hotel.price}
                            )">

                            Book Now

                        </button>


                    </div>


                </div>


            </div>

        `;

    });

}



/* ================= DEFAULT HOTELS ================= */

displayHotels(hotels);



/* ================= SEARCH HOTELS ================= */

function searchHotels() {

    const city =
        document
        .getElementById("hotelCity")
        .value
        .trim()
        .toLowerCase();


    if (city === "") {


        displayHotels(hotels);


        document
        .getElementById("hotelResultText")
        .innerText =
        "Showing all popular hotels.";


        return;

    }



    const filteredHotels =
        hotels.filter(hotel =>

            hotel.city
            .toLowerCase()
            .includes(city)

        );



    document
    .getElementById("hotelResultText")
    .innerText =
    "Hotels available in " + city;



    if (
        filteredHotels.length === 0
    ) {


        document
        .getElementById("hotelResults")
        .innerHTML = `

            <div
                style="
                    grid-column: 1/-1;
                    text-align: center;
                    padding: 50px;
                ">


                <h3>

                    No hotels found

                </h3>


                <p>

                    Try Goa, Manali, Udaipur,
                    Mumbai or Pune.

                </p>


            </div>

        `;


        return;

    }


    displayHotels(filteredHotels);

}



/* ================= OPEN HOTEL MODAL ================= */

function openHotelModal(name, price) {

    selectedHotel =
        name;


    selectedHotelPrice =
        price;


    selectedRoom =
        "Standard Room";


    document
    .getElementById("selectedHotelName")
    .innerText =
    name;


    document
    .getElementById("selectedHotelPrice")
    .innerText =
    "₹" + price + " per night";


    document
    .querySelectorAll(".room-options button")
    .forEach(button => {

        button.classList
        .remove("selected-room");

    });



    document
    .getElementById("hotelModal")
    .classList
    .add("show");

}



/* ================= SELECT ROOM ================= */

function selectRoom(room, element) {

    selectedRoom =
        room;


    document
    .querySelectorAll(
        ".room-options button"
    )
    .forEach(button => {

        button.classList
        .remove("selected-room");

    });


    element.classList
    .add("selected-room");

}



/* ================= CLOSE HOTEL ================= */

function closeHotelModal() {

    document
    .getElementById("hotelModal")
    .classList
    .remove("show");

}



/* ================= CONFIRM HOTEL ================= */

function confirmHotelBooking() {

    const bookingId =
        "HT" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    alert(

        "Hotel Booking Confirmed!\n\n" +

        "Booking ID: " +
        bookingId +

        "\nHotel: " +
        selectedHotel +

        "\nRoom: " + 
        selectedRoom +

        "\nPrice: ₹" +
        selectedHotelPrice +

        " per night\n\n" +

        "Thank you for choosing TravelEase!"

    );


    closeHotelModal();

}
