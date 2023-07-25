import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';

export const defaultLocale = 'ru';

export const languages = {
    en,
    ru,
};

export default createI18n({
    locale: defaultLocale,
    messages: languages,
});
