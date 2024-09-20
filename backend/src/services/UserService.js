const db = require('../config/db');

async function getStudentById(Id) {
    try{
        const [result, ] = await db.execute('SELECT * FROM Student WHERE StudentId = ?', [Id]);
        return result[0];
    }
    catch(err){
        throw err;
    }
}
async function getAdminById(Id) {
    try{
        const [result, ] = await db.execute('SELECT * FROM Admin WHERE AdminID = ?', [Id]);
        return result[0];
    }
    catch(err){
        throw err;
    }
}
module.exports = {getStudentById, getAdminById};