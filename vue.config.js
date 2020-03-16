const formatYYYYMMDD = (taiwanDateString, divide = '-') => {
    const taiwnDateInstance = new Date(taiwanDateString);
    const YY = taiwnDateInstance.getFullYear()
    const month = taiwnDateInstance.getMonth() + 1
    let MM = month;
    if (month <= 9) {
        MM = `0${month}`
    }
    const date = taiwnDateInstance.getDate()
    let DD = date;
    if (date <= 9) {
        DD = `0${date}`
    }
    return taiwnDateInstance
}

const webpack = require('webpack');
const plugins = [
    // Make built date as version
    new webpack.DefinePlugin({
        'VERSION_FROM_WEBPACK': JSON.stringify(formatYYYYMMDD(new Date())),
        "BABEL_ENV": process.env.BABEL_ENV
    }),
];

module.exports = {
    configureWebpack: config => {
        if (isProduction) {
            config.externals = {
                'vue': 'Vue',
            }
        }
    },
    lintOnSave: false,
    runtimeCompiler: true,
    configureWebpack: {
        plugins,
        output: {
            filename: '[name].[hash:8].js'
        },
    },
}
