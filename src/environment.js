import Bowser from 'bowser'

class Environment {
    static isMobile () {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        const browser = Bowser.getParser(userAgent)

        return browser.getPlatformType() === 'mobile'
    }
}

export default Environment
