const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const NetworkHelper = require('../../../common/network-helper');
const _ = require('lodash');

module.exports = new GraphQLObjectType({
    name: 'Customer',

    fields: () => {
        const InvoiceType = require('./invoice');

        return {
            id: { type: GraphQLID },
            customerId: { type: GraphQLInt },
            email: {type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString },
            address: { type: GraphQLString },
            extraInfoMobile1: { type: GraphQLString },
            extraInfoMobile2: { type: GraphQLString },
            extraInfoMobile3: { type: GraphQLString },
            extraInfoWeb1: { type: GraphQLString },
            extraInfoWeb2: { type: GraphQLString },
            extraInfoWeb3: { type: GraphQLString },
            invoices: {
                type: new GraphQLList(InvoiceType),
                resolve(customer) {
                    let invoicePromises = [];
                    _.forEach(customer.invoices, (invoiceId)=>{
                        invoicePromises.push(NetworkHelper.getInvoiceById(invoiceId));
                    });
                    return Promise.all(invoicePromises)
                        .then((invoices) => {
                            return invoices;
                        });
                }
            }
        };
    }
});