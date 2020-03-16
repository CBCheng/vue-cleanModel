import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'


const types = createTypes([
    "getActiveClientList",
])

const state = {
    // runLoading:false
}

const getters = {
    ...createGetters(types),
}

const actions = {
    getActiveClientList: async (store, datas) => {
        const { data, id } = datas;
        store.commit("setLoading", true);
        const response = await requestSync(store, types.getActiveClientList, {
            url: `/Customer/ActiveClientAccountList/${id}`,
            data,
        })
        store.commit("setLoading", false);
        return response
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