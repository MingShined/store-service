'use strict';

const Controller = require('egg').Controller;

class GoodController extends Controller {
  async create() {
    this.ctx.body = await this.ctx.service.good.create(this.ctx.request.body);
  }
  async query() {
    const queryParams = this.ctx.query;
    const list = await this.ctx.service.good.query(queryParams);
    const count = await this.ctx.service.good.count();
    this.ctx.set('x-total-count', count);
    this.ctx.body = list;
  }
  async find() {
    const _id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.good.findOne({ _id });
  }
  async update() {
    const { request } = this.ctx;
    const _id = request.body._id;
    this.ctx.body = await this.ctx.service.good.update(_id, request.body);
  }
  async delete() {
    const _id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.good.delete(_id);
  }
}

module.exports = GoodController;
