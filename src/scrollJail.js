class ScrollJail {
    constructor (fakeUrlBar) {
        this.el = null
        this.scrollController = null

        this.scrollJailed = false
        this.fakeUrlBar = fakeUrlBar
        this.initialHeight = window.innerHeight
        this.fakeTopHeight = this.fakeUrlBar.fakeTopHeight
    }

    // create the fake top to prevent trigger url bar appear again
    createFakeTop () {
        let fakeTopEl = document.createElement('div')
        fakeTopEl.style.height = `${this.fakeTopHeight}px`

        this.el.appendChild(fakeTopEl)
    }

    createElement () {
        this.el = document.createElement('div')
        this.el.id = 'scroll-jail'
        this.el.style.top = '57px'
        this.el.style.position = 'fixed'
        this.el.style.overflow = 'scroll'
        // this.el.style.width = `${window.innerWidth}px`
        this.el.style.height = `${window.innerHeight}px`
        this.el.style.margin = window.document.body.style.margin
        window.document.body.style.margin = 0

        this.createFakeTop()

        // move everything into the scrollJailEl
        while (document.body.children.length > 0) {
            const child = document.body.children[0]
            this.el.appendChild(child)
        }
    }

    bindResize () {
        window.onresize = () => {
            this.fakeUrlBar.fixUrlWidth()
            // Chrome has hide its URL bar
            this.active()
        }
    }

    active () {
        const oldScrollY = window.scrollY
        if (window.innerHeight > this.initialHeight && this.scrollJailed === false) {
            this.createElement()

            document.body.appendChild(this.el)
            this.fakeUrlBar.appendToPage()

            this.scrollTo(oldScrollY + this.fakeTopHeight + this.fakeUrlBar.el.style.height)

            this.bindScroll()
            this.scrollJailed = true

            let event = new CustomEvent('fakeUrlBarActive')
            window.dispatchEvent(event)
        }
    }

    bindScroll () {
        this.el.onscroll = e => {
            clearTimeout(this.scrollController)
            this.scrollController = setTimeout(() => {
                // Stopped scrolling. Reset the jail.
                this.el.scrollTo({
                    top: Math.max(this.el.scrollTop, this.fakeTopHeight),
                    left: 0,
                    behavior: 'smooth'
                })
            }, 100)
        }
    }

    scrollTo (scrollTop) {
        this.el.scrollTop = scrollTop
    }

    init () {
        this.bindResize()
    }
}

export default ScrollJail
