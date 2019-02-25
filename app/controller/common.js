'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class CommonController extends Controller {
  async upload() {
    const stream = await this.ctx.getFileStream();
    const filename = Date.now() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/images', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = 'http://127.0.1:7001/public/images/' + filename;
  }
  async allowJumpDomain() {
    const { request, response, next } = this;
    request.header('Access-Control-Allow-Origin', '*');
    request.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    );
    request.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    if (response.method === 'OPTIONS') {
      request.send(200);
    } else {
      next();
    }
  }
}

module.exports = CommonController;
