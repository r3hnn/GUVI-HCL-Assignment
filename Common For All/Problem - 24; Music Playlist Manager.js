//Question 1: Insert 5 playlist documents using insertMany() with different songs arrays.
db.playlists.insertMany([
  {
    playlist_id: 1,
    user_name: "Rohit Sharma",
    playlist_name: "Morning Motivation",
    songs: [
      { title: "Eye of the Tiger",  artist: "Survivor"       },
      { title: "Lose Yourself",     artist: "Eminem"         },
      { title: "Stronger",          artist: "Kanye West"     }
    ],
    created_date: new Date("2022-08-15"),
    total_duration_minutes: 12,
    is_public: false,
    play_count: 45
  },
  {
    playlist_id: 2,
    user_name: "Priya Verma",
    playlist_name: "Chill Evening Vibes",
    songs: [
      { title: "Blinding Lights",   artist: "The Weeknd"     },
      { title: "Stay",              artist: "Justin Bieber"  },
      { title: "Levitating",        artist: "Dua Lipa"       },
      { title: "Peaches",           artist: "Justin Bieber"  }
    ],
    created_date: new Date("2023-04-10"),
    total_duration_minutes: 16,
    is_public: true,
    play_count: 320
  },
  {
    playlist_id: 3,
    user_name: "Ankit Das",
    playlist_name: "Workout Beast Mode",
    songs: [
      { title: "Numb",              artist: "Linkin Park"    },
      { title: "In The End",        artist: "Linkin Park"    },
      { title: "Till I Collapse",   artist: "Eminem"         }
    ],
    created_date: new Date("2022-11-20"),
    total_duration_minutes: 11,
    is_public: false,
    play_count: 78
  },
  {
    playlist_id: 4,
    user_name: "Sneha Nair",
    playlist_name: "Sunday Brunch Mix",
    songs: [
      { title: "Shape of You",      artist: "Ed Sheeran"     },
      { title: "Perfect",           artist: "Ed Sheeran"     },
      { title: "Thinking Out Loud", artist: "Ed Sheeran"     },
      { title: "Photograph",        artist: "Ed Sheeran"     }
    ],
    created_date: new Date("2024-02-14"),
    total_duration_minutes: 18,
    is_public: true,
    play_count: 215
  },
  {
    playlist_id: 5,
    user_name: "Priya Verma",
    playlist_name: "Late Night Focus",
    songs: [
      { title: "Bohemian Rhapsody", artist: "Queen"          },
      { title: "Hotel California",  artist: "Eagles"         },
      { title: "Stairway to Heaven",artist: "Led Zeppelin"   }
    ],
    created_date: new Date("2024-05-01"),
    total_duration_minutes: 20,
    is_public: true,
    play_count: 180
  }
])

//Question 2: Find all playlists where is_public is true AND play_count is greater than 100.
db.playlists.find({
  $and: [
    { is_public: true },
    { play_count: { $gt: 100 } }
  ]
})

//Question 3: Update the play_count by incrementing it by 1 for a specific playlist_id.
//Step 1 — First check current play_count for playlist_id 2:
db.playlists.find(
  { playlist_id: 2 },
  { playlist_name: 1, play_count: 1, _id: 0 }
)
//Step 2 — Apply the incremented play_count:
db.playlists.updateMany(
  { playlist_id: 2 },
  { $set: { play_count: 321 } }
)
//Question 4: Delete all playlists where created_date is before "2023-01-01" AND is_public is false.
db.playlists.deleteMany({
  $and: [
    { created_date: { $lt: new Date("2023-01-01") } },
    { is_public: false }
  ]
})

//Question 5: Use aggregation to find the average total_duration_minutes per user.
db.playlists.aggregate([
  {
    $group: {
      _id: "$user_name",
      average_duration: { $avg: "$total_duration_minutes" }
    }
  },
  {
    $project: {
      _id: 0,
      user_name: "$_id",
      average_duration: 1
    }
  }
])