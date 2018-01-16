import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql'

// import _ from 'lodash'
import db from './db'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

// ############################################################################################################## OBJECT
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
      value: {
        // for to use in q-select --> need to find another way, q-select still got sublabel + stamp
        type: GraphQLInt,
        resolve(product) {
          return product.id
        },
      },
      label: {
        // for to use in q-select
        type: GraphQLString,
        resolve(product) {
          return product.name
        },
      },
      name: {
        type: GraphQLString,
        resolve(product) {
          return product.name
        },
      },
      brand_name: {
        type: GraphQLString,
        resolve(product) {
          return product.brand_name
        },
      },
      model: {
        type: GraphQLString,
        resolve(product) {
          return product.model
        },
      },
      specs: {
        type: GraphQLString,
        resolve(product) {
          return product.specs
        },
      },
      buy: {
        type: GraphQLInt,
        resolve(product) {
          return product.buy
        },
      },
      sell: {
        type: GraphQLInt,
        resolve(product) {
          return product.sell
        },
      },
      suppliers: {
        type: new GraphQLList(Supplier),
        resolve(product) {
          return product.getSuppliers()
        },
      },
      docs: {
        type: new GraphQLList(Doc),
        resolve(product) {
          return product.getDocs()
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

const Doc = new GraphQLObjectType({
  name: 'Doc',
  description: 'This is a Doc',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(doc) {
          return doc.id
        },
      },
      name: {
        type: GraphQLString,
        resolve(doc) {
          return doc.name
        },
      },
      link: {
        type: GraphQLString,
        resolve(doc) {
          return doc.link
        },
      },
    }
  },
})

// ######################################################################################################## INPUT OBJECT
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
    // --- start -> due to the fact that the JSON request send extra props,
    // this is just to make the SupplierInput to be valid
    value: {
      type: GraphQLInt,
    },
    label: {
      type: GraphQLString,
    },
    // --- end
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

const DocInput = new GraphQLInputObjectType({
  name: 'DocInput',
  description: 'This is Doc Input Object',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    link: {
      type: GraphQLString,
    },
  }),
})

const ProductInput = new GraphQLInputObjectType({
  name: 'ProductInput',
  description: 'This is Product Input Object',
  fields: () => ({
    id: {
      // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
      type: GraphQLInt,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    brand_name: {
      type: GraphQLString,
    },
    model: {
      type: GraphQLString,
    },
    specs: {
      type: GraphQLString,
    },
    buy: {
      type: GraphQLInt,
    },
    sell: {
      type: GraphQLInt,
    },
    suppliers: {
      type: new GraphQLList(SupplierInput),
    },
    docs: {
      type: new GraphQLList(DocInput),
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

// ############################################################################################################### QUERY
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
      getAllProducts: {
        description: 'List all Products',
        type: new GraphQLList(Product),
        resolve() {
          return db.models.product.findAll()
        },
      },
      getAllContacts: {
        description: 'List all Contacts',
        type: new GraphQLList(Contact),
        resolve() {
          return db.models.contact.findAll()
        },
      },
      getAllDocs: {
        description: 'List all Docs',
        type: new GraphQLList(Doc),
        resolve() {
          return db.models.doc.findAll()
        },
      },
    }
  },
})

// ############################################################################################################ MUTATION
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
        resolve(__, {input}) {
          return db.models.client.upsert(input).then(() => {
            // TODO: look for the just created client id -> to update input.id
            return input
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
        resolve(__, {input}) {
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
        resolve(__, {input}) {
          return db.models.supplier.upsert(input).then(() => {
            // TODO: look for the just created supplier id -> to update input.id
            return input
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
        resolve(__, {input}) {
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
        resolve(__, {input}) {
          return db.models.contact.upsert(input).then(() => {
            // TODO: look for the just created contact id -> to update input.id
            return input
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
        resolve(__, {input}) {
          return db.models.contact.destroy({
            where: {
              id: {
                [Op.in]: input,
              },
            },
          })
        },
      },
      saveProduct: {
        type: Product,
        args: {
          input: {
            type: ProductInput,
          },
        },
        resolve(__, {input}) {
          if (!input.id) {
            // create
            return db.models.product.create(input).then(product => {
              product.setSuppliers(input.suppliers.map(sup => sup.id)) // -> no need to check empty before mapping -> able to remove all suppliers
              return product
            })
          } else {
            // update
            return db.models.product.upsert(input).then(() => {
              db.models.product.findAll(input).then(pro => {
                pro[0].setSuppliers(input.suppliers.map(sup => sup.id)) // -> no need to check empty before mapping -> able to remove all suppliers
              })
              return input
            })
          }
        },
      },
      deleteProduct: {
        type: GraphQLInt,
        args: {
          input: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        resolve(__, {input}) {
          return db.models.product.destroy({
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
