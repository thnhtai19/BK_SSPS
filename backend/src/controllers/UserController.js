const {getStudentById, getAdminById} = require('../services/UserService');

async function getUserInforById(req, res, next) {
    try{
        const id = req.session.user.id;
        const role = req.session.user.role;
        if(!id || !role) {
            return res.status(400).json({message: 'Invalid request'});
        }
        let result;
        if(role === 'admin'){
            result = await getAdminById(id);
        }
        else {
            result = await getStudentById(id);
        }
        res.json(result);
    }
    catch(err){
        next(err);
    }
}

module.exports = {getUserInforById};