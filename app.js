const express = require('express');



// Init App instance
const app = express();



// Mount middlewares (General)
app.use(express.json());



// Export app
module.exports = app;