//Question 1: Insert 5 equipment documents using insertMany() with different conditions.
db.equipment.insertMany([
  {
    equip_id: 1,
    equip_name: "Treadmill",
    category: "Cardio",
    purchase_date: new Date("2013-06-15"),
    last_maintenance_date: new Date("2024-11-10"),
    next_maintenance_date: new Date("2025-05-10"),
    condition: "OutOfOrder"
  },
  {
    equip_id: 2,
    equip_name: "Dumbbells Set",
    category: "Strength",
    purchase_date: new Date("2018-03-20"),
    last_maintenance_date: new Date("2025-02-15"),
    next_maintenance_date: new Date("2025-08-15"),
    condition: "Good"
  },
  {
    equip_id: 3,
    equip_name: "Stationary Bike",
    category: "Cardio",
    purchase_date: new Date("2014-09-05"),
    last_maintenance_date: new Date("2024-08-20"),
    next_maintenance_date: new Date("2025-02-20"),
    condition: "NeedsService"
  },
  {
    equip_id: 4,
    equip_name: "Leg Press Machine",
    category: "Strength",
    purchase_date: new Date("2020-01-10"),
    last_maintenance_date: new Date("2025-03-01"),
    next_maintenance_date: new Date("2025-09-01"),
    condition: "Good"
  },
  {
    equip_id: 5,
    equip_name: "Rowing Machine",
    category: "Cardio",
    purchase_date: new Date("2012-07-25"),
    last_maintenance_date: new Date("2024-06-30"),
    next_maintenance_date: new Date("2024-12-30"),
    condition: "OutOfOrder"
  }
])

//Question 2: Find all equipment where condition is "NeedsService" OR "OutOfOrder".
db.equipment.find({
  $or: [
    { condition: "NeedsService" },
    { condition: "OutOfOrder" }
  ]
})

//Question 3: Update the condition to "Good" for all equipment where last_maintenance_date is after "2025-01-01".
db.equipment.updateMany(
  { last_maintenance_date: { $gt: new Date("2025-01-01") } },
  { $set: { condition: "Good" } }
)

//Question 4: Delete all equipment where purchase_date is before "2015-01-01" AND condition is "OutOfOrder".
db.equipment.deleteMany({
  $and: [
    { purchase_date: { $lt: new Date("2015-01-01") } },
    { condition: "OutOfOrder" }
  ]
})

//Question 5: Find all equipment sorted by next_maintenance_date in ascending order.
db.equipment.find(
  {},
  { equip_name: 1, category: 1, next_maintenance_date: 1, condition: 1, _id: 0 }
).sort({ next_maintenance_date: 1 })