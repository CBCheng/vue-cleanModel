const state = {
    runLoading: false,
}

const getters = {
    loadingRes: function (state) {
        return state.runLoading
    },
}

const actions = {
    toggleLoading: (store, stateValue) => {
        store.commit('setLoading', stateValue)
    },
}

const mutations = {
    setLoading: (state, stateValue) => {
        state.runLoading = stateValue;
    },
}

export {
    state,
    getters,
    actions,
    mutations,
}