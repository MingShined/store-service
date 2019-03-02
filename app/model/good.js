'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const goodSchema = new Schema({
    imgUrl: { type: String },
    name: { type: String },
    price: { type: Number },
    sort: { type: String },
    bannerList: { type: String },
    details: { type: String },
    gmtCreate: { type: String },
    status: { type: Number },
    hot: { type: Number },
  });

  return mongoose.model('Good', goodSchema, 'good');
};
