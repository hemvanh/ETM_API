import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

const Op = Sequelize.Op
// const Conn = new Sequelize('etm_api', 'etm', 'lollipop', {
//   host: 'etm.c0f9gwleomit.ap-southeast-1.rds.amazonaws.com',
const Conn = new Sequelize('dev_db', 'root', 'lol', {
  host: 'localhost',
  dialect: 'mysql',
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

const Contact = Conn.define('contact', {
  name: {type: Sequelize.STRING, allowNull: false},
  tel: {type: Sequelize.STRING, allowNull: true},
  email: {type: Sequelize.STRING, allowNull: true},
  position: {type: Sequelize.STRING, allowNull: true},
  note: {type: Sequelize.STRING, allowNull: true},
})

const Supplier = Conn.define('supplier', {
  code: {type: Sequelize.STRING, allowNull: false},
  name: {type: Sequelize.STRING, allowNull: false},
  tax_code: {type: Sequelize.STRING, allowNull: true},
  invoice_addr: {type: Sequelize.STRING, allowNull: true},
  tel: {type: Sequelize.STRING, allowNull: true},
  fax: {type: Sequelize.STRING, allowNull: true},
})

const Product = Conn.define('product', {
  name: {type: Sequelize.STRING, allowNull: false},
  brand_name: {type: Sequelize.STRING, allowNull: true},
  model: {type: Sequelize.STRING, allowNull: true},
  specs: {type: Sequelize.TEXT, allowNull: true},
  buy: {type: Sequelize.INTEGER, allowNull: true},
  sell: {type: Sequelize.INTEGER, allowNull: true},
})
const Doc = Conn.define('doc', {
  name: {type: Sequelize.STRING, allowNull: false},
  link: {type: Sequelize.STRING, allowNull: false},
})

Client.hasMany(Contact)
Supplier.hasMany(Contact)
Product.hasMany(Doc)
Product.belongsToMany(Supplier, {through: 'product_supplier'})
Supplier.belongsToMany(Product, {through: 'product_supplier'})

// Demo Data generation
/*
function randArr(upperLimit, amount) {
  var possibleNumbers = _.range(1, upperLimit)
  var shuffled = _.shuffle(possibleNumbers)
  return shuffled.slice(0, amount)
}
Conn.sync({force: true}).then(() => {
  _.times(10, () => {
    return Client.create({
      code: Faker.address.countryCode(),
      name: 'cl_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
      tax_code: Faker.company.bs(),
      invoice_addr: Faker.address.streetAddress(),
      delivery_addr: Faker.address.streetAddress(),
      tel: Faker.phone.phoneNumber(),
      fax: Faker.phone.phoneNumber(),
    }).then(client => {
      _.times(3, () => {
        return client.createContact({
          name: 'ct_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
          tel: Faker.phone.phoneNumber(),
          email: Faker.internet.email(),
          position: Faker.name.firstName(),
          note: Faker.lorem.sentence(),
        })
      })
    })
  })
  _.times(10, () => {
    return Supplier.create({
      code: Faker.address.countryCode(),
      name: 'sup_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
      tax_code: Faker.company.bs(),
      invoice_addr: Faker.address.streetAddress(),
      tel: Faker.phone.phoneNumber(),
      fax: Faker.phone.phoneNumber(),
    }).then(supplier => {
      _.times(2, () => {
        return supplier.createContact({
          name: 'ct_' + Faker.name.firstName() + ' ' + Faker.name.lastName(),
          tel: Faker.phone.phoneNumber(),
          email: Faker.internet.email(),
          position: Faker.name.firstName(),
          note: Faker.lorem.sentence(),
        })
      })
    })
  })
  _.times(10, () => {
    return Product.create({
      name: Faker.commerce.product(),
      brand_name: Faker.commerce.productName(),
      model: Faker.commerce.product(),
      specs: Faker.lorem.paragraphs(),
      buy: Faker.commerce.price(),
      sell: Faker.commerce.price(),
    }).then(product => {
      _.times(2, () => {
        return product.createDoc({
          name: Faker.commerce.productAdjective(),
          link: Faker.image.imageUrl(),
        })
      })
      product.setSuppliers(randArr(10, 3))
    })
  })
})
*/
export default Conn
