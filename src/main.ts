import { createApp } from 'vue'

import { App, watchHeight } from '@/app'
import { loadInitialData } from '@/service'

watchHeight()

loadInitialData().then(() => {
  createApp(App).mount('#app')
})
