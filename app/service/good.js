'use strict';

const Service = require('egg').Service;

class GoodService extends Service {
  async create(payload) {
    return this.ctx.model.Good.create(payload);
  }
  async query(payload) {
    const { page, size, sort, hot } = payload;
    const limit = parseInt(size);
    const skip = parseInt(page, 10) * (limit || 10);
    let queryParam = {};
    if (sort && hot) {
      queryParam = { sort, hot };
    } else if (sort) {
      queryParam = { sort };
    } else if (hot) {
      queryParam = { hot };
    }
    return this.ctx.model.Good.find(queryParam)
      .limit(limit)
      .skip(skip);
  }
  async count() {
    return this.ctx.model.Good.find().count();
  }
  async update(id, payload) {
    return this.ctx.model.Good.findByIdAndUpdate(id, payload);
  }
  async delete(id) {
    return this.ctx.model.Good.findByIdAndDelete(id);
  }
  async findOne(payload) {
    return this.ctx.model.Good.findOne(payload);
  }
}

module.exports = GoodService;
