import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql'

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
const ClientInput = new GraphQLInputObjectType({
  name: 'ClientInput',
  description: 'This is Client Input Object',
  fields: () => ({
    id: {
      // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
      type: GraphQLInt,
    },
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tax_code: {
      type: new GraphQLNonNull(GraphQLString),
    },
    invoice_addr: {
      type: new GraphQLNonNull(GraphQLString),
    },
    delivery_addr: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tel: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fax: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
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
          input: {
            type: ClientInput,
          },
        },
        resolve(_, {input}) {
          return db.models.client
            .upsert(
              {
                id: input.id,
                code: input.code,
                name: input.name,
                tax_code: input.tax_code,
                invoice_addr: input.invoice_addr,
                delivery_addr: input.delivery_addr,
                tel: input.tel,
                fax: input.fax,
              }
              // {
              //   where: {
              //     id: input.id,
              //   },
              // }
            )
            .then(() => {
              return db.models.client.findById(input.id)
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
