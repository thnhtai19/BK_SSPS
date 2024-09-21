const {getUserById} = require('../services/UserService');

async function getUserInforById(req, res) {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const id = req.session.user.id;
        if (!id) {
            return res.status(400).json({ message: 'Invalid request' });
        }
        let result = await getUserById(id);
        delete result.password;
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {getUserInforById};