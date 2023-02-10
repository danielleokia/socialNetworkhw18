const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema to create Student model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'Enter your reaction',
      max_length: 250,
    },
    username: {
      type: String,
      required: 'Please enter your name',
      trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal) 
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const ThoughtSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true
      },
      thoughtText: {
        type: String,
        required: 'Type a thought',
        max_length: 250,
        min_length: 1
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal) 
      },
      reactions: [ReactionSchema]
    },
    {
      toJSON: {
        getters: true,
        virtuals: true
      },
      id: false
    }
  )
ThoughtSchema.virtual("reacrtionCount").get(function (){
    return this.rections.length;
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought



