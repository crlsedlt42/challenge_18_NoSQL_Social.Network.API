// This code is used to connect to the api routes
const router = require('express').Router();

// These require statements are used to connect to the api routes
const thoughts = require('./thoughtsRoutes');
const users = require('./usersRoutes'); // ERROR HERE FROM TERMINAL

// These routes are now being directed to the routes/api/thoughtsRoutes.js file
router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;