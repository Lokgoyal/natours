// Blueprint definition
class APIFeatures {

    constructor(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
    }


    filter() {
        // FILTERING
        let tempQueryObj = { ...this.queryObj };
        const filterOps = ['sort', 'fields', 'page', 'limit'];
        filterOps.forEach( operation => delete tempQueryObj[operation] );

        tempQueryObj = JSON.parse(JSON.stringify(tempQueryObj).replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`));
        this.query = this.query.find(tempQueryObj);
        return this;
    }


    sort() {
        // SORTING
        const sortBy = this.queryObj.sort ? this.queryObj.sort.split(',').join(' ') : '-createdAt';
        this.query = this.query.sort(sortBy);
        return this;
    }


    project() {
        // PROJECTION
        const selectBy = this.queryObj.fields ? this.queryObj.fields.split(',').join(' ') : '-__v';
        this.query = this.query.select(selectBy);
        return this;
    }


    paginate() {
        // PAGINATION
        const page = this.queryObj.page || 1;
        const limit = this.queryObj.limit || 10;
        const numSkipDocs = limit * (page-1);

        this.query = this.query.skip(numSkipDocs).limit(limit);
        return this;
    }
}



// Export Utility to handle queryString
module.exports = APIFeatures;