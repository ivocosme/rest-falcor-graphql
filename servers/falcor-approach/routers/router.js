const Router = require('falcor-router');
const NetworkHelper = require('../../common/network-helper');
const _ = require('lodash');
const Promise = require('bluebird');

class FalcorRouter extends
    Router.createClass([
        {   route: 'customer["customerId","email","name","address","extraInfoWeb1","extraInfoWeb2","extraInfoWeb3","extraInfoMobile1","extraInfoMobile2","extraInfoMobile3"]',
            get: function(pathSet) {
                return NetworkHelper.getCustomerById(this.customerId)
                    .then(function(customer) {
                        return pathSet[1].map((key) => {
                            return { path: ['customer', key], value: customer[key] };
                        });
                    });
            }
        },
        {   route: 'customer["invoices"]',
            get: function() {
                return NetworkHelper.getCustomerById(this.customerId)
                    .then(function(customer) {
                        var invoicePromises = [];
                        _.forEach(customer.invoices, (invoiceId)=>{
                            invoicePromises.push(NetworkHelper.getInvoiceById(invoiceId));
                        });
                        return Promise.all(invoicePromises)
                            .then((invoices) => {
                                return { path: ['customer', 'invoices'], value: { $type: 'atom', value: invoices }};
                            });
                    });
            }
        }   
    ]) {

    constructor(customerId) {
        super();
        this.customerId = customerId;
    }
}

module.exports = FalcorRouter;