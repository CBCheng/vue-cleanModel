import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
const globalVue = new Vue({});
const baseURL = `${process.env.VUE_APP_BASE_URL}`
axios.defaults.baseURL = baseURL
export default async function requestSync({ commit }, type, options) {
    /**
     * Extract Type
     * before replace: type == 'post'SaveStockAlert
     * after replace: type == ''SaveStockAlert
     * httpMethod == post
     */
    let method = 'post'
    const replacedType = type.replace(/get|post|put|delete/, (httpMethod) => {
        method = httpMethod
        return ""
    })
    /**
     * Build up axios config
     * replacedType == SaveStockAlert
     */
    const { url, data, params, headers } = options
    const dataCopy = JSON.parse(JSON.stringify(data))



    let dateTime = new Date();
    const axiosConfig = {
        url,
        method,
        params: params ? params : {},
        data: dataCopy,
        headers
    }
    /**
     * Send request
     */
    let axiosResponse = null
    try {
        axiosResponse = await axios(axiosConfig)
    } catch (error) {
        axiosResponse = error.response
        /**
         * @type {config, data, headers, request, status, statusText} axiosResponse
         */
        const { data } = axiosResponse
        /**
         * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
         */
        const sswResponse = data
        const { IsSuccessful, Message, ResultCode } = sswResponse
        if (IsSuccessful) {
            return sswResponse
        } else {
            // sessionStorage.clear();
            globalVue.$msgBox.showMsgBox({
                content: JSON.parse(sswResponse),
                BtnText1: "確認",
                isShowBtn1: true,
                titleClass: "title-1",
                fn1: () => {
                    router.push('/signIn');
                }
            });
        }
    } finally {
        /**
         * Commit response to store state at once
         * replacedType = SaveStockAlert
         * mutationName = setSaveStockAlert
         * @type {config, data, headers, request, status, statusText} axiosResponse
         * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
         */
        const deepCopy = JSON.parse(JSON.stringify(axiosResponse.data))
        const sswResponse = deepCopy
        const mutationName = `set${replacedType}Res`
        commit(mutationName, sswResponse)
    }
    return JSON.parse(JSON.stringify(axiosResponse.data))
}