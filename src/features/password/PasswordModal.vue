<script setup lang="ts">
import {
  NIcon,
  NAlert,
  NModal,
  NSpace,
  NInput,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import { ref, computed } from 'vue'
import { KeyOutline, SendOutline } from '@vicons/ionicons5'

import { FormSubmit } from '@/shared'

import { changePassword } from './api'
import { showPasswordModal } from './model'

const repeat = ref('')
const password = ref('')
const message = useMessage()
const repeatInFocus = ref(false)
const passwordInFocus = ref(false)
const loadingBar = useLoadingBar()

const showWarning = computed(() =>
  Boolean(
    repeat.value &&
      password.value &&
      !repeatInFocus.value &&
      !passwordInFocus.value &&
      password.value !== repeat.value,
  ),
)

const submitDisabled = computed(
  () => repeat.value.length < 8 || password.value !== repeat.value,
)

const clearForm = () => {
  repeat.value = ''
  password.value = ''
}

const onSubmit = () => {
  loadingBar.start()

  changePassword(repeat.value).then(result => {
    if (result) {
      loadingBar.finish()
      message.success('Пароль изменён')
    } else {
      loadingBar.error()
      message.error('Не удалось сменить пароль')
    }
  })

  clearForm()

  showPasswordModal.value = false
}
</script>

<template>
  <NModal
    v-model:show="showPasswordModal"
    preset="card"
    class="app-modal"
    title="Смена пароля"
    @after-leave="clearForm"
  >
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NAlert :type="showWarning ? 'error' : 'info'" :bordered="false">
          {{ showWarning ? 'Пароли не совпадают' : 'Не менее восьми символов' }}
        </NAlert>

        <NInput
          v-model:value="password"
          size="large"
          type="password"
          show-password-on="mousedown"
          placeholder="Введите новый пароль"
          :input-props="{ name: 'new-password' }"
          @focus="() => (passwordInFocus = true)"
          @blur="() => (passwordInFocus = false)"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" />
          </template>
        </NInput>

        <NInput
          v-model:value="repeat"
          size="large"
          type="password"
          show-password-on="mousedown"
          placeholder="Повторите пароль"
          :input-props="{ name: 'repeat-password' }"
          @focus="() => (repeatInFocus = true)"
          @blur="() => (repeatInFocus = false)"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" />
          </template>
        </NInput>

        <FormSubmit :disabled="submitDisabled">
          <template #icon>
            <NIcon :component="SendOutline" />
          </template>

          <template #text>Отправить</template>
        </FormSubmit>
      </NSpace>
    </form>
  </NModal>
</template>
