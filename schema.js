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
import Sequelize from 'sequelize'
const Op = Sequelize.Op

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
      value: {
        // for to use in q-select --> need to find another way, q-select still got sublabel + stamp
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
      label: {
        // for to use in q-select
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
      contacts: {
        type: new GraphQLList(Contact),
        resolve(client) {
          // ------------------------------------if there's no association
          // return db.models.contact.findAll({
          //   where: {
          //     clientId: {
          //       [Op.eq]: client.id,
          //     },
          //   },
          // })
          // ------------------------------------else we can use auto-generated association func
          return client.getContacts()
        },
      },
    }
  },
})

const Supplier = new GraphQLObjectType({
  name: 'Supplier',
  description: 'This is a Supplier',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(supplier) {
          return supplier.id
        },
      },
      value: {
        // for to use in q-select --> need to find another way, q-select still got sublabel + stamp
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
      label: {
        // for to use in q-select
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
      invoice_addr: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.invoice_addr
        },
      },
      tel: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.tel
        },
      },
      fax: {
        type: GraphQLString,
        resolve(supplier) {
          return supplier.fax
        },
      },
      contacts: {
        type: new GraphQLList(Contact),
        resolve(supplier) {
          return supplier.getContacts()
        },
      },
    }
  },
})

const Contact = new GraphQLObjectType({
  name: 'Contact',
  description: 'This is a Contact',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(contact) {
          return contact.id
        },
      },
      name: {
        type: GraphQLString,
        resolve(contact) {
          return contact.name
        },
      },
      tel: {
        type: GraphQLString,
        resolve(contact) {
          return contact.tel
        },
      },
      email: {
        type: GraphQLString,
        resolve(contact) {
          return contact.email
        },
      },
      position: {
        type: GraphQLString,
        resolve(contact) {
          return contact.position
        },
      },
      note: {
        type: GraphQLString,
        resolve(contact) {
          return contact.note
        },
      },
      clientId: {
        type: GraphQLInt,
        resolve(contact) {
          return contact.clientId
        },
      },
      supplierId: {
        type: GraphQLInt,
        resolve(contact) {
          return contact.supplierId
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
      type: GraphQLString,
    },
    invoice_addr: {
      type: GraphQLString,
    },
    delivery_addr: {
      type: GraphQLString,
    },
    tel: {
      type: GraphQLString,
    },
    fax: {
      type: GraphQLString,
    },
    contacts: {
      type: new GraphQLList(ContactInput),
    },
  }),
})

const SupplierInput = new GraphQLInputObjectType({
  name: 'SupplierInput',
  description: 'This is Supplier Input Object',
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
      type: GraphQLString,
    },
    invoice_addr: {
      type: GraphQLString,
    },
    tel: {
      type: GraphQLString,
    },
    fax: {
      type: GraphQLString,
    },
    contacts: {
      type: new GraphQLList(ContactInput),
    },
  }),
})

const ContactInput = new GraphQLInputObjectType({
  name: 'ContactInput',
  description: 'This is Contact Input Object',
  fields: () => ({
    id: {
      // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
      type: GraphQLInt,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tel: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    position: {
      type: GraphQLString,
    },
    note: {
      type: GraphQLString,
    },
    clientId: {
      type: GraphQLInt,
    },
    supplierId: {
      type: GraphQLInt,
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
      getAllSuppliers: {
        description: 'List all Supplier',
        type: new GraphQLList(Supplier),
        resolve() {
          return db.models.supplier.findAll()
        },
      },
      getAllContacts: {
        description: 'List all Contacts',
        type: new GraphQLList(Contact),
        resolve() {
          return db.models.contact.findAll()
        },
      },
    }
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Save/Add/Delete a Client',
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
            .upsert({
              id: input.id, // ----> if null then insert, else update
              code: input.code,
              name: input.name,
              tax_code: input.tax_code,
              invoice_addr: input.invoice_addr,
              delivery_addr: input.delivery_addr,
              tel: input.tel,
              fax: input.fax,
            })
            .then(() => {
              return db.models.client.findById(input.id)
            })
        },
      },
      deleteClient: {
        type: GraphQLInt,
        args: {
          input: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        resolve(_, {input}) {
          return db.models.client.destroy({
            where: {
              id: {
                [Op.in]: input,
              },
            },
          })
        },
      },
      saveSupplier: {
        type: Supplier,
        args: {
          input: {
            type: SupplierInput,
          },
        },
        resolve(_, {input}) {
          return db.models.supplier
            .upsert({
              id: input.id, // ----> if null then insert, else update
              code: input.code,
              name: input.name,
              tax_code: input.tax_code,
              invoice_addr: input.invoice_addr,
              tel: input.tel,
              fax: input.fax,
            })
            .then(() => {
              return db.models.supplier.findById(input.id)
            })
        },
      },
      deleteSupplier: {
        type: GraphQLInt,
        args: {
          input: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        resolve(_, {input}) {
          return db.models.supplier.destroy({
            where: {
              id: {
                [Op.in]: input,
              },
            },
          })
        },
      },
      saveContact: {
        type: Contact,
        args: {
          input: {
            type: ContactInput,
          },
        },
        resolve(_, {input}) {
          return db.models.contact
            .upsert({
              id: input.id, // ----> if null then insert, else update
              name: input.name,
              tel: input.tel,
              email: input.email,
              position: input.position,
              note: input.note,
              clientId: input.clientId,
              supplierId: input.supplierId,
            })
            .then(() => {
              return db.models.contact.findById(input.id)
            })
        },
      },
      deleteContact: {
        type: GraphQLInt,
        args: {
          input: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        resolve(_, {input}) {
          return db.models.contact.destroy({
            where: {
              id: {
                [Op.in]: input,
              },
            },
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
