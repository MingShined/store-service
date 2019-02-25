'use strict';
module.exports = app => {
  const { router, controller } = app;
  /**
   * @name 上传图片
   */
  router.post('/api/upload', controller.common.upload);
  //   router.all('*', controller.common.allowJumpDomain);

  /**
   * @name 轮播
   */
  router.post('/api/banner', controller.index.uploadBanner);
  router.get('/api/banner', controller.index.getBanner);

  /**
   * @name 分类
   */
  router.post('/api/sort', controller.index.createSort);
  router.get('/api/sort', controller.index.querySort);
  router.put('/api/sort', controller.index.updateSort);
  router.get('/api/sort/:id', controller.index.findSort);
  router.delete('/api/sort/:id', controller.index.deleteSort);
};
