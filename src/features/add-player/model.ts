import { ref } from 'vue'

import { MaybeSelectPlayerCallback } from './types'

export const showAddPlayerModal = ref(false)

export const selectPlayerCallback = ref<MaybeSelectPlayerCallback>(null)

export const setSelectPlayerCallback = (value: MaybeSelectPlayerCallback) => {
  selectPlayerCallback.value = value
}

export const callAddPlayerModal = () => {
  showAddPlayerModal.value = true
}
