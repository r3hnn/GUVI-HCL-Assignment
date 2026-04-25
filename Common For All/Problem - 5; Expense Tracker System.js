//Question 1: Create an expenses collection and insert one expense document.
db.expenses.insertOne({
  expense_id: 1,
  category: "Food",
  amount: 650,
  date: new Date("2025-01-05"),
  payment_method: "UPI",
  note: "Lunch at restaurant with friends"
})

//Question 2: Insert at least 5 expense records using insertMany() with different categories.
db.expenses.insertMany([
  {
    expense_id: 2,
    category: "Transport",
    amount: 350,
    date: new Date("2025-01-06"),
    payment_method: "Cash",
    note: "Auto rickshaw to office and back"
  },
  {
    expense_id: 3,
    category: "Entertainment",
    amount: 800,
    date: new Date("2025-01-07"),
    payment_method: "Card",
    note: "Movie ticket and popcorn at PVR"
  },
  {
    expense_id: 4,
    category: "Bills",
    amount: 1200,
    date: new Date("2025-01-08"),
    payment_method: "UPI",
    note: "Monthly electricity bill payment"
  },
  {
    expense_id: 5,
    category: "Food",
    amount: 420,
    date: new Date("2025-01-09"),
    payment_method: "Cash",
    note: "Groceries from local market"
  },
  {
    expense_id: 6,
    category: "Transport",
    amount: 950,
    date: new Date("2025-01-10"),
    payment_method: "Card",
    note: "Cab ride to airport for work trip"
  }
])

//Question 3: Retrieve all expenses with amount greater than ₹500 using find().
db.expenses.find({ amount: { $gt: 500 } })

//Question 4: Display only category, amount, and date using projection.
db.expenses.find(
  { amount: { $gt: 500 } },
  { category: 1, amount: 1, date: 1, _id: 0 }
)

//Question 5: Delete an expense based on expense_id.
db.expenses.deleteOne({ expense_id: 3 })