const { Users } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers (req, res) {
        try {
            const users = await Users.find();

            const userObject = users

            res.json(userObject);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser (req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({ user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a user
    async createUser (req, res) {
        try {
            const user = await Users.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a user
    async updateSingleUser (req, res) {
        try {
            const update = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    username: req.body.username,
                    email: req.body.email
                })
            if (!update) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.status(200).json({ message: 'User updated!' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    // Delete a user
    async deleteSingleUser (req, res) {
        try {
            const delete1user = await Users.findOneAndDelete({ _id: req.params.userId });

            if (!delete1user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.status(200).json({ message: 'User deleted!' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Add a friend
    async updateFriendList (req, res) {
        try {
            const friend = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.status(200).json({ message: 'Friend added!' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Remove a friend
    async deleteFromList (req, res) {
        try {
            const deleteUser = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            if (!deleteUser) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.status(200).json({ message: 'Friend deleted!' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}