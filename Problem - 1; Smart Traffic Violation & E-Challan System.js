/*1. Collection Design (For understanding purpose)

owners Collection     : { owner_id    : Number,
                          name        : String,
                          phone       : String }

vehicles Collection   : { vehicle_no  : String,
                          owner_id    : Number,
                          type        : String }

locations Collection  : { loc_id      : Number,
                          area        : String }

violations Collection : { violation_id : Number,
                          vehicle_no   : String,
                          type         : String,
                          timestamp    : Date,
                          loc_id       : Number }

challans Collection   : { challan_id   : Number,
                          violation_id : Number,
                          vehicle_no   : String,
                          amount       : Number,
                          status       : String }

payments Collection   : { payment_id  : Number,
                          challan_id  : Number,
                          amount      : Number,
                          date        : Date }
*/

//2. Insert Sample Data (Automatically Creates the Collections)
db.owners.insertMany([
  { owner_id: 1, name: "Rahul", phone: "9999999999" },
  { owner_id: 2, name: "Amit", phone: "8888888888" }
])

db.vehicles.insertMany([
  { vehicle_no: "KA01AB1234", owner_id: 1, type: "Car" },
  { vehicle_no: "KA02XY5678", owner_id: 2, type: "Bike" }
])

db.locations.insertMany([
  { loc_id: 1, area: "MG Road" },
  { loc_id: 2, area: "Indiranagar" }
])

db.violations.insertMany([
  { violation_id: 1, vehicle_no: "KA01AB1234", type: "Over-speeding", timestamp: new Date(), loc_id: 1 },
  { violation_id: 2, vehicle_no: "KA02XY5678", type: "Signal Jump", timestamp: new Date(), loc_id: 2 },
  { violation_id: 3, vehicle_no: "KA01AB1234", type: "Illegal Parking", timestamp: new Date(), loc_id: 1 }
])

db.challans.insertMany([
  { challan_id: 101, violation_id: 1, vehicle_no: "KA01AB1234", amount: 1000, status: "Pending" },
  { challan_id: 102, violation_id: 2, vehicle_no: "KA02XY5678", amount: 500, status: "Pending" }
])

db.payments.insertOne({ payment_id: 1, challan_id: 101, amount: 1000, date: new Date()
})

//3. Fetching Pending Challans
db.challans.find(
  { vehicle_no: "KA01AB1234", status: "Pending" },
  { _id: 0 }
)

//4. Updating
//(a) Marking a Challan as Paid
db.challans.updateOne(
  { challan_id: 101 },
  { $set: { status: "Paid" } }
)
//(b) Adding a New Violation
db.violations.insertOne({ violation_id: 4, vehicle_no: "KA02XY5678", type: "Over-speeding", timestamp: new Date(), loc_id: 2 })

//5. Aggregation
//(a) Most Common Violation Types
db.violations.aggregate([
  { $group: { _id: "$type", count: { $sum: 1 } } }
])
//(b) High Violation Areas
db.violations.aggregate([
  { $group: { _id: "$loc_id", total: { $sum: 1 } } }
])
//(c) Total Fines Collected Per Month
db.challans.aggregate([
  { $match: { status: "Paid" } },
  { $group: { _id: "$status", total: { $sum: "$amount" } } }
])