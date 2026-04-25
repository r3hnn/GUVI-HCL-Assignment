//Question 1: Create a tasks collection and insert one task document.
db.contacts.insertOne({
  contact_id: 1,
  first_name: "Rahul",
  last_name: "Sharma",
  phone: "9876543210",
  email: "rahul.sharma@gmail.com",
  city: "Mumbai"
})

//Question 2: Insert at least 5 task records using insertMany() with different priorities.
db.contacts.insertMany([
  {
    contact_id: 2,
    first_name: "Priya",
    last_name: "Verma",
    phone: "9812345678",
    email: "priya.verma@gmail.com",
    city: "Mumbai"
  },
  {
    contact_id: 3,
    first_name: "Arjun",
    last_name: "Nair",
    phone: "9923456789",
    email: "arjun.nair@gmail.com",
    city: "Chennai"
  },
  {
    contact_id: 4,
    first_name: "Sneha",
    last_name: "Patil",
    phone: "9834567890",
    email: "sneha.patil@gmail.com",
    city: "Pune"
  },
  {
    contact_id: 5,
    first_name: "Vikram",
    last_name: "Mehta",
    phone: "9745678901",
    email: "vikram.mehta@gmail.com",
    city: "Mumbai"
  },
  {
    contact_id: 6,
    first_name: "Ananya",
    last_name: "Das",
    phone: "9656789012",
    email: "ananya.das@gmail.com",
    city: "Kolkata"
  }
])

//Question 3: Retrieve all tasks where is_completed is false using find().
db.contacts.find({ city: "Mumbai" })

//Question 4: Display only title and due_date using projection.
db.contacts.find(
  { city: "Mumbai" },
  { first_name: 1, last_name: 1, phone: 1, _id: 0 }
)

//Question 5: Delete a task based on task_id.
db.contacts.deleteOne({ contact_id: 3 })