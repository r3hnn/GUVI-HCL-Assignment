//Question 1: Insert 5 itinerary documents using insertMany() with different destinations.
db.itineraries.insertMany([
  {
    itinerary_id: 1,
    customer_name: "Rohit Sharma",
    destination: "Manali",
    trip_start_date: new Date("2023-11-10"),
    trip_end_date: new Date("2023-11-17"),
    budget: 35000,
    activities: ["Trekking", "Skiing", "Camping"],
    hotel_name: "Snow Valley Resort",
    booking_status: "Cancelled"
  },
  {
    itinerary_id: 2,
    customer_name: "Priya Verma",
    destination: "Goa",
    trip_start_date: new Date("2026-06-01"),
    trip_end_date: new Date("2026-06-07"),
    budget: 65000,
    activities: ["Beach Volleyball", "Snorkeling", "Surfing"],
    hotel_name: "Ocean Breeze Hotel",
    booking_status: "Confirmed"
  },
  {
    itinerary_id: 3,
    customer_name: "Ankit Das",
    destination: "Ladakh",
    trip_start_date: new Date("2023-09-05"),
    trip_end_date: new Date("2023-09-15"),
    budget: 80000,
    activities: ["Trekking", "Mountain Biking", "Photography"],
    hotel_name: "Himalayan Guest House",
    booking_status: "Cancelled"
  },
  {
    itinerary_id: 4,
    customer_name: "Sneha Nair",
    destination: "Kerala",
    trip_start_date: new Date("2026-08-10"),
    trip_end_date: new Date("2026-08-17"),
    budget: 55000,
    activities: ["Backwater Cruise", "Ayurveda Spa", "Trekking"],
    hotel_name: "Lakeside Retreat",
    booking_status: "Confirmed"
  },
  {
    itinerary_id: 5,
    customer_name: "Kavya Menon",
    destination: "Rajasthan",
    trip_start_date: new Date("2026-12-20"),
    trip_end_date: new Date("2026-12-30"),
    budget: 45000,
    activities: ["Desert Safari", "Camel Ride", "Heritage Walk"],
    hotel_name: "Royal Palace Inn",
    booking_status: "Pending"
  }
])

//Question 2: Find all itineraries where booking_status is "Confirmed" AND budget is greater than ₹50,000.
db.itineraries.find({
  $and: [
    { booking_status: "Confirmed" },
    { budget: { $gt: 50000 } }
  ]
})

//Question 3: Update the booking_status to "Cancelled" for all itineraries where trip_start_date is before today's date.
db.itineraries.updateMany(
  { trip_start_date: { $lt: new Date() } },
  { $set: { booking_status: "Cancelled" } }
)

//Question 4: Delete all itineraries with booking_status "Cancelled" AND trip_end_date before "2024- 01-01".
db.itineraries.deleteMany({
  $and: [
    { booking_status: "Cancelled" },
    { trip_end_date: { $lt: new Date("2024-01-01") } }
  ]
})

//Question 5: Find all itineraries where the activities array contains "Trekking" using array query operator.
db.itineraries.find({ activities: "Trekking" })