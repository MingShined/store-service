'use strict';
module.exports = app => {
  const { router, controller } = app;
  /**
   * @name 分类
   */
  router.post('/api/good', controller.good.create);
  router.get('/api/good', controller.good.query);
  router.put('/api/good', controller.good.update);
  router.get('/api/good/:id', controller.good.find);
  router.delete('/api/good/:id', controller.good.delete);
};
