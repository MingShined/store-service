'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.orderTansfer = {
      goodList: {
        type: 'array',
        required: true,
        allowEmpty: false,
      },
      cartList: {
        type: 'array',
        required: false,
        allowEmpty: true,
      },
    };
  }
  async create(payload) {
    const { ctx } = this;
    /**
     * @name ===========未登录==============
     */
    const userId = await ctx.service.user.getUserSession();
    if (!userId) {
      ctx.throw('请登录', 401);
    }

    /**
     * @name ===========校验参数==============
     */
    this.ctx.validate(this.orderTansfer);

    /**
     * @name ===========未完善信息==============
     */
    let userInfo = await ctx.service.user.findOne({ _id: userId });
    userInfo = JSON.parse(JSON.stringify(userInfo));
    if (!userInfo.address || !userInfo.realName) {
      ctx.throw('请完善用户信息', 500);
    }

    /**
     * @name ===========直接创建订单==============
     */
    const { goodList, cartList } = payload;
    if (!cartList || !cartList.length) {
      const { id, quantity, size } = goodList[0];
      let orderInfo = await ctx.service.good.findOne({ _id: id });
      orderInfo = JSON.parse(JSON.stringify(orderInfo));
      orderInfo.status = 0;
      orderInfo.quantity = quantity;
      orderInfo.size = size;
      return ctx.model.Order.create({ userInfo, orderInfo });
    }

    /**
     * @name ===========购物车创建订单,创建成功后删除购物车==============
     */
    // 删除用户购物车
    cartList.forEach(async item => {
      return ctx.model.Shopcart.findByIdAndRemove(item);
    });
    // 依次创建订单
    goodList.forEach(async item => {
      let orderInfo = await ctx.service.good.findOne({ _id: item.id });
      orderInfo = JSON.parse(JSON.stringify(orderInfo));
      orderInfo.status = 0;
      orderInfo.quantity = item.quantity;
      orderInfo.size = item.size;
      return ctx.model.Order.create({ userInfo, orderInfo });
    });
    return { message: '下单成功' };
  }
  async query() {
    const { ctx } = this;
    /**
     * @name ===========未登录==============
     */
    const userId = await ctx.service.user.getUserSession();
    if (!userId) {
      ctx.throw('请登录', 401);
    }
    return ctx.model.Order.find({ 'userInfo._id': userId });
  }
  async queryAll() {
    return this.ctx.model.Order.find();
  }
  async update(payload) {
    return this.ctx.model.Order.findByIdAndUpdate(payload.id, {
      'orderInfo.status': payload.status,
    });
  }
}

module.exports = OrderService;
