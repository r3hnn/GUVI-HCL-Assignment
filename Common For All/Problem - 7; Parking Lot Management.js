//Question 1: Create a parking collection and insert one parking slot document.
db.parking.insertOne({
  slot_id: 1,
  floor: 1,
  vehicle_type: "Car",
  is_occupied: true,
  vehicle_number: "MH12AB1234"
})

//Question 2: Insert at least 5 parking slot records using insertMany().
db.parking.insertMany([
  {
    slot_id: 2,
    floor: 1,
    vehicle_type: "Bike",
    is_occupied: false,
    vehicle_number: null
  },
  {
    slot_id: 3,
    floor: 2,
    vehicle_type: "Car",
    is_occupied: true,
    vehicle_number: "KA05CD5678"
  },
  {
    slot_id: 4,
    floor: 2,
    vehicle_type: "Bike",
    is_occupied: false,
    vehicle_number: null
  },
  {
    slot_id: 5,
    floor: 3,
    vehicle_type: "Car",
    is_occupied: false,
    vehicle_number: null
  },
  {
    slot_id: 6,
    floor: 3,
    vehicle_type: "Bike",
    is_occupied: true,
    vehicle_number: "DL09EF9012"
  }
])

//Question 3: Retrieve all slots where is_occupied is false using find().
db.parking.find({ is_occupied: false })

//Question 4: Display only slot_id, floor, and vehicle_type using projection.
db.parking.find(
  { is_occupied: false },
  { slot_id: 1, floor: 1, vehicle_type: 1, _id: 0 }
)

//Question 5: Delete a parking slot based on slot_id.
db.parking.deleteOne({ slot_id: 4 })