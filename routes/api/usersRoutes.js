const router = require('express').Router();

const {
    
    //Create
    createSingleUser,

    //Read
    getSingleUser,
    getAllUsers,

    //Update
    updateSingleUser,
    updateFriendList,

    //Delete
    deleteSingleUser,
    deleteFromList,

} = require('../../controllers/usersController');
// CRUD - Create, Read, Update, Delete
// Creating an array of routes to match the CRUD operations for Users.js model


router.route('/')
    .get(getAllUsers)
    .post(createSingleUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateSingleUser)
    .delete(deleteSingleUser);

router.route('/:userId/friends/:friendId')
    .put(updateFriendList)
    .delete(deleteFromList);

module.exports = router;