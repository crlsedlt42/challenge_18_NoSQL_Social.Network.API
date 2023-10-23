const { Schema, model } = require('mongoose');
// Import the schema for Reaction used to validate and create a 'reaction' from the subdocument
// The responses from the Reaction model will be used to populate the reactions field in the Thought model
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // Must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: true
        },

        // Use ReactionSchema to validate data for a reaction
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})
.set(function(v) {
    return this.reactions = v;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;