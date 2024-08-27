import { ref } from 'vue'

export const showAddPlayerModal = ref(false)

export const callAddPlayerModal = () => {
  showAddPlayerModal.value = true
}
