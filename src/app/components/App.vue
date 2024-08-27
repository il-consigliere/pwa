<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'

import { dataIsReady } from '@/service'
import { GamePage } from '@/pages/game'
import { LoginPage } from '@/pages/login'
import { AppHeader } from '@/widgets/app-header'

import NaiveProvider from './NaiveProvider.vue'
</script>

<template>
  <NaiveProvider>
    <NLayout>
      <AppHeader />

      <NLayoutContent class="app-layout-content" :native-scrollbar="false">
        <div class="page-wrapper">
          <GamePage v-if="dataIsReady" />
          <LoginPage v-else />
        </div>
      </NLayoutContent>
    </NLayout>
  </NaiveProvider>
</template>
