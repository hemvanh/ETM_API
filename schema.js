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
  name: 'RootQuery',
  description: 'This is the ROOT Query',
  fields: () => {
    return {
      getAllClients: {
        description: 'List all Clients',
        type: new GraphQLList(Client),
        args: {
          code: {type: GraphQLString},
        },
        resolve(root, args) {
          return db.models.client.findAll({where: args})
        },
      },
    }
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Saving the Client',
  fields() {
    return {
      saveClient: {
        type: Client,
        args: {
          id: {type: GraphQLInt},
          code: {type: GraphQLString},
        },
        resolve(_, args) {
          return db.models.client
            .update(
              {
                code: args.code,
                // name: args.name,
                // tax_code: args.tax_code,
                // invoice_addr: args.invoice_addr,
                // delivery_addr: args.delivery_addr,
                // tel: args.tel,
                // fax: args.fax,
              },
              {
                where: {
                  id: args.id,
                },
              }
            )
            .then(res => {
              console.log(res[1])
              //return res[1]
            })
        },
      },
    }
  },
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema
