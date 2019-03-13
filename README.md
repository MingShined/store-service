# y



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


> 数据库设计

1.轮播图表(banner)
```
  imgUrl: { type: String }
```

2.商品分类表(sort)
```
    imgUrl: { type: String },
    name: { type: String },
```

3.商品表(good)
```
    imgUrl: { type: String },
    name: { type: String },
    price: { type: Number },
    sort: { type: String },
    bannerList: { type: mongoose.Schema.Types.Mixed },
    details: { type: String },
    gmtCreate: { type: String },
    status: { type: Number },
    hot: { type: Number },
    size: { type: mongoose.Schema.Types.Mixed },
```

4.购物车表(shopcart)
```
    userInfo: { type: mongoose.Schema.Types.Mixed },
    goodInfo: { type: mongoose.Schema.Types.Mixed },
```

5.用户表(user)
```
    username: {
      type: String,
      default: `淘衣用户${new Date().getTime()}`,
    },
    password: { type: String, required: true },
    realName: { type: String, default: '' },
    phone: { type: Number, unique: true, required: true, default: null },
    address: { type: String, default: '' },
    gmtModify: { type: Date, default: Date.now },
```

6.订单表(order)
```
    userInfo: { type: mongoose.Schema.Types.Mixed },
    orderInfo: { type: mongoose.Schema.Types.Mixed },
    gmtCreate: { type: Date, default: Date.now },
```