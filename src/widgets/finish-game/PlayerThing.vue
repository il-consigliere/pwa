<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { NSpace, NThing, NSelect, NCheckbox } from 'naive-ui'

import { roles, players } from '@/service'
import { PlayerInGame } from '@/features/local-data'

const props = defineProps<{
  disabled?: boolean
  player: PlayerInGame
  playersAmount: number
}>()

const emit = defineEmits<{
  'set-role': [number]
  'set-dead': [boolean]
  'set-number': [number]
}>()

const localDead = ref(props.player.dead)
const localRoleId = ref(props.player.roleId)
const localSeatNumber = ref(props.player.seatNumber)

const rolesOptions = computed(() =>
  roles.value.map(({ id, title }) => ({
    value: id,
    label: title,
  })),
)

const numbersOptions = computed(() =>
  Array.from({ length: props.playersAmount }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  })),
)

const getNameById = (id: number) => {
  const player = players.value.find(player => player.id === id)

  if (!player) {
    throw new Error(`Cannot find player: ${id}`)
  }

  return player.name
}

const onSeatNumberSelected = (value: number) => {
  emit('set-number', value)
}

watch(localDead, value => {
  emit('set-dead', value)
})

watch(localRoleId, value => {
  if (value) {
    emit('set-role', value)
  }
})

watch(
  () => props.player.seatNumber,
  value => {
    localSeatNumber.value = value
  },
)
</script>

<template>
  <NThing
    :title="getNameById(player.id)"
    :class="['player-thing', { 'player-dead': player.dead }]"
  >
    <template #action>
      <NSpace vertical size="large">
        <NSelect
          v-model:value="localSeatNumber"
          :disabled="disabled"
          :options="numbersOptions"
          placeholder="Выберите номер"
          @update:value="onSeatNumberSelected"
        />

        <NSelect
          v-model:value="localRoleId"
          :disabled="disabled"
          :options="rolesOptions"
          placeholder="Выберите роль"
        />

        <NCheckbox v-model:checked="localDead" :disabled="disabled">
          Выбыл
        </NCheckbox>
      </NSpace>
    </template>
  </NThing>
</template>
