const app = require('./app');



// Deployment
const port = 3000;
const server = app.listen(port, () => console.log(`Server running on port: ${port}!`));