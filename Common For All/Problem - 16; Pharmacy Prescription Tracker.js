//Question 1: Insert 5 prescription documents using insertMany() with different statuses.
db.readings.insertMany([
  {
    record_id: 1,
    member_name: "Rohit Sharma",
    book_title: "The Alchemist",
    genre: "Fiction",
    pages_read: 208,
    total_pages: 208,
    start_date: new Date("2024-01-05"),
    completion_date: new Date("2024-01-20"),
    is_completed: true
  },
  {
    record_id: 2,
    member_name: "Priya Verma",
    book_title: "Sapiens",
    genre: "Non-Fiction",
    pages_read: 150,
    total_pages: 443,
    start_date: new Date("2022-11-10"),
    completion_date: null,
    is_completed: false
  },
  {
    record_id: 3,
    member_name: "Ankit Das",
    book_title: "Harry Potter and the Sorcerer Stone",
    genre: "Fiction",
    pages_read: 309,
    total_pages: 309,
    start_date: new Date("2024-03-01"),
    completion_date: new Date("2024-03-25"),
    is_completed: true
  },
  {
    record_id: 4,
    member_name: "Sneha Nair",
    book_title: "Atomic Habits",
    genre: "Self-Help",
    pages_read: 80,
    total_pages: 320,
    start_date: new Date("2022-08-15"),
    completion_date: null,
    is_completed: false
  },
  {
    record_id: 5,
    member_name: "Kavya Menon",
    book_title: "The Great Gatsby",
    genre: "Fiction",
    pages_read: 120,
    total_pages: 180,
    start_date: new Date("2024-05-10"),
    completion_date: null,
    is_completed: false
  }
])

//Question 2: Find all prescriptions with status "Active" AND expiry_date is after today's date.
db.prescriptions.find({
  $and: [
    { status: "Active" },
    { expiry_date: { $gt: new Date() } }
  ]
})

//Question 3: Update the status to "Expired" for all prescriptions where expiry_date is before today's date.
db.prescriptions.updateMany(
  { expiry_date: { $lt: new Date() } },
  { $set: { status: "Expired" } }
)

//Question 4: Delete all prescriptions with status "Fulfilled" AND issue_date before "2024-01-01".
db.prescriptions.deleteMany({
  $and: [
    { status: "Fulfilled" },
    { issue_date: { $lt: new Date("2024-01-01") } }
  ]
})

//Question 5: Find all prescriptions sorted by issue_date in descending order, displaying only patient_name, medicine_name, and status.
db.prescriptions.find(
  {},
  { patient_name: 1, medicine_name: 1, status: 1, _id: 0 }
).sort({ issue_date: -1 })