import Axios from "axios"

import { createApp } from "vue"
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import Router from '@/app/routes.js'
import Layout from "@/app/Layout.vue"

const I18n = createI18n({ locale: 'current', messages: TRANSLATIONS })
const app = createApp(Layout)

const Pinia = createPinia()
Pinia.use(({ store }) => { store.axios = Axios })

app.use(Router)
    .use(Pinia )
    .use(I18n)
    .mount("body")