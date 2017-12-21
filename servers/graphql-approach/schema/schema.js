// Import type helpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const CustomerType = require('./types/customer');
const NetworkHelper = require('../../common/network-helper');

const RootQueryType = new GraphQLObjectType({
    name: 'RootType',

    fields: {
        customer: {
            type: CustomerType,
            description: 'The current customer identified by its Id',
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (obj, args) => {
                return NetworkHelper.getCustomerById(args.id)
                    .then(function(customer) {
                        return customer;
                    });
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = schema;