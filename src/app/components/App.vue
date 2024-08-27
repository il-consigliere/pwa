<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'

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
          <LoginPage />
        </div>
      </NLayoutContent>
    </NLayout>
  </NaiveProvider>
</template>
