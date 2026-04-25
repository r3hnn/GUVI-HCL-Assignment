/*1. Collection Design (For understanding purpose)

robots Collection          : { robot_id      : Number,
                               name          : String,
                               battery_level : Number,
                               status        : String }

tasks Collection           : { task_id       : Number,
                               type          : String,
                               priority      : String,
                               status        : String }

taskassignments Collection : { assignment_id : Number,
                               robot_id      : Number,
                               task_id       : Number,
                               assigned_at   : Date,
                               completed_at  : Date,
                               status        : String }

activitylogs Collection    : { log_id        : Number,
                               robot_id      : Number,
                               task_id       : Number,
                               action        : String,
                               timestamp     : Date }

errors Collection          : { error_id      : Number,
                               robot_id      : Number,
                               description   : String,
                               timestamp     : Date,
                               maintenance   : String }
*/


// 2. Insert Sample Data (Automatically Creates the Collections)

// robots first → no dependencies
db.robots.insertMany([
  { robot_id: 1, name: "R-Alpha", battery_level: 85, status: "Active"   },
  { robot_id: 2, name: "R-Beta",  battery_level: 40, status: "Active"   },
  { robot_id: 3, name: "R-Gamma", battery_level: 10, status: "Inactive" }
])

// tasks next → no dependencies
db.tasks.insertMany([
  { task_id: 1, type: "Pick",  priority: "High",   status: "Pending" },
  { task_id: 2, type: "Pack",  priority: "Medium", status: "Pending" },
  { task_id: 3, type: "Move",  priority: "Low",    status: "Pending" },
  { task_id: 4, type: "Pick",  priority: "High",   status: "Pending" }
])

// taskassignments → needs robot_id from robots and task_id from tasks
db.taskassignments.insertMany([
  {
    assignment_id : 1,
    robot_id      : 1,
    task_id       : 1,
    assigned_at   : new Date("2025-04-25T08:00:00"),
    completed_at  : new Date("2025-04-25T08:30:00"),
    status        : "Completed"
  },
  {
    assignment_id : 2,
    robot_id      : 1,
    task_id       : 2,
    assigned_at   : new Date("2025-04-25T09:00:00"),
    completed_at  : null,
    status        : "In Progress"
  },
  {
    assignment_id : 3,
    robot_id      : 2,
    task_id       : 3,
    assigned_at   : new Date("2025-04-25T08:00:00"),
    completed_at  : new Date("2025-04-25T09:00:00"),
    status        : "Completed"
  },
  {
    assignment_id : 4,
    robot_id      : 3,
    task_id       : 4,
    assigned_at   : new Date("2025-04-25T08:00:00"),
    completed_at  : null,
    status        : "Assigned"
  }
])

// activitylogs → needs robot_id from robots and task_id from tasks
db.activitylogs.insertMany([
  { log_id: 1, robot_id: 1, task_id: 1, action: "Started Pick Task",  timestamp: new Date("2025-04-25T08:00:00") },
  { log_id: 2, robot_id: 1, task_id: 1, action: "Completed Pick Task", timestamp: new Date("2025-04-25T08:30:00") },
  { log_id: 3, robot_id: 2, task_id: 3, action: "Started Move Task",  timestamp: new Date("2025-04-25T08:00:00") },
  { log_id: 4, robot_id: 2, task_id: 3, action: "Completed Move Task", timestamp: new Date("2025-04-25T09:00:00") },
  { log_id: 5, robot_id: 3, task_id: 4, action: "Failed Pick Task",   timestamp: new Date("2025-04-25T08:15:00") }
])

// errors → needs robot_id from robots
db.errors.insertMany([
  { error_id: 1, robot_id: 3, description: "Battery Critical",  timestamp: new Date(), maintenance: "Required" },
  { error_id: 2, robot_id: 2, description: "Sensor Malfunction", timestamp: new Date(), maintenance: "Scheduled" }
])


// 3. Fetch Tasks Assigned to a Specific Robot with Status
db.taskassignments.find(
  { robot_id: 1 },
  { _id: 0, task_id: 1, status: 1, assigned_at: 1, completed_at: 1 }
)


// 4. Updating

// (a) Update Task Status
db.taskassignments.updateOne(
  { assignment_id: 2 },
  { $set: { status: "Completed", completed_at: new Date() } }
)

// (b) Log a New Error and Flag Maintenance
db.errors.insertOne({
  error_id    : 3,
  robot_id    : 1,
  description : "Arm Joint Failure",
  timestamp   : new Date(),
  maintenance : "Required"
})

db.robots.updateOne(
  { robot_id: 1 },
  { $set: { status: "Maintenance" } }
)


// 5. Aggregation

// (a) Task Completion Rate Per Robot
db.taskassignments.aggregate([
  {
    $group: {
      _id       : "$robot_id",
      total     : { $sum: 1 },
      completed : { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } }
    }
  },
  {
    $project: {
      _id             : 0,
      robot_id        : "$_id",
      total           : 1,
      completed       : 1,
      completion_rate : { $multiply: [{ $divide: ["$completed", "$total"] }, 100] }
    }
  },
  { $sort: { completion_rate: -1 } }
])

// (b) Robots with Frequent Failures
db.errors.aggregate([
  {
    $group: {
      _id          : "$robot_id",
      total_errors : { $sum: 1 }
    }
  },
  { $sort: { total_errors: -1 } },
  {
    $project: {
      _id          : 0,
      robot_id     : "$_id",
      total_errors : 1
    }
  }
])

// (c) Average Task Completion Time (in minutes)
db.taskassignments.aggregate([
  { $match: { status: "Completed", completed_at: { $ne: null } } },
  {
    $group: {
      _id          : "$robot_id",
      avg_duration : {
        $avg: {
          $divide: [
            { $subtract: ["$completed_at", "$assigned_at"] },
            60000
          ]
        }
      }
    }
  },
  { $sort: { avg_duration: 1 } },
  {
    $project: {
      _id          : 0,
      robot_id     : "$_id",
      avg_duration : 1
    }
  }
])