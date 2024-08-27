<script setup lang="ts">
import {
  Menu,
  LogoGithub,
  KeyOutline,
  LogOutOutline,
  ColorFillOutline,
} from '@vicons/ionicons5'
import { h, computed, Component } from 'vue'
import { NIcon, NButton, NDropdown } from 'naive-ui'

import { useExit, dataIsReady } from '@/service'
import { useChangeTheme } from '@/features/theme'
import { PasswordModal, callPasswordModal } from '@/features/password'

const { exit } = useExit()
const { themeName, changeTheme } = useChangeTheme()

const labelThemeName = computed(() =>
  themeName.value === 'dark' ? 'Тёмная тема' : 'Светлая тема',
)

const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) })

const options = computed(() => [
  {
    key: 'change-theme',
    label: () => labelThemeName.value,
    icon: renderIcon(ColorFillOutline),
  },
  ...(dataIsReady.value
    ? [
        {
          key: 'change-password',
          label: 'Сменить пароль',
          icon: renderIcon(KeyOutline),
        },
      ]
    : []),
  {
    key: 'github',
    label: () =>
      h(
        'a',
        {
          href: 'https://github.com/il-consigliere',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'GitHub',
      ),
    icon: renderIcon(LogoGithub),
  },
  ...(dataIsReady.value
    ? [
        {
          key: 'exit',
          label: 'Выйти',
          icon: renderIcon(LogOutOutline),
        },
      ]
    : []),
])

const handleSelect = (key: string) => {
  switch (key) {
    case 'change-theme':
      changeTheme()

      break
    case 'change-password':
      callPasswordModal()

      break
    case 'exit':
      exit()

      break
  }
}
</script>

<template>
  <NDropdown
    size="huge"
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <NButton quaternary>
      <template #icon>
        <Menu />
      </template>
    </NButton>
  </NDropdown>

  <PasswordModal />
</template>
