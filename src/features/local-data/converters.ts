import { GameInServer } from '@/service'

import { GameData } from './types'

export const gameToServer = (game: GameData): GameInServer => {
  if (!game.winningTeamId) {
    throw new Error('No winningTeamId while saving')
  }

  return {
    winningTeamId: game.winningTeamId,
    players: game.players.map(({ id, roleId }) => {
      if (!roleId) {
        throw new Error('No roleId while saving')
      }

      return { id, roleId }
    }),
  }
}
