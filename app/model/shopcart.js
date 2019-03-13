'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const shopcartSchema = new Schema({
    userInfo: { type: mongoose.Schema.Types.Mixed },
    goodInfo: { type: mongoose.Schema.Types.Mixed },
  });

  return mongoose.model('Shopcart', shopcartSchema, 'shopcart');
};
