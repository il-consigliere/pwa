export interface TitledEntity {
  id: number
  title: string
}

export interface GameRole extends TitledEntity {
  teamId: number
}

export interface GamePlayer {
  id: number
  name: string
  comment: string
}

export interface InitialData {
  roles: GameRole[]
  teams: TitledEntity[]
  players: GamePlayer[]
}
