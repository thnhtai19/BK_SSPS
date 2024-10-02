const TestRouter = require('./TestRouter');
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');
const SPSORouter = require('./SPSORouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/SPSO', SPSORouter);
}

module.exports = routes;