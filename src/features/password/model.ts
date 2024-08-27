import { ref } from 'vue'

export const showPasswordModal = ref(false)

export const callPasswordModal = () => {
  showPasswordModal.value = true
}
