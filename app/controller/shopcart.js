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
  /**
   * @name 获取当前登录用户购物车列表
   */
  async query() {
    const { ctx } = this;
    const res = await ctx.service.shopcart.query();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ShopcartController;
