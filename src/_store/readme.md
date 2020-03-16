// This is a template of vuex module
import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'

const types = createTypes([
    "postSaveStockAlert",
])

const state = {

}

const getters = {
    ...createGetters(types)
}

const actions = {
    // Restful API - const static data
    postSaveStockAlert: async (store) => {
        await requestSync(store, types.postSaveStockAlert, {
            url: 'api2/SaveStockAlert',
        })
    },
}

const mutations = {
    ...createMutations(types)
}

export {
    state,
    getters,
    actions,
    mutations,
}