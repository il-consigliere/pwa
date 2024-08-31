export interface PlayerInGame {
  id: number
  dead: boolean
  seatNumber: number
  roleId: null | number
}

export interface GameData {
  players: PlayerInGame[]
  winningTeamId: null | number
}
