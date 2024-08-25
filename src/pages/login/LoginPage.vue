<script setup lang="ts">
import { NCard, NIcon, NSpace, NInput } from 'naive-ui'
import { KeyOutline, LogInOutline, PersonOutline } from '@vicons/ionicons5'

import { FormSubmit } from '@/shared'

const onSubmit = () => {}
</script>

<template>
  <NCard title="Вход в систему">
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NInput size="large" placeholder="Имя" :input-props="{ name: 'login' }">
          <template #prefix>
            <NIcon :component="PersonOutline" />
          </template>
        </NInput>

        <NInput
          size="large"
          type="password"
          placeholder="Пароль"
          show-password-on="mousedown"
          :input-props="{ name: 'password' }"
        >
          <template #prefix>
            <NIcon :component="KeyOutline" />
          </template>
        </NInput>

        <FormSubmit>
          <template #icon>
            <NIcon :component="LogInOutline" />
          </template>

          <template #text>Войти</template>
        </FormSubmit>
      </NSpace>
    </form>
  </NCard>
</template>
