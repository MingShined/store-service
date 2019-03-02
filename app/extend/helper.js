'use strict';
const moment = require('moment');

exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

exports.success = ({ ctx, res = null }) => {
  ctx.body = res;
  ctx.status = 200;
};
