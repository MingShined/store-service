'use strict';

const Service = require('egg').Service;

class GoodService extends Service {
  async create(payload) {
    return this.ctx.model.Good.create(payload);
  }
  async query(payload) {
    const { page, size } = payload;
    const limit = parseInt(size);
    const skip = parseInt(page, 10) * (limit || 10);
    return this.ctx.model.Good.find()
      .limit(limit)
      .skip(skip);
  }
  async count() {
    return this.ctx.model.Good.find().count();
  }
  async find(id) {
    return this.ctx.model.Good.findById(id);
  }
  async update(id, payload) {
    return this.ctx.model.Good.findByIdAndUpdate(id, payload);
  }
  async delete(id) {
    return this.ctx.model.Good.findByIdAndDelete(id);
  }
}

module.exports = GoodService;
