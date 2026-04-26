//Question 1: Insert 5 review documents using insertMany() with different ratings.
db.reviews.insertMany([
  {
    review_id: 1,
    course_name: "MongoDB for Beginners",
    student_name: "Rohit Sharma",
    rating: 5,
    review_text: "Excellent course with great hands-on examples",
    review_date: new Date("2023-10-15"),
    likes_count: 25,
    is_verified_purchase: false
  },
  {
    review_id: 2,
    course_name: "Python Data Science",
    student_name: "Priya Verma",
    rating: 1,
    review_text: "Very disappointing content and poor explanation",
    review_date: new Date("2023-08-20"),
    likes_count: 3,
    is_verified_purchase: true
  },
  {
    review_id: 3,
    course_name: "Advanced MongoDB Aggregation",
    student_name: "Ankit Das",
    rating: 5,
    review_text: "Best MongoDB course available on the platform",
    review_date: new Date("2024-03-10"),
    likes_count: 18,
    is_verified_purchase: false
  },
  {
    review_id: 4,
    course_name: "React JS Complete Guide",
    student_name: "Sneha Nair",
    rating: 3,
    review_text: "Average content but good project examples",
    review_date: new Date("2024-05-22"),
    likes_count: 7,
    is_verified_purchase: true
  },
  {
    review_id: 5,
    course_name: "SQL Fundamentals",
    student_name: "Kavya Menon",
    rating: 4,
    review_text: "Good course for beginners in database management",
    review_date: new Date("2024-07-18"),
    likes_count: 12,
    is_verified_purchase: false
  }
])

//Question 2: Find all reviews with rating greater than 4 AND likes_count greater than 10.
db.reviews.find({
  $and: [
    { rating: { $gt: 4 } },
    { likes_count: { $gt: 10 } }
  ]
})

//Question 3: Update the is_verified_purchase to true for all reviews where course_name contains "MongoDB".
db.reviews.updateMany(
  { course_name: { $regex: "MongoDB" } },
  { $set: { is_verified_purchase: true } }
)

//Question 4: Delete all reviews where review_date is before "2024-01-01" AND rating is 1.
db.reviews.updateMany(
  { course_name: { $regex: "MongoDB" } },
  { $set: { is_verified_purchase: true } }
)

//Question 5: Find all reviews sorted by rating in descending order, displaying only course_name, student_name, and rating.
db.reviews.find(
  {},
  { course_name: 1, student_name: 1, rating: 1, _id: 0 }
).sort({ rating: -1 })