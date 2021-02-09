import LangEn from './en.js'
import LangChs from './zh.js'
import LangJPN from './jp.js'
import LangTCs from './tc.js'
import LangKr from './kr.js'

import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('system_info', res);
		}
	})
}
const cur_lang = system_info.language == 'en' ? 'en_US' : 'zh_CN'
const i18n = new VueI18n({
	locale: cur_lang || 'zh_CN',  // 默认选择的语言
	messages: {  
			'en_US': LangEn,
			'zh_CN': LangChs,
			'jp_JPN': LangJPN,
			'zh_TC': LangTCs,
			'kr_Kr': LangKr
		}
})
export default i18n