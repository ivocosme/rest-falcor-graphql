const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Invoice',

    fields: () => ({
        id: { type: GraphQLID },
        date: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLString) },
        totalAmount: { type: new GraphQLNonNull(GraphQLString) },
        invoiceId: { type: new GraphQLNonNull(GraphQLInt) }
    })
});