<script setup lang="ts">
import { game } from '@/features/local-data'
import { FinishGame } from '@/widgets/finish-game'
import { SelectPlayers } from '@/widgets/select-players'
</script>

<template>
  <FinishGame v-if="game" />
  <SelectPlayers v-else />
</template>
