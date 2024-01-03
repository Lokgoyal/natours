const Tour = require('./../models/tourModel');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');



// Handlers
exports.aliasTopTours = (req, res, next) => {
    req.query.fields = 'name,difficulty,ratingsAverage,maxGroupSize,price,summary';
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = 5;
    next();
};



exports.getAllTours = async (req, res, next) => {
    
    const utilObj = new APIFeatures(Tour.find(), req.query);
    utilObj.filter().sort().project().paginate();

    const tours = await utilObj.query;
    res.status(200).json({
        status : 'success',
        numTours : tours.length,
        data : { tours }
    });
};



exports.createTour = async (req, res, next) => {

    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status : 'success',
        data : { tour : newTour }
    });
};



exports.getTour = async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
        status : 'success',
        data : { tour }
    });
};



exports.updateTour = async (req, res, next) => {

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    });
    if(!updatedTour) return next( new AppError(`No tour exist with this ID!`, 404) );

    res.status(200).json({
        status : 'success',
        data : { tour : updatedTour }
    });
};



exports.deleteTour = async (req, res, next) => {

    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if(!deletedTour) return next( new AppError(`No tour exist with this ID!`, 404) );

    res.status(204).json({
        status : 'success',
        data : null
    });
};



// Analytical
exports.tourStats = async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match : { ratingsAverage : { $gt : 4.5 } }
        },

        {
            $group : {
                _id : '$difficulty',
                numTours : { $sum : 1 },
                avgRating : { $avg : '$ratingsAverage' },
                numRatings : { $sum : '$ratingsQuantity' },
                avgPrice : { $avg : '$price' },
                minPrice : { $min : '$price' },
                maxPrice : { $max : '$price' }
            }
        },

        {
            $sort : { numTours : -1 }
        }
    ]);

    res.status(200).json({
        status : 'success',
        data : { stats }
    });
};



exports.monthlyPlan = async (req, res, next) => {

    const { year } = req.params;
    const plan = await Tour.aggregate([
        {
            $unwind : '$startDates'
        },

        { 
            $match : { startDates : {
                $gte : new Date(`${year}-01-01`),
                $lte : new Date(`${year}-12-31`)
            }}
        },

        {
            $group : {
                _id : { $month : '$startDates' },
                tours : { $push : '$name' },
                numTours : { $sum : 1 }
            }
        },

        {
            $addFields : { month : '$_id' }
        },

        {
            $sort : {
                numTours : -1,
                month : 1
            }
        },

        {
            $project : { _id : 0 }
        },

        {
            $limit : 5
        }
    ]);

    res.status(200).json({
        status : 'success',
        data : { plan }
    });
};