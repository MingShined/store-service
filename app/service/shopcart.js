'use strict';

const Service = require('egg').Service;

class ShopcartService extends Service {
  async create(payload) {
    const { ctx } = this;
    const _id = await ctx.service.user.getUserSession();
    if (!_id) {
      ctx.throw('请登录', 401);
    }
    const userInfo = await ctx.service.user.findOne({ _id });
    // const goodInfo = await ctx.service.good.findOne({ _id: payload.id });
    // const result = { ...userInfo, ...goodInfo, size: payload.size };
    // console.log(`-----${JSON.stringify(result)}`);
    return userInfo;
  }
}

module.exports = ShopcartService;
