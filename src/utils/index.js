import moment from 'moment'

/**
 * 字符串脱敏
 * @param {*} startNum 开始余留位数，不脱敏
 * @param {*} endNum 结束余留位数，不脱敏
 * @returns
 */
export const stringEncrypt = (str, startNum = 4, endNum = 4) => {
  if (!str) return
  const len = str.length
  if (len < 8) return str
  const center = str.slice(startNum, len - endNum)
  const b = center.replace(/\w/gi, '*')
  str = str.slice(0, startNum) + b + str.slice(len - endNum, len)
  return str
}

export function changeMoney(num) {
  let regexp = /(?:\.0*|(\.\d+?)0+)$/
  if (num > 1000000) {
    num = JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100
    return num + '万'
  } else {
    num = (num / 100).toFixed(2)
    num = num.replace(regexp, '$1')
    return num
  }
}

// 时间过滤
export function formatDate(value) {
  if (!value) return '/'
  return moment(value).format('YYYY-MM-DD')
}

export function formatSeconds(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

export function formaHoures(value) {
  return moment(value).format('YYYY-MM-DD HH:mm')
}
export function formatDay(value) {
  return moment(value).format('YYYY-MM-DD')
}
