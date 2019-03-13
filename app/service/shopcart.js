'use strict';

const Service = require('egg').Service;

class ShopcartService extends Service {
  constructor(ctx) {
    super(ctx);
    this.shopcartTansfer = {
      id: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
      size: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
      quantity: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
    };
  }
  async create(payload) {
    const { ctx } = this;
    const { goodId, size, quantity } = payload;

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
    this.ctx.validate(this.shopcartTansfer);

    /**
     * @name ===已经添加过相同商品，数量加1===
     */
    const shopcartInfo = await ctx.service.shopcart.findOne({
      userId,
      'goodInfo._id': goodId,
      'goodInfo.size': size,
    });
    // 若存在，累加数量
    if (shopcartInfo) {
      const updateCartInfo = JSON.parse(JSON.stringify(shopcartInfo));
      ++updateCartInfo.goodInfo.quantity;
      return ctx.model.Shopcart.findByIdAndUpdate(
        updateCartInfo._id,
        updateCartInfo,
      );
    }

    /**
     * @name ===未添加过相同商品,新增商品===
     */
    let userInfo = await ctx.service.user.findOne({ _id: userId });
    userInfo = JSON.parse(JSON.stringify(userInfo));
    let goodInfo = await ctx.service.good.findOne({ _id: goodId });
    goodInfo = JSON.parse(JSON.stringify(goodInfo));
    goodInfo = { ...goodInfo, size, quantity: quantity ? quantity : 1 };
    const result = { userInfo, goodInfo };
    return ctx.model.Shopcart.create(result);
  }
  async findOne(payload) {
    const { ctx } = this;
    return ctx.model.Shopcart.findOne(payload);
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
    return ctx.model.Shopcart.find({ 'userInfo._id': userId });
  }
}

module.exports = ShopcartService;
