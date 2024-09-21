const TestRouter = require('./TestRouter');
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const BuyRouter = require('./BuyRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/buy', BuyRouter);
}

module.exports = routes;