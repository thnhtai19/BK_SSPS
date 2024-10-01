const TestRouter = require('./TestRouter');
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const PrintRouter = require('./PrintRouter');
const SPSORouter = require('./SPSORouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/print', PrintRouter);
    app.use('/spso', SPSORouter);
}

module.exports = routes;