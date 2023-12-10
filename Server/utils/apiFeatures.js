class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log('4', queryString);

    // {difficulty: 'easy', duration: {$gte: 5}}
    // {difficulty: 'easy', duration: {gte: '5'}}
    // gte, gt, lte, lt

    console.log('Filter:', queryString);
    //Build query
    this.query = this.query.find(JSON.parse(queryString));
    //let query = Tour.find(queryString);

    return this;
  }

  // filterBySpecification() {
  //   const queryObj = { ...this.queryString };
  //   const excludedFields = ['page', 'sort', 'limit', 'fields'];
  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   //Advanced filtering
  //   let queryString = JSON.stringify(queryObj);
  //   queryString = queryString.replace(
  //     /\b(gte|gt|lte|lt)\b/g,
  //     (match) => `$${match}`
  //   );
  //   console.log('4', queryString);

  //   // {difficulty: 'easy', duration: {$gte: 5}}
  //   // {difficulty: 'easy', duration: {gte: '5'}}
  //   // gte, gt, lte, lt

  //   console.log('Filter:', queryString);
  //   //Build query
  //   this.query = this.query.find(JSON.parse(queryString));
  //   //let query = Tour.find(queryString);

  //   return this;
  // }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1; //default 1
    const limit = parseInt(this.queryString.limit, 10) || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist');
    // }

    return this;
  }
}

module.exports = APIFeatures;
