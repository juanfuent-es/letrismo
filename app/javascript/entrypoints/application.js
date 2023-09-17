import Axios from "axios"

import { createApp } from "vue"
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

/*
API
Needs implement authentication methods
 */
// import { createApi } from '@/app/plugins/api'
// const Api = createApi({ handler: Axios })

import Router from '@/app/routes.js'
import Layout from "@/app/Layout.vue"

const I18n = createI18n({ locale: 'current', messages: TRANSLATIONS })
const app = createApp(Layout)

const Pinia = createPinia()
Pinia.use(({ store }) => { store.axios = Axios })

app.use(Router)
    .use(Pinia )
    .use(I18n)
    // .use(Api)
    .mount("body")