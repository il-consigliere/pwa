import { ref, computed } from 'vue'

import { GameRole, GamePlayer, TitledEntity } from './types'

export const roles = ref<GameRole[]>([])

export const teams = ref<TitledEntity[]>([])

export const players = ref<GamePlayer[]>([])

export const dataIsReady = computed(() => roles.value.length > 0)
