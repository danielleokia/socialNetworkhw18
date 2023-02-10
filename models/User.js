const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
      type: String,
      required: 'Please enter your name',
      trim: true,
    },
    email: {
      type: String,
      required: 'Please enter a valid email address',
      unique: true,
      validate: {
        validator(email){
            return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                email
            );
        },
        message: "Enter a valid email address",
    },

},
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
       friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
   },
    {
      toJSON: {
        getters: true,
        virtuals: true  
      },
      id: false
    }
  );
  
 UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
 })
  const User = model('User', UserSchema)
  module.exports = User