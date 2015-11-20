var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/about', (req, res) =>{

    res.redirect('/about');




});

module.exports = router;
