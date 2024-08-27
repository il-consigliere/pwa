import { useLoadingBar } from 'naive-ui'

import { DROPDOWN_TIMEOUT } from '@/shared'

import { exit } from './actions'

export const useExit = () => {
  const loadingBar = useLoadingBar()

  return {
    exit() {
      loadingBar.start()

      setTimeout(() => {
        void exit()

        loadingBar.finish()
      }, DROPDOWN_TIMEOUT)
    },
  }
}
