'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const orderSchema = new Schema({
    userInfo: { type: mongoose.Schema.Types.Mixed },
    orderInfo: { type: mongoose.Schema.Types.Mixed },
    gmtCreate: { type: Date, default: Date.now },
  });

  return mongoose.model('Order', orderSchema, 'order');
};
