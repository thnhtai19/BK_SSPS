const TestRouter = require('./TestRouter');
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const PrintRouter = require('./PrintRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/print', PrintRouter);
}

module.exports = routes;