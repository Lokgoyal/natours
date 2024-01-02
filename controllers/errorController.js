const AppError = require('./../utils/AppError');



// Handlers
exports.missingRoutesHandler = (req, res, next) => next( new AppError(`The currently requested route does not exist on this server!`, 404) );


exports.globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.error(err);
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    });
};