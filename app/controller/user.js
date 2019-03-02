'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * @name 注册
   */
  async register() {
    const { ctx } = this;
    const { service, request } = ctx;
    const res = await service.user.register(request.body);
    ctx.helper.success({ ctx, res });
  }
  /**
   * @name 登录
   */
  async login() {
    const { ctx } = this;
    const { service, request } = ctx;
    const res = await service.user.login(request.body);
    ctx.session.user = res._id;
    ctx.helper.success({ ctx, res });
  }
  /**
   * @name 登出
   */
  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    const res = { code: 200, message: '退出登录成功' };
    ctx.helper.success({ ctx, res });
  }
  /**
   * @name 获取用户列表
   */
  async query() {
    this.ctx.body = await this.ctx.service.user.getUserInfo();
  }
  /**
   * @name 完善信息
   */
  async update() {
    const { ctx } = this;
    const res = await this.ctx.service.user.update(ctx.request.body);
    this.ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
