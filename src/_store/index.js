import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// Fetch sibling files
const requireModule = require.context('.', false, /\.js$/)
let modules = {}
requireModule.keys().forEach(fileName => {
    // Don't register this file as a Vuex module
    if (fileName === './index.js' || fileName === './_vuexApi.js' || fileName === './_vuexTool.js') {
        return;
    }
    const moduleName = fileName.replace(/(\.\/|\.js)/g, "")
    modules[moduleName] = requireModule(fileName)
})
// Initialize Vuex
const debug = process.env.NODE_ENV !== "production"
export default new Vuex.Store({
    modules,
    strict: debug,
    // plugins: debug ? [createLogger()] : []
})