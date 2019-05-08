import Dom from './dom'
import Url from './url'
import Env from './environment'
import ScrollJail from './scrollJail'

import FAKE_EL_HTML from './fakeEl.html'
import FAKE_EL_CSS from './fakeEl.css'

class FakeUrlBar {
    /**
     * Constructor of the FakeUrlBar.
     * @param {string}  config.url - Url of the fakeUrlBar's address(url).
     * @param {int}     config.tabCount - The number show in the tab button.
     * @param {bool}    config.highlightHttps - Decide whether highlight the secure lock.
     * @param {int}     config.fakeTopHeight - The height of the fakeElement hide on the top of page.
     */
    constructor ({ url = 'https://example.com', tabCount = 1, highlightHttps = true, fakeTopHeight = 0 } = {}) {
        this.el = null

        this.url = url
        this.tabCount = tabCount
        this.highlightHttps = highlightHttps
        this.fakeTopHeight = fakeTopHeight
        this._isMobile = Env.isMobile()
        this._displayed = false

        this.scrollJail = new ScrollJail(this)
    }

    isDisplayed () {
        return this._displayed
    }

    isMobile () {
        return this._isMobile
    }

    createElement () {
        Dom.injectStyle(FAKE_EL_CSS)

        this.el = document.createElement('div')
        this.el.innerHTML = FAKE_EL_HTML
        this.el = this.el.firstChild
    }

    setUrl (url) {
        this.url = url
        if (!this._displayed) return

        const colorUrl = Url.handle(this.url, this.highlightHttps)
        let urlEl = window.document.querySelector('#fakeurlbar .fub-url-input')
        urlEl.innerHTML = colorUrl

        let httpsLockEl = window.document.querySelector('#fakeurlbar .fub-url-secure-lock')
        if (this.highlightHttps) {
            httpsLockEl.classList.add('enable')
        } else {
            httpsLockEl.classList.remove('enable')
        }
    }

    setTabCount (tabCount) {
        this.tabCount = tabCount
        if (!this._displayed) return

        let tabBtnEl = window.document.querySelector('#fakeurlbar .fub-tab-button-text')
        tabBtnEl.textContent = tabCount
    }

    setHttps (https) {
        this.highlightHttps = https
        if (!this._displayed) return

        this.setUrl(this.url)
    }

    setUrlBarDisplay (isShow) {
        this.el.style.display = isShow ? 'flex' : 'none'
    }

    appendToPage () {
        document.body.appendChild(this.el)
        this._displayed = true

        this.setUrl(this.url)
        this.setTabCount(this.tabCount)
        this.setHttps(this.highlightHttps)

        this.setUrlBarDisplay(true)
    }

    init () {
        if (this._isMobile) {
            this.createElement()
            this.scrollJail.init()
        } else {
            // PC will show the el right after start
            // and active the scrollJail
            this.createElement()
            this.appendToPage()
            this.scrollJail.active()
        }
    }
}

export default FakeUrlBar
