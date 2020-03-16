import axios from 'axios'
import router from '@/router.js'
import Vue from 'vue'
import i18n from '@/lang/index'
import store from '@/_store/index.js'
const globalVue = new Vue({})

export default class AxiosWrapper {
    constructor(config) {
        const { baseURL } = config
        this.ADMIN_MAX_RECONNECT_ATTEMPTS = 3
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 30000,
        })
    }
    downloadErrorJSON(errorJSON, fileName) {
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
        link.download = `${fileName}.json`;
        link.click();
        // Clear memory
        window.URL.revokeObjectURL(objectURL);
    }
    getDate() {
        const newDate = new Date()
        const yyyy = newDate.getFullYear()
        const month = String(newDate.getMonth() + 1)
        const MM = month.padStart(2, '0');
        const date = String(newDate.getDate())
        const dd = date.padStart(2, '0');
        const hours = String(newDate.getHours())
        const HH = hours.padStart(2, '0');
        const minutes = String(newDate.getMinutes())
        const mm = minutes.padStart(2, '0');
        const seconds = String(newDate.getSeconds())
        const ss = seconds.padStart(2, '0');
        return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`
    }
    async request(type, options, token) {
        /**
         * 正式取得API
         * Extract Type
         * before replace: type == 'post'SaveStockAlert
         * after replace: type == ''SaveStockAlert
         * httpMethod == post
         */
        let method = 'post'
        let replacedType = ''
        try {
            replacedType = type.replace(/get|post|put|delete/, (httpMethod) => {
                method = httpMethod
                return ""
            })
        } catch (error) {
            // eslint-disable-next-line
            console.log(type, error)
        }
        /**
         * Build up axios config
         * replacedType == SaveStockAlert
         */
        const { url, data = {}, params = {}, headers } = options
        const dataCopy = JSON.parse(JSON.stringify(data))
        const formateDate = this.getDate()
        // Assign custom headers to base headers
        const { NodeID = '' } = router.history.current.query
        const baseHeaders = {
            'Content-Type': 'application/json',
            'Accept-Language': i18n.locale,
            'Authorization': 'Bearer ' + token,
            'X-Origin-Time': formateDate,
            'X-NodeID': NodeID
        }
        const headersWithToken = Object.assign(baseHeaders, headers)

        // Complete config
        const axiosConfig = {
            url,
            method,
            params,
            data: dataCopy,
            headers: headersWithToken
        }
        /**
         * Send request
         */
        let axiosResponse = null
        try {
            axiosResponse = await this.axiosInstance(axiosConfig)
            // eslint-disable-next-line
            const { Datas, ResultCode, Message, MessageType } = axiosResponse.data
            // console.log(axiosResponse.data)
            switch (ResultCode) {
                case "01": {
                    // 成功
                    this.ADMIN_MAX_RECONNECT_ATTEMPTS = 3
                    break;
                }
                case "02": {
                    // Token無回應
                    // Resucrsively calling the api again
                    if (this.ADMIN_MAX_RECONNECT_ATTEMPTS !== 0) {
                        this.ADMIN_MAX_RECONNECT_ATTEMPTS -= 1
                        const promise = new Promise((resolve) => {
                            setTimeout(async () => {
                                await store.dispatch('postSysLogin')
                                const response = await this.request(store, type, options)
                                resolve(response)
                            }, 1000)
                        })
                        axiosResponse.data = await promise
                    }
                    break;
                }
                case "03": {
                    // Token失效
                    globalVue.$message.show({
                        content: 'token已失效，請重新登入',
                        type: MessageType,
                        buttonConfirm: {
                            click: () => {
                                router.push({
                                    name: 'login'
                                })
                            }
                        },
                        buttonCancel: false,
                    });
                    break;
                }
                case "00":
                default: {
                    globalVue.$message.show({
                        title: 'Error',
                        type: MessageType,
                        content: Message,
                        buttonCancel: false,
                    });
                    break;
                }
            }
            // console.log(axiosResponse)
        } catch (error) {
            // eslint-disable-next-line
            const { config, request, response, message = "unknown error" } = error;
            /**
             * Timeout
             */
            if (!response) {
                router.push({
                    name: 'login'
                })
            }
            /**
             * 處理未捕捉的Server error, 諸如403, 404, 500
             */
            switch (message) {
                case 'Network Error': {
                    globalVue.$message.show({
                        title: 'Error',
                        content: message,
                        buttonConfirm: {
                            click: () => {
                                router.push({
                                    name: 'login'
                                })
                            }
                        },
                        buttonCancel: false,
                    });
                    break;
                }
                default: {
                    let Message = ''
                    const errorJson = response
                    if (response && response.data) {
                        Message = response.data.Message
                        response.config.data = options.data
                        // errorJson.data = response.data
                    }
                    const jsonFileName = Message ? Message : message
                    this.downloadErrorJSON(errorJson, jsonFileName)
                }
            }
            axiosResponse = {
                data: null,
                ResultCode: null,
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
            store.commit(mutationName, sswResponse)
        }
        return JSON.parse(JSON.stringify(axiosResponse.data))
    }
}