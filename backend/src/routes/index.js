const TestRouter = require('./TestRouter');
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const PrintRouter = require('./PrintRouter');
const SPSORouter = require('./SPSORouter');
const BuyRouter = require('./BuyRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/print', PrintRouter);
    app.use('/spso', SPSORouter);
    app.use('/buy', BuyRouter);
}

module.exports = routes;