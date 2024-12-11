// 配置多环境
module.exports = {
    dev: {
        DESCN:'开发环境',
        API_BASE_URL:'http://localhost:8160',
    },
    prod: {
        DESCN:'线上环境',
	    API_BASE_URL:'http://159.75.109.161:8160',
    }
}

