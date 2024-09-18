const TestRouter = require('./TestRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
}

module.exports = routes;