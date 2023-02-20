//importing required modules
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



//creates a new 'mongoose.schema' with three fields, all of which are required, but password does not have to be unique
//i.e. user1 and user2 can have the same password, but NOT the smae username and email
const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true}
    },
    {collection: 'users'}       //this specified the name of the collection in the database
)


//defines a method called comparePassword in the userSchema, comparing a candidate password to the hashed variation
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err)
      callback(null, isMatch)
    })
}

//creates a new 'mongoose.model' called user using the userSchema object defined above
const model = mongoose.model('User', UserSchema)
module.exports = model