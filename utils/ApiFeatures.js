class APiFeatures {
  constructor(query, querystring) {
    this.query = query;
    this.querystring = querystring;
  }

  filter() {
    const queryObj = { ...this.querystring };
    const excludesField = ["page", "limit", "sort", "fields"];
    excludesField.map((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.querystring.sort) {
      const sortBy = this.querystring.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limiting() {
    if (this.querystring.fields) {
      const fields = this.querystring.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = this.querystring.page * 1 || 1;
    const limit = this.querystring.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APiFeatures;
