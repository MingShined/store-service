'use strict';
module.exports = app => {
  const { router, controller } = app;
  /**
   * @name 用户注册
   */
  router.post('/api/register', controller.user.register);
  /**
   * @name 用户登录
   */
  router.post('/api/login', controller.user.login);
  /**
   * @name 用户列表
   */
  router.get('/api/user', controller.user.query);
  /**
   * @name 完善用户信息
   */
  router.put('/api/user', controller.user.update);
  /**
   * @name 用户登出
   */
  router.get('/api/logout', controller.user.logout);
};
