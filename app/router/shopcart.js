'use strict';
module.exports = app => {
  const { router, controller } = app;
  /**
   * @name 购物车
   */
  router.post('/api/shopcart', controller.shopcart.create);
  router.get('/api/shopcart', controller.shopcart.query);
};
