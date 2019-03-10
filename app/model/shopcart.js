'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const shopcartSchema = new Schema({
    imgUrl: { type: String },
    name: { type: String },
    price: { type: Number },
    sort: { type: String },
    bannerList: { type: mongoose.Schema.Types.Mixed },
    details: { type: String },
    gmtCreate: { type: String },
    status: { type: Number },
    hot: { type: Number },
    size: { type: String },
    username: {
      type: String,
    },
    password: { type: String },
    realName: { type: String },
    phone: { type: Number },
    address: { type: String },
    gmtModify: { type: Date },
  });

  return mongoose.model('Shopcart', shopcartSchema);
};
