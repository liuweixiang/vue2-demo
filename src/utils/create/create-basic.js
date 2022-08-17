/**
 * Create a basic component with common options
 */
import bem from './bem.js'

const install = function(Vue) {
  Vue.component(this.name, this)
}
 
export default function(sfc) {
  sfc.name = `hd-${sfc.name && sfc.name.toLowerCase()}`
  sfc.install = sfc.install || install
  sfc.mixins = sfc.mixins || []
  sfc.mixins.push(bem)
  sfc.methods = sfc.methods || {}
 
  return sfc
}
 