"use client";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'he',
    lng: 'he',
    resources: {
        rus: {
            translations: require('./locals/rus.json')
        },
        he: {
            translations: require('./locals/he.json')
        },
        arb: {
            translations: require('./locals/arb.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['rus', 'he', 'arb'];

export default i18n;