const LS_KEY = 'selected-players'

export const readSelectedPlayers = () => {
  const playersJson = localStorage.getItem(LS_KEY)

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
    localStorage.removeItem(LS_KEY)
  } else {
    localStorage.setItem(LS_KEY, JSON.stringify(value))
  }
}
