const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function(validation) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validation);
        },
        message: "Please enter a valid email address!"
    },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    (total, friends) => total + friends.length + 1,
    0
  );
});

UserSchema.plugin(uniqueValidator);

const User = model('User', UserSchema);

module.exports = User;