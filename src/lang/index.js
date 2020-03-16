import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
// import cn from './cn.json'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
    en
}

const i18n = new VueI18n({
  /** 默认值 */
  locale,
  messages
})

export default i18n
