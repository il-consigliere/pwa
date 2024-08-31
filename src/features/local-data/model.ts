import { ref } from 'vue'

import {
  readGame,
  writeGame,
  readSelectedPlayers,
  writeSelectedPlayers,
} from './io'
import { GameData } from './types'

export const game = ref<null | GameData>(readGame())

export const selectedPlayers = ref<number[]>(readSelectedPlayers())

export const clearGame = () => {
  game.value = null

  writeGame(null)
}

export const flushGame = () => {
  writeGame(game.value)
}

export const clearLocalData = () => {
  clearGame()
  writeSelectedPlayers([])

  selectedPlayers.value = []
}
