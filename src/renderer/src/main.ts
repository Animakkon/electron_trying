import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import PhosphorIcons from '@phosphor-icons/vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(PhosphorIcons)
  .mount('#app')
