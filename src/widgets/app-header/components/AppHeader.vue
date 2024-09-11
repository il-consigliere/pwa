<script setup lang="ts">
import { NLayoutHeader, NText } from 'naive-ui'

import MenuButton from './MenuButton.vue'
</script>

<template>
  <NLayoutHeader bordered class="app-header">
    <NText>Il Consigliere</NText>

    <div class="header-content">
      <NText>1.0.1</NText>
      <MenuButton />
    </div>
  </NLayoutHeader>
</template>
