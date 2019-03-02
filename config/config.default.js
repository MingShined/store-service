'use strict';

const os = require('os');
const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544961945990_6105';

  // add your config here
  config.middleware = [ 'errorHandler' ];

  /**
   * @name mongo配置
   */
  config.mongoose = {
    // url: 'mongodb://132.232.199.18:27017/MingShined',
    url: 'mongodb://127.0.0.1:27017/Lemmon',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  /**
   * @name 配置bodyparser
   */
  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };

  config.multipart = {
    mode: 'stream',
    autoFields: false,
    defaultCharset: 'utf8',
    fieldNameSize: 100,
    fieldSize: '100kb',
    fields: 10,
    fileSize: '10mb',
    files: 10,
    fileExtensions: [],
    whitelist: null,
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
      cron: '0 30 4 * * *',
    },
  };

  /**
   * @name csrf
   */
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
