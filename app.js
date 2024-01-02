const express = require('express');
const tourRouter = require('./routers/tourRoutes');
const errorController = require('./controllers/errorController');



// Init App instance
const app = express();



// Mount middlewares (General)
app.use(express.json());


// (Route-specific)
app.use('/api/v1/tours', tourRouter);


// Error-specific
app.use(errorController.missingRoutesHandler);
app.use(errorController.globalErrorHandler);



// Export app
module.exports = app;