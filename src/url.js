import Dom from './dom'

const HTTPS_SECURE_KEYWORD = 'https'
const HTTPS_SECURE_COLOR = '#1b7143'

const PROTOCOL_DELIMITER_KEYWORD = '://'
const PROTOCOL_DELIMITER_COLOR = '#9a9b9c'

class Url {
    static isHttps (url) {
        return url.startsWith('https://')
    }

    static handle (url, coloredHttps) {
        if (this.isHttps(url)) {
            if (coloredHttps) {
                url = Dom.paintKeyword(url, HTTPS_SECURE_KEYWORD, HTTPS_SECURE_COLOR)
                url = Dom.paintKeyword(url, PROTOCOL_DELIMITER_KEYWORD, PROTOCOL_DELIMITER_COLOR)
                return url
            } else {
                return url
            }
        } else {
            return url.replace('http://', '')
        }
    }
}

export default Url
