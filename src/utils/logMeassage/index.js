

class Enctry {
    constructor(str='') {
        this.str = str;
    }

    toEnctry(str) {
        console.log(this.str,str);
        return this.stringEnctry(str)
    }

    stringEnctry(str) {
        str = String(str)
        console.log(str,']]]');
        if (!str) return
        const len = str.length
        if (len < 8) return str
        const center = str.slice(4, len - 4)
        const b = center.replace(/\w/gi, '*')
        str = str.slice(0, 4) + b + str.slice(len - 4, len)
        return str
    }
}

export default {
    install(Vue) {
        Vue.prototype.$enctry = new Enctry()
    }
}