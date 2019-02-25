'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const bannerSchema = new Schema({
    imgUrl: { type: String }
  });

  return mongoose.model('Banner', bannerSchema, 'banner');
};
