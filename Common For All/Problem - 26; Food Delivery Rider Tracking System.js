//Question 1: Insert 5 rider documents using insertMany() with different current_status values.
db.riders.insertMany([
  {
    rider_id: 1,
    rider_name: "Ramesh Kumar",
    city: "Mumbai",
    vehicle_type: "Bike",
    total_deliveries: 0,
    average_rating: 0.0,
    current_status: "Offline",
    earnings_today: 0,
    delivery_history: []
  },
  {
    rider_id: 2,
    rider_name: "Suresh Patel",
    city: "Pune",
    vehicle_type: "Scooter",
    total_deliveries: 35,
    average_rating: 4.8,
    current_status: "Available",
    earnings_today: 650,
    delivery_history: ["ORD1001", "ORD1002", "ORD1003"]
  },
  {
    rider_id: 3,
    rider_name: "Mahesh Singh",
    city: "Mumbai",
    vehicle_type: "Bike",
    total_deliveries: 12,
    average_rating: 4.2,
    current_status: "Busy",
    earnings_today: 300,
    delivery_history: ["ORD2001", "ORD2002"]
  },
  {
    rider_id: 4,
    rider_name: "Dinesh Verma",
    city: "Delhi",
    vehicle_type: "Scooter",
    total_deliveries: 52,
    average_rating: 4.9,
    current_status: "Available",
    earnings_today: 1200,
    delivery_history: ["ORD3001", "ORD3002", "ORD3003", "ORD3004"]
  },
  {
    rider_id: 5,
    rider_name: "Rakesh Yadav",
    city: "Delhi",
    vehicle_type: "Bike",
    total_deliveries: 28,
    average_rating: 4.6,
    current_status: "Busy",
    earnings_today: 780,
    delivery_history: ["ORD4001", "ORD4002", "ORD4003"]
  }
])

//Question 2: Find all riders where current_status is "Available" AND average_rating is greater than 4.5.
db.riders.find({
  $and: [
    { current_status: "Available" },
    { average_rating: { $gt: 4.5 } }
  ]
})
//

//Question 3: Update the earnings_today by adding ₹100 to all riders with total_deliveries greater than 20.
//Step 1 — First check current earnings_today for riders with total_deliveries > 20:
db.riders.find(
  { total_deliveries: { $gt: 20 } },
  { rider_name: 1, total_deliveries: 1, earnings_today: 1, _id: 0 }
)
/*Step 2 — Calculate new earnings after adding ₹100:
Suresh Patel :  650 + 100 =  750
Dinesh Verma : 1200 + 100 = 1300
Rakesh Yadav :  780 + 100 =  880*/
//Step 3 — Apply updated earnings to Suresh Patel:
db.riders.updateMany(
  {
    $and: [
      { total_deliveries: { $gt: 20 } },
      { rider_name: "Suresh Patel" }
    ]
  },
  { $set: { earnings_today: 750 } }
)
//Step 4 — Apply updated earnings to Dinesh Verma:
db.riders.updateMany(
  {
    $and: [
      { total_deliveries: { $gt: 20 } },
      { rider_name: "Dinesh Verma" }
    ]
  },
  { $set: { earnings_today: 1300 } }
)
//Step 5 — Apply updated earnings to Rakesh Yadav:
db.riders.updateMany(
  {
    $and: [
      { total_deliveries: { $gt: 20 } },
      { rider_name: "Rakesh Yadav" }
    ]
  },
  { $set: { earnings_today: 880 } }
)


//Question 4: Delete all riders where current_status is "Offline" AND total_deliveries is 0.
db.riders.deleteMany({
  $and: [
    { current_status: "Offline" },
    { total_deliveries: { $eq: 0 } }
  ]
})

//Question 5: Create a multikey index on the delivery_history array field.
db.riders.createIndex({ delivery_history: 1 })