const config = {
    production: {
        PORT: 7000,
        DB_URI: 'mongodb://localhost:27017/bookTalk',
        SECRET: 'ccbf1092c6052bc3d047772b70b6392bbb347246',
    },
    development: {
        PORT: 3000,
        DB_URI: 'mongodb://localhost:27017/bookTalk',
        SECRET: 'ccbf1092c6052bc3d047772b70b6392bbb347246',
    }
};

module.exports = config[process.env.node_env || 'development'];