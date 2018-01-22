'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;
// const Conn = new Sequelize('etm_api', 'etm', 'lollipop', {
//   host: 'etm.c0f9gwleomit.ap-southeast-1.rds.amazonaws.com',
// const Conn = new Sequelize('dev_db', 'root', 'lol', {
//   host: 'localhost',
var Conn = new _sequelize2.default('heroku_549e0e0a0b2b3cc', 'b4997dce2b3106', '96d88204', {
  host: 'us-cdbr-iron-east-05.cleardb.net',
  dialect: 'mysql',
  operatorsAliases: Op, // use Sequelize.Op
  pool: {
    port: 3306,
    max: 5,
    min: 1,
    accquire: 60000,
    idle: 20000
  }
});

var Client = Conn.define('client', {
  code: { type: _sequelize2.default.STRING, allowNull: false },
  name: { type: _sequelize2.default.STRING, allowNull: false },
  tax_code: { type: _sequelize2.default.STRING, allowNull: true },
  invoice_addr: { type: _sequelize2.default.STRING, allowNull: true },
  delivery_addr: { type: _sequelize2.default.STRING, allowNull: true },
  tel: { type: _sequelize2.default.STRING, allowNull: true },
  fax: { type: _sequelize2.default.STRING, allowNull: true }
});

var Contact = Conn.define('contact', {
  name: { type: _sequelize2.default.STRING, allowNull: false },
  tel: { type: _sequelize2.default.STRING, allowNull: true },
  email: { type: _sequelize2.default.STRING, allowNull: true },
  position: { type: _sequelize2.default.STRING, allowNull: true },
  note: { type: _sequelize2.default.STRING, allowNull: true }
});

var Supplier = Conn.define('supplier', {
  code: { type: _sequelize2.default.STRING, allowNull: false },
  name: { type: _sequelize2.default.STRING, allowNull: false },
  tax_code: { type: _sequelize2.default.STRING, allowNull: true },
  invoice_addr: { type: _sequelize2.default.STRING, allowNull: true },
  tel: { type: _sequelize2.default.STRING, allowNull: true },
  fax: { type: _sequelize2.default.STRING, allowNull: true }
});

var Product = Conn.define('product', {
  name: { type: _sequelize2.default.STRING, allowNull: false },
  brand_name: { type: _sequelize2.default.STRING, allowNull: true },
  model: { type: _sequelize2.default.STRING, allowNull: true },
  specs: { type: _sequelize2.default.TEXT, allowNull: true },
  buy: { type: _sequelize2.default.INTEGER, allowNull: true },
  sell: { type: _sequelize2.default.INTEGER, allowNull: true }
});
var Doc = Conn.define('doc', {
  name: { type: _sequelize2.default.STRING, allowNull: false },
  link: { type: _sequelize2.default.STRING, allowNull: false }
});

Client.hasMany(Contact);
Supplier.hasMany(Contact);
Product.hasMany(Doc);
Product.belongsToMany(Supplier, { through: 'product_supplier' });
Supplier.belongsToMany(Product, { through: 'product_supplier' });

// ###############################################################################################  Demo Data generation
// import _ from 'lodash'
// import Faker from 'faker'
// function randArr(upperLimit, amount) {
//   var possibleNumbers = _.range(1, upperLimit)
//   var shuffled = _.shuffle(possibleNumbers)
//   return shuffled.slice(0, amount)
// }
// Conn.sync({force: true}).then(() => {
//   _.times(10, () => {
//     return Client.create({
//       code: Faker.address.countryCode(),
//       name: 'cl_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
//       tax_code: Faker.company.bs(),
//       invoice_addr: Faker.address.streetAddress(),
//       delivery_addr: Faker.address.streetAddress(),
//       tel: Faker.phone.phoneNumber(),
//       fax: Faker.phone.phoneNumber(),
//     }).then(client => {
//       _.times(3, () => {
//         return client.createContact({
//           name: 'ct_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
//           tel: Faker.phone.phoneNumber(),
//           email: Faker.internet.email(),
//           position: Faker.name.firstName(),
//           note: Faker.lorem.sentence(),
//         })
//       })
//     })
//   })
//   _.times(10, () => {
//     return Supplier.create({
//       code: Faker.address.countryCode(),
//       name: 'sup_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
//       tax_code: Faker.company.bs(),
//       invoice_addr: Faker.address.streetAddress(),
//       tel: Faker.phone.phoneNumber(),
//       fax: Faker.phone.phoneNumber(),
//     }).then(supplier => {
//       _.times(2, () => {
//         return supplier.createContact({
//           name: 'ct_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
//           tel: Faker.phone.phoneNumber(),
//           email: Faker.internet.email(),
//           position: Faker.name.firstName(),
//           note: Faker.lorem.sentence(),
//         })
//       })
//     })
//   })
//   _.times(10, () => {
//     return Product.create({
//       name: Faker.commerce.product(),
//       brand_name: Faker.commerce.productName(),
//       model: Faker.commerce.product(),
//       specs: Faker.lorem.paragraphs(),
//       buy: Faker.commerce.price(),
//       sell: Faker.commerce.price(),
//     }).then(product => {
//       _.times(2, () => {
//         return product.createDoc({
//           name: Faker.commerce.productAdjective(),
//           link: Faker.image.imageUrl(),
//         })
//       })
//       product.setSuppliers(randArr(10, 3))
//     })
//   })
// })

exports.default = Conn;