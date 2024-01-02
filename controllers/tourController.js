const Tour = require('./../models/tourModel');



// Handlers
exports.getAllTours = async (req, res, next) => {
    
    const tours = await Tour.find();
    res.status(200).json({
        status : 'success',
        numTours : tours.length,
        data : { tours }
    });
};