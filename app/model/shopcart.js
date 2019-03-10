'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const shopcartSchema = new Schema({
    userInfo: { type: mongoose.Schema.Types.Mixed },
    goodInfo: { type: mongoose.Schema.Types.Mixed },
    userId: { type: String },
  });

  return mongoose.model('Shopcart', shopcartSchema, 'shopcart');
};
