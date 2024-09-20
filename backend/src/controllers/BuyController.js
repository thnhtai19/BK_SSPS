const {createPurchaseOrder, addStudentPages, updateBalance} = require('../services/PurchaseOrderService');
async function BuyPages(req, res, next) {
    try{
        const id = req.session.user.id;
        const {price, pagecount} = req.body;
        if(!id || !price || !pagecount) {
            return res.status(400).json({message: 'Invalid request'});
        }
        await createPurchaseOrder(id, price, pagecount);
        await updateBalance(pagecount, id);
        await addStudentPages(id);
    }
    catch(err){
        next(err);
    }
}
module.exports = {BuyPages};