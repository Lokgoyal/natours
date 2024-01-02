const express = require('express');
const errorController = require('./controllers/errorController');



// Init App instance
const app = express();



// Mount middlewares (General)
app.use(express.json());


// Error-specific
app.use(errorController.missingRoutesHandler);
app.use(errorController.globalErrorHandler);



// Export app
module.exports = app;