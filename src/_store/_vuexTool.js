import Vue from 'vue'
/**
 * 只是把第一個字轉成小寫
 * @param {*} string 
 */
function uncaptalize(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * 整套Vuex+Api的核心
 * @param {String[]} types 
 */
export const createTypes = (types) => {
    const typeGroup = {}
    types.forEach(typeString => {
        typeGroup[typeString] = typeString
    })
    return typeGroup
}

/**
 * @param {Object.<typeName:String, typeValue:String>} typeGroup 
 */
export const createGetters = (typeGroup) => {
    const getters = {}
    for (let type in typeGroup) {
        const replacedType = type.replace(/get|post|put|delete/, "");
        const camelCaseType = uncaptalize(replacedType);
        const camelCaseTypeRes = camelCaseType + "Res";
        getters[camelCaseTypeRes] = (state) => {
            return state[camelCaseTypeRes];
        };
    }
    return getters
}

/**
 * @param {Object.<typeName:String, typeValue:String>}} typeGroup 
 */
export const createMutations = (typeGroup) => {
    const mutations = {}
    for (let type in typeGroup) {
        const replacedType = type.replace(/get|post|put|delete/, "");
        const mutationName = "set" + replacedType + "Res";
        const camelCaseType = uncaptalize(replacedType);
        const attributeName = camelCaseType + "Res";
        mutations[mutationName] = (state, payload) => {
            Vue.set(state, attributeName, payload);
        };
    }
    return mutations
}