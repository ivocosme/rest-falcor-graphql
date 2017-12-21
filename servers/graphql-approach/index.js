const app = require('express')();
const schema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

app.use(cors({credentials: true, origin: `http://localhost:${process.env.CLIENT_PORT}`}));
app.use('/', (req, res) => {
    graphqlHTTP({
        schema: schema,
        graphiql: false
    })(req, res);
});

const port = process.env.GRAPHQL_PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));