/*
1. Collection Design

clients Collection     : { client_id    : Number,
                           name         : String,
                           email        : String,
                           company      : String,
                           phone        : String }

freelancers Collection : { freelancer_id : Number,
                           name          : String,
                           email         : String,
                           skills        : Array,
                           rating        : Number }

projects Collection    : { project_id   : Number,
                           client_id    : Number,
                           title        : String,
                           category     : String,
                           budget       : Number,
                           status       : String }

bids Collection        : { bid_id        : Number,
                           project_id    : Number,
                           freelancer_id : Number,
                           amount        : Number,
                           delivery_days : Number,
                           status        : String }

contracts Collection   : { contract_id   : Number,
                           project_id    : Number,
                           client_id     : Number,
                           freelancer_id : Number,
                           bid_id        : Number,
                           total_amount  : Number,
                           status        : String }

payments Collection    : { payment_id    : Number,
                           contract_id   : Number,
                           freelancer_id : Number,
                           milestone_no  : Number,
                           amount        : Number,
                           status        : String,
                           released_at   : Date }
*/


// 2. Insert Sample Data (Automatically Creates the Collections)

db.clients.insertMany([
  { client_id: 1, name: "Priya Sharma", email: "priya@techco.in",   company: "TechCo" },
  { client_id: 2, name: "Rahul Mehta",  email: "rahul@startupx.in", company: "StartupX" }
])

db.freelancers.insertMany([
  { freelancer_id: 1, name: "Ankit Verma", skills: ["React","Node.js"], rating: 4.8, total_earnings: 0 },
  { freelancer_id: 2, name: "Sneha Patil", skills: ["UI/UX","Figma"],   rating: 4.5, total_earnings: 0 },
  { freelancer_id: 3, name: "Kiran Rao",   skills: ["Python","ML"],     rating: 4.9, total_earnings: 0 }
])

db.projects.insertMany([
  {
    project_id  : 1,
    client_id   : 1,
    title       : "E-Commerce Website",
    description : "Build a full-stack e-commerce platform",
    category    : "Development",
    budget      : 80000,
    status      : "Open",
    created_at  : new Date()
  },
  {
    project_id  : 2,
    client_id   : 2,
    title       : "Mobile App UI Design",
    description : "Design UI for a food delivery app",
    category    : "Design",
    budget      : 35000,
    status      : "Open",
    created_at  : new Date()
  }
])

db.bids.insertMany([
  { bid_id: 1, project_id: 1, freelancer_id: 1, amount: 72000, delivery_days: 45, message: "Expert in MERN stack",     status: "Pending" },
  { bid_id: 2, project_id: 1, freelancer_id: 3, amount: 68000, delivery_days: 50, message: "Strong backend experience", status: "Pending" },
  { bid_id: 3, project_id: 1, freelancer_id: 2, amount: 75000, delivery_days: 40, message: "Full-stack + UI/UX skills", status: "Pending" },
  { bid_id: 4, project_id: 2, freelancer_id: 2, amount: 30000, delivery_days: 21, message: "Specialist in mobile UI",   status: "Pending" }
])


// ── PART 2: READ QUERY - Fetch All Bids for a Project Sorted by Amount

db.bids.find(
  { project_id: 1 },
  { _id: 0, freelancer_id: 1, amount: 1, delivery_days: 1, message: 1 }
).sort({ amount: 1 })


// ── PART 3: UPDATE OPERATIONS ─────────────────────────────────────────

db.projects.updateOne(
  { project_id: 1 },
  { $set: { status: "In Progress", updated_at: new Date() } }
)

db.bids.updateOne(
  { bid_id: 2 },
  { $set: { status: "Accepted" } }
)

db.bids.updateMany(
  { project_id: 1, bid_id: { $ne: 2 } },
  { $set: { status: "Rejected" } }
)

db.contracts.insertOne({
  contract_id   : 1,
  project_id    : 1,
  client_id     : 1,
  freelancer_id : 3,
  bid_id        : 2,
  total_amount  : 68000,
  milestones    : [
    { milestone_no: 1, title: "UI Wireframes",  amount: 20000, status: "Pending" },
    { milestone_no: 2, title: "Backend APIs",   amount: 28000, status: "Pending" },
    { milestone_no: 3, title: "Final Delivery", amount: 20000, status: "Pending" }
  ],
  status     : "Active",
  created_at : new Date()
})

db.contracts.updateOne(
  { contract_id: 1, "milestones.milestone_no": 1 },
  { $set: { "milestones.$.status": "Completed" } }
)

db.payments.insertOne({
  payment_id    : 1,
  contract_id   : 1,
  freelancer_id : 3,
  milestone_no  : 1,
  amount        : 20000,
  status        : "Released",
  released_at   : new Date()
})

db.projects.updateOne(
  { project_id: 1 },
  { $set: { status: "Completed" } }
)


// ── PART 4A: Aggregation - Top Rated Freelancers ──────────────────────

db.freelancers.aggregate([
  { $match:   { rating: { $gte: 4.5 } } },
  { $sort:    { rating: -1 } },
  { $limit:   5 },
  { $project: { _id: 0, freelancer_id: 1, name: 1, rating: 1, skills: 1 } }
])


// ── PART 4B: Aggregation - Average Bid Amount Per Project ─────────────

db.bids.aggregate([
  {
    $group: {
      _id        : "$project_id",
      avg_bid    : { $avg: "$amount" },
      total_bids : { $sum: 1 },
      min_bid    : { $min: "$amount" },
      max_bid    : { $max: "$amount" }
    }
  },
  { $sort: { avg_bid: -1 } },
  {
    $project: {
      _id        : 0,
      project_id : "$_id",
      avg_bid    : 1,
      total_bids : 1,
      min_bid    : 1,
      max_bid    : 1
    }
  }
])


// ── PART 4C: Aggregation - Project Success Rate ───────────────────────

db.projects.aggregate([
  {
    $group: {
      _id         : "$category",
      total       : { $sum: 1 },
      completed   : { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
      in_progress : { $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] } },
      open        : { $sum: { $cond: [{ $eq: ["$status", "Open"] }, 1, 0] } }
    }
  },
  {
    $project: {
      _id          : 0,
      category     : "$_id",
      total        : 1,
      completed    : 1,
      success_rate : { $multiply: [{ $divide: ["$completed", "$total"] }, 100] }
    }
  },
  { $sort: { success_rate: -1 } }
])


// ── PART 4D: Aggregation - Total Revenue Per Freelancer ───────────────

db.payments.aggregate([
  { $match: { status: "Released" } },
  {
    $group: {
      _id               : "$freelancer_id",
      total_earned      : { $sum: "$amount" },
      payments_received : { $sum: 1 }
    }
  },
  { $sort: { total_earned: -1 } },
  { $limit: 10 },
  {
    $project: {
      _id               : 0,
      freelancer_id     : "$_id",
      total_earned      : 1,
      payments_received : 1
    }
  }
])