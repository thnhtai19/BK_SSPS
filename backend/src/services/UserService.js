const db = require('../config/db');


async function getUserById(Id) {
    try{
        const [result, ] = await db.execute('SELECT * FROM Users WHERE id = ?', [Id]);
        return result[0];
    }
    catch(err){
        throw err;
    }
}
module.exports = {getUserById};