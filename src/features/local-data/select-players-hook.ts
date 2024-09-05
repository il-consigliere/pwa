import { watch } from 'vue'

import { game, selectedPlayers } from './model'
import { writeGame, writeSelectedPlayers } from './io'

export const useSelectPlayers = () => {
  watch(selectedPlayers, writeSelectedPlayers)

  return {
    startGame() {
      game.value = {
        winningTeamId: null,
        players: selectedPlayers.value.map((id, index) => ({
          id,
          dead: false,
          roleId: null,
          seatNumber: index + 1,
        })),
      }

      writeGame(game.value)
    },
  }
}
