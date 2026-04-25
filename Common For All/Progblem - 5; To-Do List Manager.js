//Question 1: Create a tasks collection and insert one task document.
db.tasks.insertOne({
  task_id: 1,
  title: "Complete MongoDB Assignment",
  description: "Finish all 5 problem statements for JAIN University",
  due_date: new Date("2025-01-15"),
  priority: "High",
  is_completed: false
})

//Question 2: Insert at least 5 task records using insertMany() with different priorities.
db.tasks.insertMany([
  {
    task_id: 2,
    title: "Buy Groceries",
    description: "Buy vegetables, milk, and bread from the market",
    due_date: new Date("2025-01-10"),
    priority: "Low",
    is_completed: true
  },
  {
    task_id: 3,
    title: "Doctor Appointment",
    description: "Visit Dr. Mehta for routine health checkup",
    due_date: new Date("2025-01-12"),
    priority: "High",
    is_completed: false
  },
  {
    task_id: 4,
    title: "Read SQL Notes",
    description: "Revise PostgreSQL concepts studied last week",
    due_date: new Date("2025-01-14"),
    priority: "Medium",
    is_completed: false
  },
  {
    task_id: 5,
    title: "Pay Electricity Bill",
    description: "Pay the pending electricity bill before due date",
    due_date: new Date("2025-01-11"),
    priority: "Medium",
    is_completed: true
  },
  {
    task_id: 6,
    title: "Submit Project Report",
    description: "Submit final project report to the department",
    due_date: new Date("2025-01-20"),
    priority: "High",
    is_completed: false
  }
])

//Question 3: Retrieve all tasks where is_completed is false using find().
db.tasks.find({ is_completed: false })

//Question 4: Display only title and due_date using projection.
db.tasks.find(
  { is_completed: false },
  { title: 1, due_date: 1, _id: 0 }
)

//Question 5: Delete a task based on task_id.
db.tasks.deleteOne({ task_id: 5 })