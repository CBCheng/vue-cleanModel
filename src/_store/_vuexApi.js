import axios from 'axios'
const baseURL = `${process.env.VUE_APP_BASE_URL}`
axios.defaults.baseURL = baseURL

function downloadErrorJSON(errorJSON, fileName) {
    /**
    * 用Blob創造與下載文件
    * https://codertw.com/ios/19926/
    */
    const blob = new Blob([JSON.stringify(errorJSON)], {
        type: "application/json"
    })
    const objectURL = window.URL.createObjectURL(blob);
    // Do things
    const link = document.createElement('a');
    link.href = objectURL;
    link.download = fileName;
    link.click();
    // Clear memory
    window.URL.revokeObjectURL(objectURL);
}

export default async function requestSync({ commit }, type, options) {
    /**
     * Extract Type
     * before replace: type == 'post'SaveStockAlert
     * after replace: type == ''SaveStockAlert
     * httpMethod == post
     */
    let method = 'post';
    const replacedType = type.replace(/get|post|put|delete/, (httpMethod) => {
        method = httpMethod
        return ""
    })
    /**
     * Build up axios config
     * replacedType == SaveStockAlert
     */
    const { url, data = {}, params, headers } = options
    const dataCopy = JSON.parse(JSON.stringify(data))
    const userToken = sessionStorage.getItem('userToken');

    // Assign custom headers to base headers
    const baseHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'client_id': 'WFP_APIClient',
        'client_secret': 'secret',
        'grant_type': 'client_credentials',
        'X-Origin-Time': '2019-05-13T11:35:58.881',
        'Accept-Language': 'en-US',
        'Authorization': 'Bearer ' + userToken,
    }
    const headersWithToken = Object.assign(baseHeaders, headers)

    // Complete config
    const axiosConfig = {
        url,
        method,
        params: params ? params : {},
        data: dataCopy,
        headers: headersWithToken
    }
    /**
     * Send request
     */
    let axiosResponse = null
    try {
        axiosResponse = await axios(axiosConfig)
        // console.log({
        //     axiosResponse
        // })
        const { config, headers } = axiosResponse
        const { method, url } = config
        const { Datas, ResultCode, Message } = axiosResponse.data
        if (ResultCode !== '01') {
            const errorJSON = {
                method,
                url,
                headers,
                data: JSON.parse(config.data)
            }
            downloadErrorJSON(errorJSON, Message)
        }
    } catch (error) {
        const { config, request, response, message } = error;
        const { method, url, data } = config
        /**
         * 處理未捕捉的Server error, 諸如403, 404, 500
         */
        if (message) {
            alert(`${message}`)
            const errorJSON = {
                method,
                url,
                data: JSON.parse(data)
            }
            downloadErrorJSON(errorJSON, message)
            axiosResponse = {
                data: null,
                ResultCode: null,
            }
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