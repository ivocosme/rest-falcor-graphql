const falcorExpress = require('falcor-express');
const cors = require('cors');
const app = require('express')();
const BodyParser = require('body-parser');
const FalcorRouter = require('./routers/router');

app.use(BodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: `http://localhost:${process.env.CLIENT_PORT}`}));

app.use('/model.json', falcorExpress.dataSourceRoute((req) => {
    return new FalcorRouter(req.query.customer);
}));

const port = process.env.FALCOR_PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));