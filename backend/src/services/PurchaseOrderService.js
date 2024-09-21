const db = require('../config/db');
async function createPurchaseOrder(pages, id){
    try{
        const day = new Date();
        const CurrentTime = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' ' + day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
        const [result, ] = await db.execute('INSERT INTO purchase_order (purchaseTime, Page, StudentId) VALUES (?, ?, ?)', [CurrentTime, pages, id]);
        return result;
    }
    catch(err){
        throw err;
    }
}
async function updateStudentPages(pagesNumber, id){
    try{
        const [result, ] = await db.execute('UPDATE users SET Page = Page + ? WHERE id = ?', [pagesNumber, id]);
        return result;
    }
    catch(err){
        throw err;
    }
}

module.exports = {createPurchaseOrder, updateStudentPages};