const slugify = require('slugify');
const mongoose = require('mongoose');



// Schema definition
const tourSchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true,
        minLength : [10, 'Tour name must be atleast 10 characters long!'],
        maxLength : [40, 'Tour name cannot be longer than 40 characters!'],
        required : [true, 'Tour must have name specified!']
    },

    slug : String,

    duration : {
        type : Number,
        required : [true, 'Tour must have duration specified!'],
    },

    difficulty : {
        type : String,
        lowercase : true,
        enum : {
            values : ['easy', 'medium', 'difficult'],
            message : `Tour difficulty can be either easy/medium/difficult`
        },
        required : [true, 'Tour must have difficulty specified!']
    },

    maxGroupSize : {
        type : Number,
        required : [true, 'Tour must have maxGroupSize specified!']
    },

    ratingsAverage : {
        type : Number,
        min : [1, 'Tour ratings must be in range of 1 to 5!'],
        max : [5, 'Tour ratings must be in range of 1 to 5!'],
        default : 4.5
    },

    ratingsQuantity : {
        type : Number,
        default : 0
    },

    price : {
        type : Number,
        required : [true, 'Tour must have price specified!']
    },

    priceDiscount : {
        type : Number,
        validate : {
            validator : function(curDiscount) { return curDiscount < this.price; },
            message : props => `${props.value} is not a valid discount!`
        }
    },

    startLocation : {
        type : {
            type : String,
            enum : ['Point'],
            default : 'Point'
        },
        coordinates : [Number],
        description : String,
        address : String,
    },

    startDates : [Date],

    summary : {
        type : String,
        trim : true,
        required : [true, 'Tour must have summary specified!']
    },

    description : {
        type : String,
        trim : true
    },

    locations : [{
        type : {
            type : String,
            enum : ['Point'],
            default : 'Point'
        },
        coordinates : [Number],
        description : String,
        address : String,
        day : Number
    }],

    imageCover : {
        type : String,
        required : [true, 'Tour must have imageCover specified!']
    },

    images : [String],

    isSecretTour : {
        type : Boolean,
        default : false
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },
});



// Attach Hooks
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.slug, { lower : true });
    next();
});



// Build Model
const Tour = mongoose.model('Tour', tourSchema);



// Exports model
module.exports = Tour;