'use strict';
module.exports = app => {
  const { router, controller } = app;

  /**
   * @name 订单
   */
  router.post('/api/order', controller.order.create);
  router.get('/api/order', controller.order.query);
  router.put('/api/order', controller.order.update);
  router.get('/api/all-order', controller.order.queryAll);
};
