export interface TitledEntity {
  id: number
  title: string
}

export interface GameRole extends TitledEntity {
  teamId: number
}

export interface GameRoleInServer extends TitledEntity {
  team_id: number
}

export interface GamePlayer {
  id: number
  name: string
  comment: string
}

export interface InitialData {
  teams: TitledEntity[]
  players: GamePlayer[]
  roles: GameRoleInServer[]
}

export interface GameInServer {
  winningTeamId: number
  players: {
    id: number
    roleId: number
  }[]
}
