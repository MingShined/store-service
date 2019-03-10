'use strict';

const Controller = require('egg').Controller;

class ShopcartController extends Controller {
  /**
   * @name 新增购物车
   */
  async create() {
    const { ctx } = this;
    const res = await ctx.service.shopcart.create(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ShopcartController;
