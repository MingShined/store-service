'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: {
      type: String,
      default: `淘衣用户${new Date().getTime()}`,
    },
    password: { type: String, required: true },
    realName: { type: String, default: '' },
    phone: { type: Number, unique: true, required: true, default: null },
    address: { type: String, default: '' },
    gmtModify: { type: Date, default: Date.now },
  });

  return mongoose.model('User', userSchema, 'user');
};
