import Vue from 'vue'

import copy from './copy.js'
import longpress from './longpress.js'
import { debounce, throttle } from './debounce.js'

import emoji from './emoji.js'
import permission from './permission'
import waterMarker from './waterMarker'
import draggable from './draggable'
import inputLimit from './inputLimit.js'
import dialogDrag from './dialogDrag.js'
import removeZero from './removeZero.js'
import overflowTip from './overflowTooltip.js'

const directives = {
  copy,
  longpress,
  debounce,
  throttle,
  emoji,
  waterMarker,
  permission,
  draggable,
  inputLimit,
  dialogDrag,
  removeZero,
  overflowTip
}

Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))
