const router = require('express').Router();

const {
    
    //Create
    createUser,

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


// These routes are now being directed to the controllers/usersController.js file
router.route('/')
    .get(getAllUsers) 
    .post(createUser); // ERROR HERE FROM TERMINAL

router.route('/:userId')
    .get(getSingleUser)
    .put(updateSingleUser)
    .delete(deleteSingleUser);

router.route('/:userId/friends/:friendId')
    .put(updateFriendList)
    .delete(deleteFromList);

module.exports = router;

    // getAllUsers,
    // getOneUser,
    // createOneUser,
    // updateOneUser,
    // deleteOneUser,
    // addToFriendList,
    // removeFromFriendList