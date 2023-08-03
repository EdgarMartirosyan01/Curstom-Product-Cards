import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { languages, defaultLocale } from '@/i18n/i18nIndex';
import { createI18n } from 'vue-i18n';
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus';
const messages = Object.assign(languages);
const i18n = createI18n({
    legacy: true,
    locale: defaultLocale,
    fallbackLocale: 'ru',
    messages,
});


const app = createApp(App);

app.provide('i18n', i18n);
app.config.globalProperties.$defaultProductImage = require('@/assets/images/default-product-image.png');

app
    .use(router)
    .use(store)
    .use(i18n)
    .use(ElementPlus)
    .mount('#app');
