const {createPurchaseOrder, updateStudentPages} = require('../services/PurchaseOrderService');

async function createNewPurchaseOrder(req, res) {
    try {
        if(!req.session.user) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        if(req.session.user.role !== 'student') {
            return res.status(403).json({message: 'Forbidden! You are not a student'});
        }
        const pagesNumber = req.body.pagesNumber;
        const id = req.session.user.id;
        if(!pagesNumber || !id) {
            return res.status(400).json({message: 'Invalid request'});
        }
        let result = await createPurchaseOrder(pagesNumber, id);
        res.json({message: 'Buy success!'});
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
}
async function updatePages(req, res){
    try{
        if(!req.session.user) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        if(req.session.user.role !== 'student') {
            return res.status(403).json({message: 'Forbidden! You are not a student'});
        }
        const pagesNumber = req.body.pagesNumber;
        const id = req.session.user.id;
        if(!pagesNumber || !id) {
            return res.status(400).json({message: 'Invalid request'});
        }
        let result = await updateStudentPages(pagesNumber, id);
        res.json({message: 'Update success!'});
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
}
module.exports = {createNewPurchaseOrder, updatePages};