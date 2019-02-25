'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const sortSchema = new Schema({
    imgUrl: { type: String },
    name: { type: String },
  });

  return mongoose.model('Sort', sortSchema, 'sort');
};
