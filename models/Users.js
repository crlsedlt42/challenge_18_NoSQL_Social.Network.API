const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        // match a valid email address
        //match: [/.+@.+\..+/]
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
    }
);

userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length;
})
.set(function(v) {
    return this.friends = v;
});

const User = model('user', userSchema);

module.exports = User;