//Question 1: Insert 5 service records using insertMany() with different service types.
db.services.insertMany([
  {
    service_id: 1,
    customer_name: "Rohit Sharma",
    vehicle_number: "MH12AB1234",
    service_type: "Oil Change",
    service_date: new Date("2024-11-10"),
    cost: 450,
    status: "Completed"
  },
  {
    service_id: 2,
    customer_name: "Priya Verma",
    vehicle_number: "KA05CD5678",
    service_type: "Repair",
    service_date: new Date("2026-06-15"),
    cost: 3500,
    status: "InProgress"
  },
  {
    service_id: 3,
    customer_name: "Ankit Das",
    vehicle_number: "DL09EF9012",
    service_type: "Inspection",
    service_date: new Date("2024-12-20"),
    cost: 300,
    status: "Completed"
  },
  {
    service_id: 4,
    customer_name: "Sneha Nair",
    vehicle_number: "TN07GH3456",
    service_type: "Repair",
    service_date: new Date("2026-07-01"),
    cost: 8000,
    status: "InProgress"
  },
  {
    service_id: 5,
    customer_name: "Kavya Menon",
    vehicle_number: "GJ03IJ7890",
    service_type: "Oil Change",
    service_date: new Date("2026-09-15"),
    cost: 500,
    status: "Scheduled"
  }
])

//Question 2: Find all records with status "InProgress" AND service_date is before "2026-08-01".
db.services.find({
  $and: [
    { status: "InProgress" },
    { service_date: { $lt: new Date("2026-08-01") } }
  ]
})

//Question 3: Update the status to "Completed" for all records where service_date is before "2025-01-01".
db.services.updateMany(
  { service_date: { $lt: new Date("2025-01-01") } },
  { $set: { status: "Completed" } }
)

//Question 4: Delete all records with status "Completed" AND cost is less than ₹500.
db.services.deleteMany({
  $and: [
    { status: "Completed" },
    { cost: { $lt: 500 } }
  ]
})

//Question 5: Find all records sorted by cost in descending order, displaying only customer_name,service_type, and cost.
db.services.find(
  {},
  { customer_name: 1, service_type: 1, cost: 1, _id: 0 }
).sort({ cost: -1 })