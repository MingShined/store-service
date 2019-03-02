'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.registerTansfer = {
      // username: {
      //   type: 'string',
      //   required: true,
      //   allowEmpty: false,
      // },
      password: {
        type: 'string',
        required: true,
        allowEmpty: false,
        format: /^(\w){6,20}$/,
      },
      phone: {
        type: 'string',
        required: true,
        allowEmpty: false,
        format: /^[1][3,4,5,7,8][0-9]{9}$/,
      },
    };
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 注册
   */
  async register(payload) {
    this.ctx.validate(this.registerTansfer);
    const isRegister = await this.ctx.service.user.getUserInfo(payload);
    if (isRegister.length === 1 && isRegister[0]._id) {
      this.ctx.throw(500, '手机号已被注册');
    }
    return this.ctx.model.User.create(payload);
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 登录
   */
  async login(payload) {
    // this.ctx.validate(this.registerTansfer);
    const { phone, password } = payload;
    const userInfo = await this.ctx.service.user.getUserInfo({ phone });
    if (!userInfo.length) {
      this.ctx.throw(401, '用户不存在!');
    }
    if (password !== userInfo[0].password) {
      this.ctx.throw(401, '密码错误!');
    }
    return userInfo[0];
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 获取用户信息
   */
  async getUserInfo(payload) {
    return this.ctx.model.User.find(payload);
  }
  /**
   * @name 获取session
   */
  async getUserSession() {
    return this.ctx.session.user;
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 完善信息
   */
  async update(payload) {
    const _id = await this.ctx.service.user.getUserSession();
    if (!_id) {
      this.ctx.throw(401, '请登录');
    }
    return this.ctx.model.User.findByIdAndUpdate(_id, payload);
  }
}

module.exports = UserService;
