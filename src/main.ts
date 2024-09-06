import { createApp } from 'vue'

import { loadInitialData } from '@/service'
import { App, watchHeight, registerServiceWorker } from '@/app'

watchHeight()
registerServiceWorker()

loadInitialData().then(() => {
  createApp(App).mount('#app')
})
