//Question 1: Insert 5 attendance records using insertMany() with different statuses.
db.attendance.insertMany([
  {
    record_id: 1,
    emp_name: "Rohit Sharma",
    department: "IT",
    date: new Date("2023-12-01"),
    status: "Absent",
    check_in_time: null
  },
  {
    record_id: 2,
    emp_name: "Priya Verma",
    department: "HR",
    date: new Date("2023-12-02"),
    status: "Leave",
    check_in_time: null
  },
  {
    record_id: 3,
    emp_name: "Ankit Das",
    department: "IT",
    date: new Date("2024-01-05"),
    status: "Present",
    check_in_time: "09:15 AM"
  },
  {
    record_id: 4,
    emp_name: "Sneha Nair",
    department: "Finance",
    date: new Date("2023-11-20"),
    status: "Leave",
    check_in_time: null
  },
  {
    record_id: 5,
    emp_name: "Kavya Menon",
    department: "IT",
    date: new Date("2024-02-10"),
    status: "Absent",
    check_in_time: null
  }
])

//Question 2: Find all records where status is "Absent" AND department is "IT".
db.attendance.find({
  $and: [
    { status: "Absent" },
    { department: "IT" }
  ]
})

//Question 3: Update the status to "Present" for all records where check_in_time is not null.
db.attendance.updateMany(
  { check_in_time: { $ne: null } },
  { $set: { status: "Present" } }
)

//Question 4: Delete all records where date is before "2024-01-01" AND status is "Leave".
db.attendance.deleteMany({
  $and: [
    { date: { $lt: new Date("2024-01-01") } },
    { status: "Leave" }
  ]
})

//Question 5: Find all records with status "Present" sorted by date in ascending order.
db.attendance.find(
  { status: "Present" },
  { emp_name: 1, department: 1, date: 1, status: 1, _id: 0 }
).sort({ date: 1 })