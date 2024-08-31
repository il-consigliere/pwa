import { GameData } from './types'

const GAME_LS_KEY = 'game'
const SELECTED_LS_KEY = 'selected'

export const readSelectedPlayers = () => {
  const playersJson = localStorage.getItem(SELECTED_LS_KEY)

  if (!playersJson) {
    return []
  }

  try {
    const players = JSON.parse(playersJson)

    return players.map(Number)
  } catch (error) {
    void error

    return []
  }
}

export const writeSelectedPlayers = (value: number[]) => {
  if (!value.length) {
    localStorage.removeItem(SELECTED_LS_KEY)
  } else {
    localStorage.setItem(SELECTED_LS_KEY, JSON.stringify(value))
  }
}

export const readGame = (): null | GameData => {
  const gameJson = localStorage.getItem(GAME_LS_KEY)

  if (!gameJson) {
    return null
  }

  try {
    return JSON.parse(gameJson)
  } catch (error) {
    void error

    return null
  }
}

export const writeGame = (value: null | GameData) => {
  if (!value) {
    localStorage.removeItem(GAME_LS_KEY)
  } else {
    localStorage.setItem(GAME_LS_KEY, JSON.stringify(value))
  }
}
