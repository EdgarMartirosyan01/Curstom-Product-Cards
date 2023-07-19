import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';

export const defaultLocale = 'ru';

export const languages = {
    en,
    ru,
};

const i18n = createI18n({
    locale: defaultLocale,
    messages: languages,
});

export default i18n;