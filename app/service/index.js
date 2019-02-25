'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 轮播
   */
  async uploadBanner(payload) {
    await this.ctx.model.Banner.remove();
    if (payload.length) {
      payload.forEach(item => this.ctx.model.Banner.create({ imgUrl: item }));
    } else {
      await this.ctx.model.Banner.remove();
    }
    return this.ctx.service.index.getBanner();
  }
  async getBanner() {
    return this.ctx.model.Banner.find();
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * @name 分类
   */
  async createSort(payload) {
    return this.ctx.model.Sort.create(payload);
  }
  async querySort(payload) {
    return this.ctx.model.Sort.find(payload);
  }
  async updateSort(_id, payload) {
    return this.ctx.model.Sort.findByIdAndUpdate(_id, payload);
  }
  async deleteSort(_id) {
    return this.ctx.model.Sort.findByIdAndDelete(_id);
  }
}

module.exports = IndexService;
