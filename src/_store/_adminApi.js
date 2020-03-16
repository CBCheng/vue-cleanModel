import AxiosWrapper from './_AxiosWrapper.js'
import store from '@/_store/index.js'
class AdminApi extends AxiosWrapper {
    constructor(config) {
        super(config);
    }
    request(type, options) {
        // 檢查是否有Token，沒有則回登入頁
        const userToken = sessionStorage.getItem('userToken');
        if (!userToken) {
            store.dispatch('getLogout', 'adminApi')
            return;
        }
        return super.request(type, options, userToken)
    }
}

const adminApi = new AdminApi({
    baseURL: `${process.env.VUE_APP_BASE_URL}`,
})

/**
 * @param {*} store 
 * @param {*} type 
 * @param {*} options 
 */

export default async function adminRequest(type, options) {
    return adminApi.request(type, options)
}