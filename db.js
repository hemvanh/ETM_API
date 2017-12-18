import Sequelize from 'sequelize'
// import _ from 'lodash'
// import Faker from 'faker'

const Op = Sequelize.Op
const Conn = new Sequelize('etm_api', 'etm', 'lollipop', {
  host: 'etm.c0f9gwleomit.ap-southeast-1.rds.amazonaws.com',
  // const Conn = new Sequelize('bb55689_api', 'bb55689_api', 'Lollipop!@#', {
  //   host: '116.193.77.72',
  dialect: 'mysql',
  logging: false,
  operatorsAliases: Op, // use Sequelize.Op
  pool: {
    port: 3306,
    max: 5,
    min: 1,
    accquire: 60000,
    idle: 20000,
  },
})
const Client = Conn.define('client', {
  code: {type: Sequelize.STRING, allowNull: false},
  name: {type: Sequelize.STRING, allowNull: false},
  tax_code: {type: Sequelize.STRING, allowNull: true},
  invoice_addr: {type: Sequelize.STRING, allowNull: true},
  delivery_addr: {type: Sequelize.STRING, allowNull: true},
  tel: {type: Sequelize.STRING, allowNull: true},
  fax: {type: Sequelize.STRING, allowNull: true},
})

Conn.authenticate()

// import mysql from 'mysql'
// var Conn = mysql.createConnection({
//   host: '116.193.77.72',
//   user: 'bb55689_etm',
//   password: 'Lollipop!@#',
//   database: 'bb55689_etmdev',
// })

// Conn.connect()
// Conn.query('SELECT * from clients', function(error, results) {
//   if (error) throw error
//   console.log('The solution is: ', results)
// })

// .then(() => {
//   console.log('Connection has been established successfully.')
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err)
// })
// Conn.sync({force: true}).catch(err => {
//   console.log(err)
// })

// const Supplier = Conn.define('supplier', {
//   code: { type: Sequelize.STRING, allowNull: false },
//   name: { type: Sequelize.STRING, allowNull: false },
//   tax_code: { type: Sequelize.STRING, allowNull: true },
//   tel: { type: Sequelize.STRING, allowNull: true },
//   fax: { type: Sequelize.STRING, allowNull: true },
//   timezone: { type: Sequelize.STRING, allowNull: true },
//   email: { type: Sequelize.STRING, allowNull: true },
//   address: { type: Sequelize.STRING, allowNull: true },
//   is_default_contact: { type: Sequelize.INTEGER, allowNull: true },
//   bankinfo: { type: Sequelize.STRING, allowNull: true },
// })

// const Product = Conn.define('product', {
//   code: { type: Sequelize.STRING, allowNull: false },
//   name: { type: Sequelize.STRING, allowNull: false },
//   brand: { type: Sequelize.STRING, allowNull: true },
//   model: { type: Sequelize.STRING, allowNull: true },
//   unit: { type: Sequelize.STRING, allowNull: true },
//   specs: { type: Sequelize.TEXT, allowNull: true },
//   part_no: { type: Sequelize.STRING, allowNull: true },
//   listing_price: { type: Sequelize.STRING, allowNull: true },
// })

// Client.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return Client.create({
//       code: Faker.name(),
//       name: Faker.company.bsNoun(),
//       tax_code: Faker.company.bs(),
//       invoice_addr: Faker.address.streetAddress(),
//       delivery_addr: Faker.address.streetAddress(),
//       tel: Faker.phone.phoneNumber(),
//       fax: Faker.phone.phoneNumber(),
//     })
//   })
// })

// Relationship
//Supplier.hasMany(Product)

// Data Genaration
// Conn.sync({ force: true })
//   .then(() => {
//     _.times(10, () => {
//       return Supplier.create({
//         code: Faker.random.words(),
//         name: Faker.company.companyName(),
//         tax_code: Faker.company.bs(),
//         tel: Faker.phone.phoneNumber(),
//         fax: Faker.phone.phoneNumber(),
//         timezone: Faker.random.locale(),
//         email: Faker.internet.email(),
//         address: Faker.address.streetAddress(),
//         is_default_contact: Faker.random.boolean(),
//         bankinfo: Faker.address.streetName(),
//       }).then(supplier => {
//         return supplier.createProduct({
//           code: Faker.commerce.product(),
//           name: Faker.commerce.productName(),
//           brand: Faker.commerce.productAdjective(),
//           model: Faker.commerce.department(),
//           unit: Faker.random.word(),
//           specs: Faker.lorem.sentences(),
//           part_no: Faker.random.words(),
//           listing_price: Faker.commerce.price(),
//         })
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err)
//   })

export default Conn
