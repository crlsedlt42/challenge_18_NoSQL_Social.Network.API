const { User, Thought } = require('../models');

module.exports = {

    // Get all thoughts
    async getAllThoughts (req, res) {
        try {
            const thoughts = await Thought.find()
            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Get a single thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Create a thought
    async createSingleThought (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            const thought = await Thought.create(req.body)
            user.thoughts.push(thought._id)
            await user.save()

            res.status(200).json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Update a Thought
    async updateSingleThought (req, res) {
        try {
            const update1 = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username
                })
        if (!update1) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.status(200).json(update1)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Delete a Thought
    async deleteSingleThought (req, res) {
        try {
            const delete1Thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!delete1Thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Add a reaction
    async addSingleReaction (req, res) {
        try {
            const reactionText = req.body.reactionText
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { reactionText } } },
                { new: true }
            )
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json({ message: `Reaction "${req.body.reactionText}" added to "${req.params.thoughtId}"`})
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Delete a reaction
    async deleteSingleReaction (req, res) {
        try {
            const delete1reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )
            if (!delete1reaction) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json({ message: `Reaction "${req.params.reactionId}" deleted from "${req.params.thoughtId}"`})
        } catch (err) {
            res.status(500).json(err)
        }
    }
}