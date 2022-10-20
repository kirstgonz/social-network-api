
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1
         //set it to 1 - 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: []
    }
);

 // get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
    (total, reactions) => total + reactions.length + 1,
    0
    );
});

ThoughtSchema.plugin(uniqueValidator);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;