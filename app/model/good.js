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
  });

  return mongoose.model('Good', goodSchema, 'good');
};
