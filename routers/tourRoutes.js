const express = require('express');
const tourController = require('./../controllers/tourController');



// Init App instance (router)
const router = express.Router();



// Mount routes (Analytial)
router.get('/stats', tourController.tourStats);
router.get('/top-5-tours', tourController.aliasTopTours, tourController.getAllTours);
router.get('/monthly-plan/:year', tourController.monthlyPlan);

// (CRUD)
router.route('/').post(tourController.createTour).get(tourController.getAllTours);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);


// Export router
module.exports = router;