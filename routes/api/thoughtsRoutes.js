const router = require('express').Router();

const {

    //Create
    createSingleThought,
    addSingleReaction,

    //Read
    getSingleThought,
    getAllThoughts,

    //Update
    updateSingleThought,

    //Delete
    deleteSingleThought,
    deleteSingleReaction,

} = require('../../controllers/thoughtsController');
// CRUD - Create, Read, Update, Delete
// Creating an array of routes to match the CRUD operations for Thoughts.js model


router.route('/')
.get(getAllThoughts)
.post(createSingleThought);

router.route('/:thoughtsId')
.get(getSingleThought)
.put(updateSingleThought)
.delete(deleteSingleThought);

router.route('/:thoughtsId/reactions')
.post(addSingleReaction);

router.route('/:thoughtsId/reactions/:reactionId')
.delete(deleteSingleReaction);

module.exports = router;
