const rp = require('request-promise');

module.exports = {
    
    getCustomerById: (customerId) => {
        const customerOptions = {
            uri: `http://localhost:${process.env.CUSTOMERS_PORT}/${customerId}`,
            json: true
        };
        return rp(customerOptions);
    },
    
    getInvoiceById: (invoiceId) => {
        const invoicesOptions = {
            uri: `http://localhost:${process.env.INVOICES_PORT}/${invoiceId}`,
            json: true
        };

        return rp(invoicesOptions);
    }
};