const dotenv = require('dotenv');
dotenv.config({ path : `${__dirname}/config.env` });

const mongoose = require('mongoose');
const app = require('./app');



// Database connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false
}).then(con => console.log(`Database connected ✅`));



// Deployment
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server running on port: ${port}!`));