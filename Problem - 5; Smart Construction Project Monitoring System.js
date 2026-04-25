/*1. Collection Design (For understanding purpose)

projects Collection     : { project_id    : Number,
                            name          : String,
                            location      : String,
                            start_date    : Date,
                            end_date      : Date,
                            phase         : String,
                            contractor_id : Number }

contractors Collection  : { contractor_id : Number,
                            name          : String,
                            phone         : String,
                            specialty     : String }

workers Collection      : { worker_id     : Number,
                            name          : String,
                            role          : String,
                            project_id    : Number,
                            daily_wage    : Number }

materials Collection    : { material_id   : Number,
                            name          : String,
                            unit          : String,
                            unit_cost     : Number,
                            project_id    : Number,
                            quantity_used : Number }

progresslogs Collection : { log_id        : Number,
                            project_id    : Number,
                            date          : Date,
                            phase         : String,
                            completion_pct: Number,
                            remarks       : String }

expenses Collection     : { expense_id    : Number,
                            project_id    : Number,
                            category      : String,
                            amount        : Number,
                            date          : Date }
*/


// 2. Insert Sample Data (Automatically Creates the Collections)

// contractors first
db.contractors.insertMany([
  { contractor_id: 1, name: "Ramesh Builders",  phone: "9876543210", specialty: "Civil"     },
  { contractor_id: 2, name: "Suresh Constructions", phone: "8765432109", specialty: "Electrical" }
])

// projects next
db.projects.insertMany([
  {
    project_id    : 1,
    name          : "City Mall Construction",
    location      : "Bangalore",
    start_date    : new Date("2025-01-01"),
    end_date      : new Date("2025-12-31"),
    phase         : "Execution",
    contractor_id : 1
  },
  {
    project_id    : 2,
    name          : "Highway Bridge",
    location      : "Mysore",
    start_date    : new Date("2025-02-01"),
    end_date      : new Date("2025-10-31"),
    phase         : "Planning",
    contractor_id : 2
  }
])

// workers
db.workers.insertMany([
  { worker_id: 1, name: "Sunil",  role: "Mason",        project_id: 1, daily_wage: 800  },
  { worker_id: 2, name: "Ravi",   role: "Electrician",  project_id: 1, daily_wage: 1000 },
  { worker_id: 3, name: "Mahesh", role: "Carpenter",    project_id: 2, daily_wage: 900  },
  { worker_id: 4, name: "Kiran",  role: "Helper",       project_id: 2, daily_wage: 600  }
])

// materials
db.materials.insertMany([
  { material_id: 1, name: "Cement", unit: "Bags",  unit_cost: 350, project_id: 1, quantity_used: 500  },
  { material_id: 2, name: "Steel",  unit: "Tons",  unit_cost: 60000, project_id: 1, quantity_used: 10 },
  { material_id: 3, name: "Sand",   unit: "Cubic", unit_cost: 1500, project_id: 2, quantity_used: 200 },
  { material_id: 4, name: "Bricks", unit: "Units", unit_cost: 8,   project_id: 2, quantity_used: 5000 }
])

// progresslogs
db.progresslogs.insertMany([
  { log_id: 1, project_id: 1, date: new Date("2025-04-20"), phase: "Execution", completion_pct: 45, remarks: "Foundation complete"       },
  { log_id: 2, project_id: 1, date: new Date("2025-04-23"), phase: "Execution", completion_pct: 50, remarks: "Ground floor in progress"  },
  { log_id: 3, project_id: 1, date: new Date("2025-04-25"), phase: "Execution", completion_pct: 55, remarks: "Columns erected"           },
  { log_id: 4, project_id: 2, date: new Date("2025-04-20"), phase: "Planning",  completion_pct: 20, remarks: "Site survey done"          },
  { log_id: 5, project_id: 2, date: new Date("2025-04-25"), phase: "Planning",  completion_pct: 30, remarks: "Design approval pending"   }
])

// expenses
db.expenses.insertMany([
  { expense_id: 1, project_id: 1, category: "Materials", amount: 775000, date: new Date("2025-04-01") },
  { expense_id: 2, project_id: 1, category: "Labour",    amount: 320000, date: new Date("2025-04-10") },
  { expense_id: 3, project_id: 1, category: "Equipment", amount: 150000, date: new Date("2025-04-15") },
  { expense_id: 4, project_id: 2, category: "Materials", amount: 340000, date: new Date("2025-04-05") },
  { expense_id: 5, project_id: 2, category: "Labour",    amount: 180000, date: new Date("2025-04-12") }
])


// 3. Fetch Current Progress Status of a Project
db.progresslogs.find(
  { project_id: 1 },
  { _id: 0, date: 1, phase: 1, completion_pct: 1, remarks: 1 }
).sort({ date: -1 })


// 4. Updating

// (a) Update Progress Log with New Daily Entry
db.progresslogs.insertOne({
  log_id         : 6,
  project_id     : 1,
  date           : new Date(),
  phase          : "Execution",
  completion_pct : 60,
  remarks        : "Second floor slab poured"
})

// (b) Update Material Consumption
db.materials.updateOne(
  { material_id: 1 },
  { $set: { quantity_used: 650 } }
)

// (c) Update Project Phase
db.projects.updateOne(
  { project_id: 2 },
  { $set: { phase: "Execution" } }
)


// 5. Aggregation

// (a) Total Project Cost (sum of all expenses per project)
db.expenses.aggregate([
  {
    $group: {
      _id         : "$project_id",
      total_cost  : { $sum: "$amount" }
    }
  },
  { $sort: { total_cost: -1 } },
  {
    $project: {
      _id        : 0,
      project_id : "$_id",
      total_cost : 1
    }
  }
])

// (b) Identify Projects Behind Schedule
//     (completion_pct below 50 and phase still Planning or Execution)
db.progresslogs.aggregate([
  { $sort: { project_id: 1, date: -1 } },
  {
    $group: {
      _id            : "$project_id",
      latest_pct     : { $first: "$completion_pct" },
      latest_phase   : { $first: "$phase" }
    }
  },
  {
    $match: {
      latest_pct   : { $lt: 50 },
      latest_phase : { $in: ["Planning", "Execution"] }
    }
  },
  {
    $project: {
      _id          : 0,
      project_id   : "$_id",
      latest_pct   : 1,
      latest_phase : 1
    }
  }
])

// (c) Resource Utilization (total material cost per project)
db.materials.aggregate([
  {
    $group: {
      _id            : "$project_id",
      total_material_cost : {
        $sum: { $multiply: ["$unit_cost", "$quantity_used"] }
      },
      total_qty_used : { $sum: "$quantity_used" }
    }
  },
  { $sort: { total_material_cost: -1 } },
  {
    $project: {
      _id                 : 0,
      project_id          : "$_id",
      total_material_cost : 1,
      total_qty_used      : 1
    }
  }
])