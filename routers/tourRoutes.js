const express = require('express');
const tourController = require('./../controllers/tourController');



// Init App instance (router)
const router = express.Router();



// Mount routes
router.get('/', tourController.getAllTours);



// Export router
module.exports = router;