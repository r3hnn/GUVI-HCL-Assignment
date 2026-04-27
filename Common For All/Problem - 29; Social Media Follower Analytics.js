//Question 1: Insert 5 follower documents using insertMany() with different interests arrays.
db.followers.insertMany([
  {
    follower_id: 1,
    follower_name: "Rahul",
    followed_since: new Date("2023-05-10"),
    engagement_score: 90,
    is_active: true,
    location: "Bangalore",
    interests: ["Fitness", "Travel"],
    last_interaction_date: new Date("2025-06-01")
  },
  {
    follower_id: 2,
    follower_name: "Amit",
    followed_since: new Date("2021-03-15"),
    engagement_score: 15,
    is_active: true,
    location: "Delhi",
    interests: ["Gaming", "Tech"],
    last_interaction_date: new Date("2024-12-01")
  },
  {
    follower_id: 3,
    follower_name: "Sneha",
    followed_since: new Date("2024-01-20"),
    engagement_score: 85,
    is_active: true,
    location: "Mumbai",
    interests: ["Fashion", "Travel"],
    last_interaction_date: new Date("2025-03-10")
  },
  {
    follower_id: 4,
    follower_name: "Karan",
    followed_since: new Date("2020-07-11"),
    engagement_score: 10,
    is_active: true,
    location: "Chennai",
    interests: ["Food", "Travel"],
    last_interaction_date: new Date("2023-12-01")
  },
  {
    follower_id: 5,
    follower_name: "Priya",
    followed_since: new Date("2022-09-09"),
    engagement_score: 95,
    is_active: true,
    location: "Hyderabad",
    interests: ["Fitness", "Tech"],
    last_interaction_date: new Date("2025-02-01")
  }
])

//Question 2: Find all followers where engagement_score is greater than 80 AND is_active is true.
db.followers.find({
  $and: [
    { engagement_score: { $gt: 80 } },
    { is_active: true }
  ]
})

//Question 3: Update the is_active to false for all followers where last_interaction_date is before "2025-01-01".
db.followers.updateMany(
  {
    last_interaction_date: { $lt: new Date("2025-01-01") }
  },
  {
    $set: { is_active: false }
  }
)

//Question 4: Delete all followers where followed_since is before "2022-01-01" AND engagement_score is less than 20.
db.followers.deleteMany({
  $and: [
    { followed_since: { $lt: new Date("2022-01-01") } },
    { engagement_score: { $lt: 20 } }
  ]
})

//Question 5: Use aggregation with $unwind to find the most common interest among followers.
db.followers.aggregate([
  { $unwind: "$interests" },
  {
    $group: {
      _id: "$interests",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
])