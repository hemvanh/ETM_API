import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

const Conn = new Sequelize('bb55689_etmlive', 'bb55689_etm', 'Lollipop!@#', {
  host: '116.193.77.72',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    //accquire: 30000,
    idle: 1,
    
  },
})

const Supplier = Conn.define('Supplier', {
  supplier_id: { type: Sequelize.INTEGER, allowNull: false },
  supplier_code: { type: Sequelize.STRING, allowNull: false },
  supplier_name: { type: Sequelize.STRING, allowNull: false },
  supplier_tax_code: { type: Sequelize.STRING, allowNull: true },
  supplier_tel: { type: Sequelize.STRING, allowNull: true },
  supplier_fax: { type: Sequelize.STRING, allowNull: true },
  supplier_timezone: { type: Sequelize.STRING, allowNull: true },
  supplier_email: { type: Sequelize.STRING, allowNull: true },
  supplier_address: { type: Sequelize.STRING, allowNull: true },
  is_supplier_default_contact: { type: Sequelize.INTEGER, allowNull: true },
  supplier_bankinfo: { type: Sequelize.STRING, allowNull: true },
})

const Product = Conn.define('Product', {
  product_id: { type: Sequelize.INTEGER, allowNull: false },
  product_code: { type: Sequelize.STRING, allowNull: false },
  product_name: { type: Sequelize.STRING, allowNull: false },
  product_branch: { type: Sequelize.STRING, allowNull: true },
  product_model: { type: Sequelize.STRING, allowNull: true },
  product_unit: { type: Sequelize.STRING, allowNull: true },
  product_specs: { type: Sequelize.TEXT, allowNull: true },
  product_part_no: { type: Sequelize.STRING, allowNull: true },
  listing_price: { type: Sequelize.STRING, allowNull: true },
})

Supplier.hasMany(Product)

Conn.sync({ force: true }).then(() => {
  _.times(10, () => {
    return Supplier.create({
      supplier_code: Faker.name.lastName(),
      supplier_name: Faker.name.firstName(),
      supplier_email: Faker.internet.email(),
    })
  })
})

export default Conn
