import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList} from 'graphql'

import db from './db'

const Client = new GraphQLObjectType({
  name: 'Client',
  description: 'This is a Client',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(client) {
          return client.id
        },
      },
      code: {
        type: GraphQLString,
        resolve(client) {
          return client.code
        },
      },
      name: {
        type: GraphQLString,
        resolve(client) {
          return client.name
        },
      },
      tax_code: {
        type: GraphQLString,
        resolve(client) {
          return client.tax_code
        },
      },
      invoice_addr: {
        type: GraphQLString,
        resolve(client) {
          return client.invoice_addr
        },
      },
      delivery_addr: {
        type: GraphQLString,
        resolve(client) {
          return client.delivery_addr
        },
      },
      tel: {
        type: GraphQLString,
        resolve(client) {
          return client.tel
        },
      },
      fax: {
        type: GraphQLString,
        resolve(client) {
          return client.fax
        },
      },
    }
  },
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the ROOT Query',
  fields: () => {
    return {
      getAllClients: {
        description: 'List all Clients',
        type: new GraphQLList(Client),
        resolve(root, args) {
          return db.models.client.findAll({where: args})
        },
      },
    }
  },
})

const Schema = new GraphQLSchema({
  query: Query,
})

export default Schema
