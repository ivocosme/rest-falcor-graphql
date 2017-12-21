const app = require('express')();
const Datastore = require('nedb');
const cors = require('cors');
var db = new Datastore();

const invoices = [
    {invoiceId: 10000, date:'2017-11-10', quantity: 10, totalAmount: 100, customerId: 1},
    {invoiceId: 10001, date:'2017-11-09', quantity: 9, totalAmount: 90, customerId: 1},
    {invoiceId: 10002, date:'2017-11-08', quantity: 8, totalAmount: 80, customerId: 1}
];

db.insert(invoices, function (err, newDocs) {
    if(err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(newDocs));
    }
});

app.use(cors({credentials: true, origin: `http://localhost:${process.env.CLIENT_PORT}`}));
app.get('/:invoiceId', (req, res) => {
    db.findOne({invoiceId: parseInt(req.params.invoiceId)}, { _id: 0 , customerId: 0}, (err, invoice) => {
        if(err || invoice == undefined) {
            res.status(404).send('Not found.');
        } else {
            res.send(invoice);
        }
    });
});

const port = process.env.INVOICES_PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));
