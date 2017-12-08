import { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import db from './db'
import { arch } from 'os'
import { debug } from 'util'

const Supplier = new GraphQLObjectType({
  name: 'Supplier',
  description: 'This is a Supplier. A Supplier has many Products',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(supplier) {
          return supplier.id
        },
      },
      code: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.code
        },
      },
      name: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.name
        },
      },
      tax_code: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.tax_code
        },
      },
      tel: {
        type: GraphQLString,
        revresolve(supplier) {
          return supplier.tel
        },
      },
      fax: {
        type: GraphQLString,
        revresolve(supplier) {
          return supplier.fax
        },
      },
      timezone: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.timezone
        },
      },
      email: {
        type: GraphQLString,
        resovresolve(supplier) {
          return supplier.email
        },
      },
      address: {
        type: GraphQLString,
        revresolve(supplier) {
          return supplier.address
        },
      },
      is_default_contact: {
        type: GraphQLInt,
        revresolve(supplier) {
          return supplier.is_default_contact
        },
      },
      bankinfo: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.bankinfo
        },
      },
      products: {
        type: new GraphQLList(Product),
        resolve(supplier) {
          return supplier.getProducts() // provided by Sequelize relationship
        },
      },
    }
  },
})

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'This is a Product',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(product) {
          return product.id
        },
      },
      code: {
        type: GraphQLString,
        resolve(product) {
          return product.code
        },
      },
      name: {
        type: GraphQLString,
        resolve(product) {
          return product.name
        },
      },
      brand: {
        type: GraphQLString,
        resolve(product) {
          return product.brand
        },
      },
      model: {
        type: GraphQLString,
        resolve(product) {
          return product.model
        },
      },
      unit: {
        type: GraphQLString,
        resolve(product) {
          return product.unit
        },
      },
      specs: {
        type: GraphQLString,
        resolve(product) {
          return product.specs
        },
      },
      part_no: {
        type: GraphQLString,
        resolve(product) {
          return product.part_no
        },
      },
      listing_price: {
        type: GraphQLString,
        resolve(product) {
          return product.listing_price
        },
      },
    }
  },
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is ROOT Query',
  fields: () => {
    return {
      nhacungcap: {
        description: 'Tim kiem nha cung cap',
        type: new GraphQLList(Supplier),
        resolve(root, args) {
          return db.models.Supplier.findAll({ where: args }) // findAll is a Sequelize promise
        },
      },
      sanpham: {
        description: 'Tim kien san pham',
        type: new GraphQLList(Product),
        resolve(root, args) {
          return db.models.Product.findAll({ where: args })
        },
      },
    }
  },
})

const Schema = new GraphQLSchema({
  query: Query,
})

export default Schema
