const PayOS = require('@payos/node');
const db = require('../config/db');
const PurchaseOrderService = require('./PurchaseOrderService')

const payos = new PayOS(
    '6efedd32-ab81-4896-998b-8cf32fcbc48c', 
    '0b9e71d1-0ac5-4f61-adaf-0dfbe23566ec', 
    '9c53b383a1af1274a489b4b2f051a2afded703482e06f1c98c52d492086c8a7a'
);

class PaymentService {
    createPayment = async (info) => {
        const { 
            orderCode, amount, description, 
            buyerName, buyerEmail, cancelUrl, returnUrl 
        } = info;
        const expiredAt = Math.floor(Date.now() / 1000) + 15 * 60;
        const [rows] = await db.execute(`SELECT gia FROM he_thong LIMIT 1`);
        let gia = 0;
        if (rows.length > 0) {
            gia = rows[0].gia;
        }
        const data = {
            orderCode,
            amount: amount * gia,
            description,
            buyerName,
            buyerEmail,
            cancelUrl,
            returnUrl,
            expiredAt
        };

        return new Promise((resolve, reject) => {
            payos.createPaymentLink(data)
                .then(response => {
                    console.log(response)
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getInfoPayment(id){
        return new Promise( async(resolve, reject) => {
            await payos.getPaymentLinkInformation(id) 
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = new PaymentService();