const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const { resolve } = require('path');

const PropyMiddleware = require('./propyMiddleware');
const InitHeadersMiddleware = require('./initHeadersMiddleware');

function createWebpackMiddleware(compiler, publicPath) {
    return webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath,
        silent: true,
        stats: 'errors-only',
        serverSideRender: true,
        index: '',
    });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use('/', express.static(resolve(process.cwd(), 'client')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(PropyMiddleware);
    app.use(InitHeadersMiddleware);

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, data) => {
            if (err) {
                res.sendStatus(404);
                return;
            }
            let file = data.toString();
            file = file.replace(/%%initialState%%/g, JSON.stringify(res.getProps()));
            res.send(file);
        });
    });
};
