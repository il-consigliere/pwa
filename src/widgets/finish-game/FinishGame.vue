<script setup lang="ts">
import {
  NH3,
  NCard,
  NIcon,
  NList,
  NRadio,
  NSpace,
  NButton,
  NDivider,
  NListItem,
  useDialog,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import { ref, watch, computed } from 'vue'
import { SaveOutline } from '@vicons/ionicons5'

import { roles, teams, saveGame } from '@/service'
import { game, flushGame, clearGame, gameToServer } from '@/features/local-data'

import PlayerThing from './PlayerThing.vue'

const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()
const requestInProgress = ref(false)

const getGame = () => {
  if (!game.value) {
    throw new Error('No game to sort players')
  }

  return game.value
}

const getPlayer = (id: number) => {
  const player = getGame().players.find(p => id === p.id)

  if (!player) {
    throw new Error(`No player with id ${id}`)
  }

  return player
}

const sortedPlayers = computed(() =>
  getGame().players.toSorted((a, b) => a.seatNumber - b.seatNumber),
)

const teamsInGame = computed(() => {
  const playersRoles = getGame()
    .players.map(({ roleId }) => roleId)
    .filter(Boolean) as number[]

  const playersTeams = playersRoles.map(roleId => {
    const role = roles.value.find(({ id }) => id === roleId)

    if (!role) {
      throw new Error('Role not found')
    }

    return role.teamId
  })

  return teams.value.filter(({ id }) => playersTeams.includes(id))
})

const finishDisabled = computed(() => {
  const game = getGame()

  return !game.players.reduce(
    (acc, { roleId }) => acc && Number.isFinite(roleId),
    game.winningTeamId !== null,
  )
})

const onCancel = () => {
  dialog.warning({
    title: 'Точно отменить игру?',
    content: 'Внесённые во время игры данные будут потеряны.',
    positiveText: 'Да, отменить',
    negativeText: 'Не надо',
    onPositiveClick: clearGame,
  })
}

const onSave = () => {
  dialog.success({
    title: 'Завершить игру?',
    content: 'Внесённые во время игры данные будут сохранены на сервере.',
    positiveText: 'Да, завершить',
    negativeText: 'Не надо',
    onPositiveClick() {
      loadingBar.start()

      requestInProgress.value = true

      saveGame(gameToServer(getGame())).then(result => {
        if (result) {
          clearGame()
          loadingBar.finish()
          message.success('Игра успешно сохранена')
        } else {
          loadingBar.error()
          message.error('Не удалось сохранить игру')

          requestInProgress.value = false
        }
      })
    },
  })
}

const onSetRole = (playerId: number, value: number) => {
  getPlayer(playerId).roleId = value

  flushGame()
}

const onSetDead = (playerId: number, value: boolean) => {
  getPlayer(playerId).dead = value

  flushGame()
}

const onSetNumber = (playerId: number, value: number) => {
  const game = getGame()
  const initiator = getPlayer(playerId)
  const victim = game.players.find(p => p.seatNumber === value)

  if (!victim) {
    throw new Error(`Cannot find player with seat number ${value}`)
  }

  victim.seatNumber = initiator.seatNumber
  initiator.seatNumber = value

  flushGame()
}

const setWinningTeam = (teamId: number) => {
  getGame().winningTeamId = teamId

  flushGame()
}

watch(teamsInGame, value => {
  const game = getGame()

  if (!value.find(({ id }) => id === game.winningTeamId)) {
    game.winningTeamId = null

    flushGame()
  }
})
</script>

<template>
  <NCard v-if="game" closable title="Идёт игра" @close="onCancel">
    <NSpace vertical size="large">
      <NList hoverable>
        <NListItem v-for="player in sortedPlayers" :key="player.id">
          <PlayerThing
            :player="player"
            :disabled="requestInProgress"
            :players-amount="game.players.length"
            @set-dead="value => onSetDead(player.id, value)"
            @set-role="value => onSetRole(player.id, value)"
            @set-number="value => onSetNumber(player.id, value)"
          />
        </NListItem>
      </NList>

      <template v-if="teamsInGame.length > 1">
        <NDivider />
        <NH3>Победила команда</NH3>

        <NSpace vertical size="large">
          <NRadio
            v-for="team in teamsInGame"
            :key="team.id"
            :value="team.id"
            name="winning-team"
            :disabled="requestInProgress"
            :checked="game.winningTeamId === team.id"
            @change="() => setWinningTeam(team.id)"
          >
            {{ team.title }}
          </NRadio>
        </NSpace>

        <NButton
          strong
          size="large"
          type="primary"
          class="full-width"
          :disabled="finishDisabled || requestInProgress"
          @click="onSave"
        >
          <template #icon>
            <NIcon :component="SaveOutline" />
          </template>

          Завершить игру
        </NButton>
      </template>
    </NSpace>
  </NCard>
</template>
