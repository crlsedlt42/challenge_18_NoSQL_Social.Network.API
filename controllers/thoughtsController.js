const { Users, Thoughts } = require('../models');

module.exports = {

    // Get all thoughts
    async getAllThoughts (req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.status(200).json(thoughts)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    // Get a single thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtsId }).select('-__v')

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json({thought})
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Create a thought
    async createSingleThought (req, res) {
        try {
            const user = await Users.findOne({ username: req.body.username });
            const thought = await Thoughts.create(req.body);
            user.thoughts.push(thought)
            await user.save()

            res.status(200).json(thought)
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    // Update a Thought
    async updateSingleThought (req, res) {
        try {
            const update1 = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
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
            console.log(err)
        }
    },

    // Delete a Thought
    async deleteSingleThought(req, res) {
        try {
            const delete1Thought = await Thoughts.findByIdAndDelete({ _id: req.params.thoughtsId });
            if (!delete1Thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    // Get all reactions
    
    // Add a reaction
    async addSingleReaction (req, res) {
        try {
            const reactionText = req.body.reactionText
            const reaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
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
            const delete1reaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $pull: { reactions: { reactionsId: req.params.reactionId } } },
                { new: true }
            )
            if (!delete1reaction) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.status(200).json({ message: `Reaction "${req.params.reactionsId}" deleted from "${req.params.thoughtId}"`})
        } catch (err) {
            res.status(500).json(err)
        }
    }
}