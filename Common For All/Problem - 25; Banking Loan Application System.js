//Question 1: Insert 5 loan documents using insertMany() with different loan types.
db.loans.insertMany([
  {
    loan_id: 1,
    applicant_name: "Rohit Sharma",
    loan_type: "Home",
    loan_amount: 5000000,
    interest_rate: 8.5,
    tenure_months: 240,
    application_date: new Date("2022-06-15"),
    approval_status: "Rejected",
    credit_score: 620
  },
  {
    loan_id: 2,
    applicant_name: "Priya Verma",
    loan_type: "Car",
    loan_amount: 800000,
    interest_rate: 9.2,
    tenure_months: 60,
    application_date: new Date("2024-03-10"),
    approval_status: "Approved",
    credit_score: 780
  },
  {
    loan_id: 3,
    applicant_name: "Ankit Das",
    loan_type: "Personal",
    loan_amount: 300000,
    interest_rate: 12.5,
    tenure_months: 36,
    application_date: new Date("2024-07-22"),
    approval_status: "Pending",
    credit_score: 720
  },
  {
    loan_id: 4,
    applicant_name: "Sneha Nair",
    loan_type: "Home",
    loan_amount: 7500000,
    interest_rate: 8.0,
    tenure_months: 300,
    application_date: new Date("2024-09-05"),
    approval_status: "Approved",
    credit_score: 810
  },
  {
    loan_id: 5,
    applicant_name: "Kavya Menon",
    loan_type: "Personal",
    loan_amount: 150000,
    interest_rate: 13.0,
    tenure_months: 24,
    application_date: new Date("2024-11-18"),
    approval_status: "Pending",
    credit_score: 740
  }
])

//Question 2: Find all loans where approval_status is "Pending" AND credit_score is greater than 700.
db.loans.find({
  $and: [
    { approval_status: "Pending" },
    { credit_score: { $gt: 700 } }
  ]
})

//Question 3: Update the approval_status to "Approved" for all loans where credit_score is greater than 750.
db.loans.updateMany(
  { credit_score: { $gt: 750 } },
  { $set: { approval_status: "Approved" } }
)

//Question 4: Delete all loans where application_date is before "2023-01-01" AND approval_status is "Rejected".
db.loans.deleteMany({
  $and: [
    { application_date: { $lt: new Date("2023-01-01") } },
    { approval_status: "Rejected" }
  ]
})

//Question 5: Use aggregation to calculate the average loan_amount per loan_type for approved loans only.
db.loans.aggregate([
  {
    $match: { approval_status: "Approved" }
  },
  {
    $group: {
      _id: "$loan_type",
      average_loan_amount: { $avg: "$loan_amount" }
    }
  },
  {
    $project: {
      _id: 0,
      loan_type: "$_id",
      average_loan_amount: 1
    }
  }
])