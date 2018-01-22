'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import _ from 'lodash'


var Op = _sequelize2.default.Op;

// ############################################################################################################## OBJECT
var Client = new _graphql.GraphQLObjectType({
  name: 'Client',
  description: 'This is a Client',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(client) {
          return client.id;
        }
      },
      value: {
        // for to use in q-select --> need to find another way, q-select still got sublabel + stamp
        type: _graphql.GraphQLInt,
        resolve: function resolve(client) {
          return client.id;
        }
      },
      code: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.code;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.name;
        }
      },
      label: {
        // for to use in q-select
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.name;
        }
      },
      tax_code: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.tax_code;
        }
      },
      invoice_addr: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.invoice_addr;
        }
      },
      delivery_addr: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.delivery_addr;
        }
      },
      tel: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.tel;
        }
      },
      fax: {
        type: _graphql.GraphQLString,
        resolve: function resolve(client) {
          return client.fax;
        }
      },
      contacts: {
        type: new _graphql.GraphQLList(Contact),
        resolve: function resolve(client) {
          // ------------------------------------if there's no association
          // return db.models.contact.findAll({
          //   where: {
          //     clientId: {
          //       [Op.eq]: client.id,
          //     },
          //   },
          // })
          // ------------------------------------else we can use auto-generated association func
          return client.getContacts();
        }
      }
    };
  }
});

var Supplier = new _graphql.GraphQLObjectType({
  name: 'Supplier',
  description: 'This is a Supplier',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(supplier) {
          return supplier.id;
        }
      },
      value: {
        // for to use in q-select --> need to find another way, q-select still got sublabel + stamp
        type: _graphql.GraphQLInt,
        resolve: function resolve(supplier) {
          return supplier.id;
        }
      },
      code: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.code;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.name;
        }
      },
      label: {
        // for to use in q-select
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.name;
        }
      },
      tax_code: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.tax_code;
        }
      },
      invoice_addr: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.invoice_addr;
        }
      },
      tel: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.tel;
        }
      },
      fax: {
        type: _graphql.GraphQLString,
        resolve: function resolve(supplier) {
          return supplier.fax;
        }
      },
      contacts: {
        type: new _graphql.GraphQLList(Contact),
        resolve: function resolve(supplier) {
          return supplier.getContacts();
        }
      }
    };
  }
});

var Product = new _graphql.GraphQLObjectType({
  name: 'Product',
  description: 'This is a Product',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(product) {
          return product.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.name;
        }
      },
      brand_name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.brand_name;
        }
      },
      model: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.model;
        }
      },
      specs: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.specs;
        }
      },
      buy: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(product) {
          return product.buy;
        }
      },
      sell: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(product) {
          return product.sell;
        }
      },
      suppliers: {
        type: new _graphql.GraphQLList(Supplier),
        resolve: function resolve(product) {
          return product.getSuppliers();
        }
      },
      docs: {
        type: new _graphql.GraphQLList(Doc),
        resolve: function resolve(product) {
          return product.getDocs();
        }
      },
      // --> for to use in q-select --> need to find another way, q-select still got sublabel + stamp
      value: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(product) {
          return product.id;
        }
      },
      label: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.name;
        }
      },
      sublabel: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.brand_name;
        }
      },
      stamp: {
        type: _graphql.GraphQLString,
        resolve: function resolve(product) {
          return product.model;
        }
      }
    };
  }
});

var Contact = new _graphql.GraphQLObjectType({
  name: 'Contact',
  description: 'This is a Contact',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(contact) {
          return contact.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(contact) {
          return contact.name;
        }
      },
      tel: {
        type: _graphql.GraphQLString,
        resolve: function resolve(contact) {
          return contact.tel;
        }
      },
      email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(contact) {
          return contact.email;
        }
      },
      position: {
        type: _graphql.GraphQLString,
        resolve: function resolve(contact) {
          return contact.position;
        }
      },
      note: {
        type: _graphql.GraphQLString,
        resolve: function resolve(contact) {
          return contact.note;
        }
      },
      clientId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(contact) {
          return contact.clientId;
        }
      },
      supplierId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(contact) {
          return contact.supplierId;
        }
      }
    };
  }
});

var Doc = new _graphql.GraphQLObjectType({
  name: 'Doc',
  description: 'This is a Doc',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(doc) {
          return doc.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(doc) {
          return doc.name;
        }
      },
      link: {
        type: _graphql.GraphQLString,
        resolve: function resolve(doc) {
          return doc.link;
        }
      },
      productId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(doc) {
          return doc.productId;
        }
      }
    };
  }
});

// ######################################################################################################## INPUT OBJECT
var ClientInput = new _graphql.GraphQLInputObjectType({
  name: 'ClientInput',
  description: 'This is Client Input Object',
  fields: function fields() {
    return {
      id: {
        // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
        type: _graphql.GraphQLInt
      },
      code: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      tax_code: {
        type: _graphql.GraphQLString
      },
      invoice_addr: {
        type: _graphql.GraphQLString
      },
      delivery_addr: {
        type: _graphql.GraphQLString
      },
      tel: {
        type: _graphql.GraphQLString
      },
      fax: {
        type: _graphql.GraphQLString
      },
      contacts: {
        type: new _graphql.GraphQLList(ContactInput)
      }
    };
  }
});

var SupplierInput = new _graphql.GraphQLInputObjectType({
  name: 'SupplierInput',
  description: 'This is Supplier Input Object',
  fields: function fields() {
    return {
      id: {
        // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
        type: _graphql.GraphQLInt
      },
      // --- start -> due to the fact that the JSON request send extra props,
      // this is just to make the SupplierInput to be valid
      value: {
        type: _graphql.GraphQLInt
      },
      label: {
        type: _graphql.GraphQLString
      },
      // --- end
      code: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      tax_code: {
        type: _graphql.GraphQLString
      },
      invoice_addr: {
        type: _graphql.GraphQLString
      },
      tel: {
        type: _graphql.GraphQLString
      },
      fax: {
        type: _graphql.GraphQLString
      },
      contacts: {
        type: new _graphql.GraphQLList(ContactInput)
      }
    };
  }
});

var DocInput = new _graphql.GraphQLInputObjectType({
  name: 'DocInput',
  description: 'This is Doc Input Object',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt
      },
      name: {
        type: _graphql.GraphQLString
      },
      link: {
        type: _graphql.GraphQLString
      },
      productId: {
        type: _graphql.GraphQLInt
      }
    };
  }
});

var ProductInput = new _graphql.GraphQLInputObjectType({
  name: 'ProductInput',
  description: 'This is Product Input Object',
  fields: function fields() {
    return {
      id: {
        // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
        type: _graphql.GraphQLInt
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      brand_name: {
        type: _graphql.GraphQLString
      },
      model: {
        type: _graphql.GraphQLString
      },
      specs: {
        type: _graphql.GraphQLString
      },
      buy: {
        type: _graphql.GraphQLInt
      },
      sell: {
        type: _graphql.GraphQLInt
      },
      suppliers: {
        type: new _graphql.GraphQLList(SupplierInput)
      },
      docs: {
        type: new _graphql.GraphQLList(DocInput)
      }
    };
  }
});

var ContactInput = new _graphql.GraphQLInputObjectType({
  name: 'ContactInput',
  description: 'This is Contact Input Object',
  fields: function fields() {
    return {
      id: {
        // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
        type: _graphql.GraphQLInt
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      tel: {
        type: _graphql.GraphQLString
      },
      email: {
        type: _graphql.GraphQLString
      },
      position: {
        type: _graphql.GraphQLString
      },
      note: {
        type: _graphql.GraphQLString
      },
      clientId: {
        type: _graphql.GraphQLInt
      },
      supplierId: {
        type: _graphql.GraphQLInt
      }
    };
  }
});

// ############################################################################################################### QUERY
var Query = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the ROOT Query',
  fields: function fields() {
    return {
      getAllClients: {
        description: 'List all Clients',
        type: new _graphql.GraphQLList(Client),
        args: {
          code: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _db2.default.models.client.findAll({ where: args });
        }
      },
      getAllSuppliers: {
        description: 'List all Supplier',
        type: new _graphql.GraphQLList(Supplier),
        resolve: function resolve() {
          return _db2.default.models.supplier.findAll();
        }
      },
      getAllProducts: {
        description: 'List all Products',
        type: new _graphql.GraphQLList(Product),
        resolve: function resolve() {
          return _db2.default.models.product.findAll();
        }
      },
      getAllContacts: {
        description: 'List all Contacts',
        type: new _graphql.GraphQLList(Contact),
        resolve: function resolve() {
          return _db2.default.models.contact.findAll();
        }
      },
      getAllDocs: {
        description: 'List all Docs',
        type: new _graphql.GraphQLList(Doc),
        resolve: function resolve() {
          return _db2.default.models.doc.findAll();
        }
      }
    };
  }
});

// ############################################################################################################ MUTATION
var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Save/Add/Delete a Client',
  fields: function fields() {
    return {
      saveClient: {
        type: Client,
        args: {
          input: {
            type: ClientInput
          }
        },
        resolve: function resolve(__, _ref) {
          var input = _ref.input;

          return _db2.default.models.client.upsert(input).then(function () {
            // TODO: look for the just created client id -> to update input.id
            return input;
          });
        }
      },
      deleteClient: {
        type: _graphql.GraphQLInt,
        args: {
          input: {
            type: new _graphql.GraphQLList(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(__, _ref2) {
          var input = _ref2.input;

          return _db2.default.models.client.destroy({
            where: {
              id: _defineProperty({}, Op.in, input)
            }
          });
        }
      },
      saveSupplier: {
        type: Supplier,
        args: {
          input: {
            type: SupplierInput
          }
        },
        resolve: function resolve(__, _ref3) {
          var input = _ref3.input;

          return _db2.default.models.supplier.upsert(input).then(function () {
            // TODO: look for the just created supplier id -> to update input.id
            return input;
          });
        }
      },
      deleteSupplier: {
        type: _graphql.GraphQLInt,
        args: {
          input: {
            type: new _graphql.GraphQLList(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(__, _ref4) {
          var input = _ref4.input;

          return _db2.default.models.supplier.destroy({
            where: {
              id: _defineProperty({}, Op.in, input)
            }
          });
        }
      },
      saveProduct: {
        type: Product,
        args: {
          input: {
            type: ProductInput
          }
        },
        resolve: function resolve(__, _ref5) {
          var input = _ref5.input;

          if (!input.id) {
            // create
            return _db2.default.models.product.create(input).then(function (product) {
              product.setSuppliers(input.suppliers.map(function (sup) {
                return sup.id;
              })); // -> no need to check empty before mapping -> able to remove all suppliers
              return product;
            });
          } else {
            // update
            return _db2.default.models.product.upsert(input).then(function () {
              _db2.default.models.product.findAll(input).then(function (pro) {
                pro[0].setSuppliers(input.suppliers.map(function (sup) {
                  return sup.id;
                })); // -> no need to check empty before mapping -> able to remove all suppliers
              });
              return input;
            });
          }
        }
      },
      deleteProduct: {
        type: _graphql.GraphQLInt,
        args: {
          input: {
            type: new _graphql.GraphQLList(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(__, _ref6) {
          var input = _ref6.input;

          return _db2.default.models.product.destroy({
            where: {
              id: _defineProperty({}, Op.in, input)
            }
          });
        }
      },
      saveContact: {
        type: Contact,
        args: {
          input: {
            type: ContactInput
          }
        },
        resolve: function resolve(__, _ref7) {
          var input = _ref7.input;

          return _db2.default.models.contact.upsert(input).then(function () {
            // TODO: look for the just created contact id -> to update input.id
            return input;
          });
        }
      },
      deleteContact: {
        type: _graphql.GraphQLInt,
        args: {
          input: {
            type: new _graphql.GraphQLList(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(__, _ref8) {
          var input = _ref8.input;

          return _db2.default.models.contact.destroy({
            where: {
              id: _defineProperty({}, Op.in, input)
            }
          });
        }
      },
      saveDoc: {
        type: Doc,
        args: {
          input: {
            type: DocInput
          }
        },
        resolve: function resolve(__, _ref9) {
          var input = _ref9.input;

          return _db2.default.models.doc.upsert(input).then(function () {
            // TODO: look for the just created doc id -> to update input.id
            return input;
          });
        }
      },
      deleteDoc: {
        type: _graphql.GraphQLInt,
        args: {
          input: {
            type: new _graphql.GraphQLList(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(__, _ref10) {
          var input = _ref10.input;

          return _db2.default.models.doc.destroy({
            where: {
              id: _defineProperty({}, Op.in, input)
            }
          });
        }
      }
    };
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;