/**
 * Create a component with common options
 * 注意不要 放在外层的index （import create from './modules/create'） 容易导致循环依赖，部署报错
 */
 import createBasic from './create-basic.js'

 export default function(sfc) {
   sfc.components = Object.assign(sfc.components || {}, {})
   return createBasic(sfc)
 }
 