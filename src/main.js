import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { languages, defaultLocale } from '@/i18n/i18nIndex';
import { createI18n } from 'vue-i18n';

const messages = Object.assign(languages);
console.log(
    {messages, defaultLocale}
)
const i18n = createI18n({
    legacy: true,
    locale: defaultLocale,
    fallbackLocale: 'ru',
    messages,
});

const app = createApp(App);

app
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app');
