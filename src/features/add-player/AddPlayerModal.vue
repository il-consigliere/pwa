<script setup lang="ts">
import {
  NIcon,
  NModal,
  NSpace,
  NInput,
  NCheckbox,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import { ref } from 'vue'
import { PersonOutline, SendOutline } from '@vicons/ionicons5'

import { FormSubmit } from '@/shared'
import { addPlayer } from '@/service'

import { showAddPlayerModal, selectPlayerCallback } from './model'

const name = ref('')
const comment = ref('')
const select = ref(false)
const message = useMessage()
const loadingBar = useLoadingBar()

const clearForm = () => {
  name.value = ''
  comment.value = ''
}

const onSubmit = () => {
  loadingBar.start()

  const { value } = name

  addPlayer(value, comment.value).then(id => {
    if (id) {
      loadingBar.finish()
      message.success(`+ ID ${id}, ${value}`)

      if (select.value && selectPlayerCallback.value) {
        selectPlayerCallback.value(id)
      }
    } else {
      loadingBar.error()
      message.error('Не удалось добавить игрока')
    }
  })

  clearForm()

  showAddPlayerModal.value = false
}
</script>

<template>
  <NModal
    v-model:show="showAddPlayerModal"
    preset="card"
    class="app-modal"
    title="Добавление игрока"
    @after-leave="clearForm"
  >
    <form @submit.prevent="onSubmit">
      <NSpace vertical size="large">
        <NInput
          v-model:value="name"
          placeholder="Введите имя игрока"
          :input-props="{ name: 'player-name' }"
        >
          <template #prefix>
            <NIcon :component="PersonOutline" />
          </template>
        </NInput>

        <NInput
          v-model:value="comment"
          type="textarea"
          placeholder="Можете добавить комментарий"
          :input-props="{ name: 'player-description' }"
        />

        <NCheckbox v-model:checked="select">Выбрать на игру</NCheckbox>

        <FormSubmit :disabled="!name">
          <template #icon>
            <NIcon :component="SendOutline" />
          </template>

          <template #text>Отправить</template>
        </FormSubmit>
      </NSpace>
    </form>
  </NModal>
</template>
