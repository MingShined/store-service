'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  /**
   * @name 轮播
   */
  async uploadBanner() {
    const { service, request } = this.ctx;
    this.ctx.body = await service.index.uploadBanner(request.body.bannerList);
  }
  async getBanner() {
    this.ctx.body = await this.ctx.service.index.getBanner();
  }
  /**
   * ==============
   * @name 分类
   */
  async createSort() {
    this.ctx.body = await this.ctx.service.index.createSort(
      this.ctx.request.body
    );
  }
  async querySort() {
    this.ctx.body = await this.ctx.service.index.querySort();
  }
  async findSort() {
    const _id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.index.querySort({
      _id
    });
  }
  async deleteSort() {
    const _id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.index.deleteSort(_id);
  }
  async updateSort() {
    const { request } = this.ctx;
    this.ctx.body = await this.service.index.updateSort(
      request.body._id,
      request.body
    );
  }
}

module.exports = IndexController;
