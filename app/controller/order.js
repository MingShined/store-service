'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async create() {
    const { ctx } = this;
    const res = await ctx.service.order.create(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }
  async query() {
    const { ctx } = this;
    const res = await ctx.service.order.query(ctx.query);
    ctx.helper.success({ ctx, res });
  }
  async queryAll() {
    const { ctx } = this;
    const res = await ctx.service.order.queryAll();
    ctx.helper.success({ ctx, res });
  }
  async update() {
    const { ctx } = this;
    const res = await ctx.service.order.update(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }
  async findOne() {
    const { ctx } = this;
    const _id = ctx.params.id;
    const res = await ctx.service.order.findOne({ _id });
    ctx.helper.success({ ctx, res });
  }
}

module.exports = OrderController;
