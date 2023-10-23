// .Router() is a function that returns a router object to which you can add routes.
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send("Oops! Wrong Route, please try again.");
});

module.exports = router;

// This index.js file is the entry point for the routes folder. 
// It is responsible for collecting all of the API routes and packaging them up. 
// This is where we import the routes from api/index.js and prefix their endpoint names before they get exported.