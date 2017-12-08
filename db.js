import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

const Conn = new Sequelize('etm_api', 'etm', 'lollipop', {
  host: 'etm.c0f9gwleomit.ap-southeast-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    port: 3306,
    max: 5,
    min: 0,
    accquire: 60000,
    idle: 20000,
  },
})

const Supplier = Conn.define('Supplier', {
  //id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  tax_code: { type: Sequelize.STRING, allowNull: true },
  tel: { type: Sequelize.STRING, allowNull: true },
  fax: { type: Sequelize.STRING, allowNull: true },
  timezone: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  address: { type: Sequelize.STRING, allowNull: true },
  is_default_contact: { type: Sequelize.INTEGER, allowNull: true },
  bankinfo: { type: Sequelize.STRING, allowNull: true },
})

const Product = Conn.define('Product', {
  //id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  brand: { type: Sequelize.STRING, allowNull: true },
  model: { type: Sequelize.STRING, allowNull: true },
  unit: { type: Sequelize.STRING, allowNull: true },
  specs: { type: Sequelize.TEXT, allowNull: true },
  part_no: { type: Sequelize.STRING, allowNull: true },
  listing_price: { type: Sequelize.STRING, allowNull: true },
})

// Relationship
Supplier.hasMany(Product)

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