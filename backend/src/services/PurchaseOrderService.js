const db = require('../config/db');
async function createPurchaseOrder(StudentID, TotalPrice, PageCount){
    try{
        const day = new Date();
        const CurrentTime = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' ' + day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
        const [result, ] = await db.execute('INSERT INTO purchase_order (StudentID, price, time, pages) VALUES (?, ?, ?, ?)', [StudentID, TotalPrice, CurrentTime, PageCount]);
        return result;
    }
    catch(err){
        throw err;
    }
}
async function addStudentPages(Id){
    try{
        const [result, ] = await db.execute('UPDATE Student SET pages = pages + 1 WHERE StudentID = ?', [Id]);
        return result;
    }
    catch(err){
        throw err;
    }
}
async function updateBalance(balance, id){
    try{
        const [result, ] = await db.execute('UPDATE Student SET balance = ? WHERE StudentID = ?', [balance, id]);
        return result;
    }
    catch(err){
        throw err;
    }
}
module.exports = {createPurchaseOrder, addStudentPages, updateBalance};