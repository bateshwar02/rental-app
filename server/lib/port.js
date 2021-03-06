const envConfig = require('config');

const argv = require('./argv');

// TODO
function getPort() {
    if (envConfig.platform === 'M_SITE') {
        return envConfig.ports[envConfig.domain].m_port;
    }
    return envConfig.ports[envConfig.domain].port;
}

module.exports = parseInt(argv.port || process.env.PORT || getPort(), 10);
