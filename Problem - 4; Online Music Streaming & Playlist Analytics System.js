/*1. Collection Design (For understanding purpose)

users Collection           : { user_id    : Number,
                               name       : String,
                               email      : String,
                               plan       : String }

artists Collection         : { artist_id  : Number,
                               name       : String,
                               genre      : String,
                               followers  : Number }

songs Collection           : { song_id    : Number,
                               title      : String,
                               artist_id  : Number,
                               duration   : Number,
                               genre      : String }

playlists Collection       : { playlist_id : Number,
                               user_id     : Number,
                               name        : String,
                               song_ids    : Array }

listeninghistory Collection: { history_id  : Number,
                               user_id     : Number,
                               song_id     : Number,
                               played_at   : Date,
                               skipped     : Boolean }

likes Collection           : { like_id     : Number,
                               user_id     : Number,
                               song_id     : Number,
                               liked_at    : Date }
*/


// 2. Insert Sample Data (Automatically Creates the Collections)

// users first → no dependencies
db.users.insertMany([
  { user_id: 1, name: "Aryan",  email: "aryan@mail.com",  plan: "Premium" },
  { user_id: 2, name: "Diya",   email: "diya@mail.com",   plan: "Free"    },
  { user_id: 3, name: "Rohan",  email: "rohan@mail.com",  plan: "Premium" }
])

// artists next → no dependencies
db.artists.insertMany([
  { artist_id: 1, name: "Arijit Singh",  genre: "Bollywood", followers: 50000 },
  { artist_id: 2, name: "AR Rahman",     genre: "Classical", followers: 80000 },
  { artist_id: 3, name: "Shreya Ghoshal",genre: "Bollywood", followers: 60000 }
])

// songs → needs artist_id from artists
db.songs.insertMany([
  { song_id: 1, title: "Tum Hi Ho",       artist_id: 1, duration: 270, genre: "Bollywood" },
  { song_id: 2, title: "Jai Ho",          artist_id: 2, duration: 300, genre: "Classical" },
  { song_id: 3, title: "Lag Ja Gale",     artist_id: 3, duration: 250, genre: "Bollywood" },
  { song_id: 4, title: "Channa Mereya",   artist_id: 1, duration: 285, genre: "Bollywood" },
  { song_id: 5, title: "Roja",            artist_id: 2, duration: 260, genre: "Classical" }
])

// playlists → needs user_id from users and song_ids from songs
db.playlists.insertMany([
  { playlist_id: 1, user_id: 1, name: "Morning Vibes",  song_ids: [1, 3, 4] },
  { playlist_id: 2, user_id: 2, name: "Focus Mode",     song_ids: [2, 5]    },
  { playlist_id: 3, user_id: 3, name: "Chill Evening",  song_ids: [1, 2, 5] }
])

// listeninghistory → needs user_id from users and song_id from songs
db.listeninghistory.insertMany([
  { history_id: 1, user_id: 1, song_id: 1, played_at: new Date("2025-04-24T08:00:00"), skipped: false },
  { history_id: 2, user_id: 1, song_id: 3, played_at: new Date("2025-04-24T08:10:00"), skipped: false },
  { history_id: 3, user_id: 1, song_id: 4, played_at: new Date("2025-04-25T09:00:00"), skipped: true  },
  { history_id: 4, user_id: 2, song_id: 2, played_at: new Date("2025-04-23T07:00:00"), skipped: false },
  { history_id: 5, user_id: 2, song_id: 5, played_at: new Date("2025-04-25T10:00:00"), skipped: false },
  { history_id: 6, user_id: 3, song_id: 1, played_at: new Date("2025-04-25T11:00:00"), skipped: false },
  { history_id: 7, user_id: 3, song_id: 2, played_at: new Date("2025-04-25T11:30:00"), skipped: false }
])

// likes → needs user_id from users and song_id from songs
db.likes.insertMany([
  { like_id: 1, user_id: 1, song_id: 1, liked_at: new Date() },
  { like_id: 2, user_id: 1, song_id: 3, liked_at: new Date() },
  { like_id: 3, user_id: 2, song_id: 2, liked_at: new Date() },
  { like_id: 4, user_id: 3, song_id: 1, liked_at: new Date() }
])


// 3. Fetch Songs Played by a User in the Last 7 Days
db.listeninghistory.find(
  {
    user_id   : 1,
    played_at : { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }
  },
  { _id: 0, song_id: 1, played_at: 1, skipped: 1 }
)


// 4. Updating

// (a) Add a Song to a Playlist
db.playlists.updateOne(
  { playlist_id: 1 },
  { $push: { song_ids: 5 } }
)

// (b) Record a New Like
db.likes.insertOne({
  like_id  : 5,
  user_id  : 2,
  song_id  : 4,
  liked_at : new Date()
})

// (c) Record New Listening Activity
db.listeninghistory.insertOne({
  history_id : 8,
  user_id    : 2,
  song_id    : 4,
  played_at  : new Date(),
  skipped    : false
})


// 5. Aggregation

// (a) Most Played Songs
db.listeninghistory.aggregate([
  { $match: { skipped: false } },
  {
    $group: {
      _id        : "$song_id",
      total_plays : { $sum: 1 }
    }
  },
  { $sort: { total_plays: -1 } },
  {
    $project: {
      _id         : 0,
      song_id     : "$_id",
      total_plays : 1
    }
  }
])

// (b) Artist Popularity (by total plays across all their songs)
db.listeninghistory.aggregate([
  { $match: { skipped: false } },
  {
    $group: {
      _id         : "$song_id",
      total_plays : { $sum: 1 }
    }
  },
  {
    $lookup: {
      from         : "songs",
      localField   : "_id",
      foreignField : "song_id",
      as           : "song_info"
    }
  },
  { $unwind: "$song_info" },
  {
    $group: {
      _id         : "$song_info.artist_id",
      total_plays : { $sum: "$total_plays" }
    }
  },
  { $sort: { total_plays: -1 } },
  {
    $project: {
      _id         : 0,
      artist_id   : "$_id",
      total_plays : 1
    }
  }
])

// (c) Trending Playlists (by total songs count)
db.playlists.aggregate([
  {
    $project: {
      _id         : 0,
      playlist_id : 1,
      name        : 1,
      user_id     : 1,
      total_songs : { $size: "$song_ids" }
    }
  },
  { $sort: { total_songs: -1 } }
])