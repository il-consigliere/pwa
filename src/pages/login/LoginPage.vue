<script setup lang="ts">
import {
  NCard,
  NIcon,
  NSpace,
  NInput,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import { ref } from 'vue'
import { KeyOutline, LogInOutline, PersonOutline } from '@vicons/ionicons5'

import { enter } from '@/service'
import { FormSubmit } from '@/shared'
import { clearLocalData } from '@/features/local-data'

clearLocalData()

const name = ref('')
const password = ref('')
const message = useMessage()
const loadingBar = useLoadingBar()
const requestInProgress = ref(false)

const onSubmit = () => {
  loadingBar.start()

  requestInProgress.value = true

  enter(name.value, password.value).then(result => {
    requestInProgress.value = false

    if (result) {
      loadingBar.finish()
    } else {
      loadingBar.error()
      message.error('Не удалось войти')
    }
  })
}
</script>

<template>
  <NCard title="Вход в систему">
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NInput
          v-model:value="name"
          size="large"
          placeholder="Имя"
          :disabled="requestInProgress"
          :input-props="{ name: 'login' }"
        >
          <template #prefix>
            <NIcon :component="PersonOutline" />
          </template>
        </NInput>

        <NInput
          v-model:value="password"
          size="large"
          type="password"
          placeholder="Пароль"
          show-password-on="mousedown"
          :disabled="requestInProgress"
          :input-props="{ name: 'password' }"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" />
          </template>
        </NInput>

        <FormSubmit :disabled="!name || !password || requestInProgress">
          <template #icon>
            <NIcon :component="LogInOutline" />
          </template>

          <template #text>Войти</template>
        </FormSubmit>
      </NSpace>
    </form>
  </NCard>
</template>
