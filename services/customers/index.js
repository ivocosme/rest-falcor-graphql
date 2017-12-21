const app = require('express')();
const Datastore = require('nedb');
const cors = require('cors');
var db = new Datastore();

const customer = {
    customerId: 1, 
    email:'user1@example.com',
    name: 'User 1', 
    address: 'My awesome street, 123',
    extraInfoMobile1: 'Extra Info for Mobile 1',
    extraInfoMobile2: 'Extra Info for Mobile 2',
    extraInfoMobile3: 'Extra Info for Mobile 3',
    extraInfoWeb1: 'Extra Info for Web 1',
    extraInfoWeb2: 'Extra Info for Web 2',
    extraInfoWeb3: 'Extra Info for Web 3',
    invoices: [10000, 10001, 10002]
};

db.insert(customer, function (err, newDoc) {
    if(err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(newDoc));
    }
});

app.use(cors({credentials: true, origin: `http://localhost:${process.env.CLIENT_PORT}`}));
app.get('/:customerId', (req, res) => {
    db.findOne({customerId: parseInt(req.params.customerId) }, { _id: 0 }, function (err, customer) {
        if(err || customer == undefined) {
            console.error(err);
            res.status(404).send();
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(customer);
        }
    });
});

const port = process.env.CUSTOMERS_PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));


