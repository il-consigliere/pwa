import { get, postFormData, postJsonData } from '@/shared'

import { teams, roles, players } from './storage'
import { InitialData, GameInServer } from './types'

export const loadInitialData = async () => {
  const result = await get<InitialData>('data')

  if (result) {
    teams.value = result.teams
    players.value = result.players

    roles.value = result.roles.map(role => ({
      id: role.id,
      title: role.title,
      teamId: role.team_id,
    }))
  }

  return result
}

export const addPlayer = async (name: string, comment: string) => {
  const result = await postFormData<{ player_id: number }>('add-player', {
    name,
    comment: comment || '—',
  })

  if (!result) {
    return null
  }

  players.value.push({ name, comment, id: result.player_id })

  return result.player_id
}

export const saveGame = (game: GameInServer) => postJsonData('save-game', game)

export const enter = async (name: string, password: string) => {
  const result = await postFormData('enter', { name, password })

  return result && loadInitialData()
}

export const exit = async () => {
  teams.value = []
  roles.value = []
  players.value = []

  await get('exit')
}
