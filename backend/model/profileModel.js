const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true, 
     unique: true 
  },
  firstName: String,
  lastName: String,
  avatar: String, // store URL or Base64 string (easier than Buffer)
  bio: String
}, { timestamps: true })

module.exports = mongoose.model('Profile', ProfileSchema)
