// This is a template of vuex module
import { createTypes, createGetters, createMutations } from '@/_store/_vuexTool.js';
import adminRequest from '@/_store/_adminApi.js'

const types = createTypes([
    "getOptions",
    "getOptionById",
])

const state = {

}

const getters = {
    ...createGetters(types)
}

const actions = {
    getOptions: async (store) => {
        store.commit('setLoading', true);
        const reponse = await adminRequest(types.getOptions, {
            url: '/v1/Options',
        })
        store.commit('setLoading', false);
        return reponse
    },
    getOptionById: async (store, OptID) => {
        store.commit('setLoading', true);
        const reponse = await adminRequest(types.getOptionById, {
            url: `/v1/Options/${OptID}`,
        })
        store.commit('setLoading', false);
        return reponse
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