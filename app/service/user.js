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
    const userInfo = await this.ctx.service.user.findOne(payload);
    if (userInfo && (userInfo._id || userInfo.phone)) {
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
    const userInfo = await this.ctx.service.user.findOne({ phone });
    if (!userInfo || !userInfo._id) {
      this.ctx.service.user.logout();
      this.ctx.throw(500, '用户不存在!');
    }
    if (password !== userInfo.password) {
      this.ctx.service.user.logout();
      this.ctx.throw(500, '密码错误!');
    }
    return userInfo;
  }
  /**
   * @name 登出
   */
  async logout() {
    this.ctx.cookies.set('user-cookie', null);
    const res = { code: 200, message: '退出登录成功' };
    return res;
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 从数据库获取用户信息列表
   */
  async query(payload) {
    return this.ctx.model.User.find(payload);
  }
  /**
   * @name 获取session
   */
  async getUserSession() {
    return this.ctx.cookies.get('user-cookie');
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 完善信息
   */
  async update(payload) {
    const _id = await this.ctx.service.user.getUserSession();
    if (!_id) {
      this.ctx.service.user.logout();
      this.ctx.throw(401, '请登录');
    }
    return this.ctx.model.User.findByIdAndUpdate(_id, payload);
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 从数据库获取单条用户信息
   */
  async findOne(payload) {
    return this.ctx.model.User.findOne(payload);
  }
}

module.exports = UserService;
