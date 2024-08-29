<script setup lang="ts">
import {
  NIcon,
  NCard,
  NAlert,
  NEmpty,
  NSpace,
  NButton,
  NSelect,
} from 'naive-ui'
import {
  TrashBinOutline,
  AddCircleOutline,
  GameControllerOutline,
} from '@vicons/ionicons5'
import { ref, watch, computed, onBeforeUnmount } from 'vue'

import {
  callAddPlayerModal,
  setSelectPlayerCallback,
} from '@/features/add-player'
import {
  readSelectedPlayers,
  writeSelectedPlayers,
} from '@/features/select-players'
import { players } from '@/service'

const options = computed(() =>
  players.value.map(({ id, name }) => ({
    value: id,
    label: `ID ${id}, ${name}`,
  })),
)

const selectedPlayers = ref<number[]>(readSelectedPlayers())

const clear = () => {
  selectedPlayers.value = []
}

watch(selectedPlayers, writeSelectedPlayers)

setSelectPlayerCallback(id => {
  selectedPlayers.value.push(id)
})

onBeforeUnmount(() => {
  setSelectPlayerCallback(null)
})
</script>

<template>
  <NCard title="Подготовка к игре">
    <NSpace vertical size="large">
      <NAlert type="info" :bordered="false">
        Выбрано игроков: {{ selectedPlayers.length }}
      </NAlert>

      <NButton
        strong
        size="large"
        type="primary"
        class="full-width"
        :disabled="selectedPlayers.length < 3"
      >
        <template #icon>
          <NIcon :component="GameControllerOutline" />
        </template>

        Начать игру
      </NButton>

      <NSelect
        v-model:value="selectedPlayers"
        multiple
        filterable
        size="large"
        :options="options"
        :disabled="!options.length"
        placeholder="Выберите игроков"
      >
        <template #empty>
          <NEmpty size="large" description="Таких игроков пока нет">
            <template #extra>
              <NButton size="large" @click="callAddPlayerModal">
                <template #icon>
                  <NIcon :component="AddCircleOutline" />
                </template>

                Добавить игрока
              </NButton>
            </template>
          </NEmpty>
        </template>
      </NSelect>

      <NButton
        strong
        secondary
        size="large"
        type="tertiary"
        class="full-width"
        :disabled="!selectedPlayers.length"
        @click="clear"
      >
        <template #icon>
          <NIcon :component="TrashBinOutline" />
        </template>

        Очистить выбор
      </NButton>
    </NSpace>
  </NCard>
</template>
