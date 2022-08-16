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

export function NextDateTime(value) {
    const endTime = new Date(value).getTime() / 1000 - parseInt(new Date().getTime() / 1000);
    const timeDay = Math.ceil(endTime / 60 / 60 / 24);
    if (timeDay && timeDay > 0) {
        return timeDay
    } else {
        return 0
    }

}

export function formatDate2(currentTime, refreshTime) {
    currentTime = Number(currentTime)
    refreshTime = Number(refreshTime)
    const stamp = Math.ceil((currentTime - refreshTime) / 1000)
    if (stamp <= 60) {
        return '1分钟前'
    } else if (stamp > 60 && stamp <= 3600) {
        return Math.ceil(stamp / 60) + '分钟前'
    } else if (stamp > 3600 && stamp <= 3600 * 24) {
        return Math.ceil(stamp / 3600) + '小时前'
    } else if (3600 * 24 < stamp && stamp <= 3600 * 24 * 10) {
        return Math.ceil(stamp / (3600 * 24)) + '天前'
    } else if (3600 * 24 * 10 < stamp) {
        let date = new Date(refreshTime)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 // js从0开始取
        let day = date.getDate()
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return year + '-' + month + '-' + day
    }
}

export function beforeTime(value) {
    let time = Date.parse(new Date())
    let num = time - value
    let getMin = Math.floor(num / 1000 / 60) // 分钟
    let getHour = Math.floor(num / 1000 / 60 / 60) // 小时
    let getDay = Math.floor(num / 1000 / 60 / 60 / 24) // 天
    let time1 = new Date(value)
    let m = time1.getMonth() + 1
    let d = time1.getDate()
    let y = time1.getFullYear()

    if (m < 10) {
        m = '0' + m
    }
    if (d < 10) {
        d = '0' + d
    }
    let date = m + '-' + d
    if (getMin < 60) {
        if (getMin < 1) {
            return '1分钟前'
        }
        return getMin + '分钟前'
    } else if (getHour < 24) {
        return getHour + '小时前'
    } else if (getDay < 10) {
        return getDay + '天前'
    } else {
        return y + '-' + date
    }
}

export function contactSku(list) {
    let arr = JSON.parse(JSON.stringify(list))
    let str = ''
    let sortList = sortChinese(arr, 'attribute')
    if (sortList && sortList.length) {
        sortList.forEach(item => {
            str += item.name + ':' + item.val + '/'
        })
    }
    str = str.substring(0, str.length - 1)
    return str
}




