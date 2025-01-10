import { Scrim } from '@govbr-ds/core'

export function toggleScrim(component: string) {
    const scrimfoco = new Scrim({
      trigger: window.document.querySelector('#' + component),
      escEnable: false
    })

    if (scrimfoco.trigger.classList.value.indexOf('active') >= 0) {
      scrimfoco.hideScrim()
    } else {
      scrimfoco.showScrim()
    }
  }