(function () {
    if (window.FakeUrlBar === undefined) return

    window.addEventListener('fakeUrlBarActive', e => {
        console.log('actived')
        window.document.getElementById('github-clone').style.top = `${fakeTopHeight}px`

        let controlPanel = document.getElementById('control')
        controlPanel.classList.remove('blur')

        let fakeJail = window.document.getElementById('scroll-jail')
        fakeJail.scrollTo({
            top: controlPanel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    })

    let url = 'https://www.g00gle.com'
    let tabCount = 26
    let highlightHttps = true
    let fakeTopHeight = 100

    let fakeUrlBar = new window.FakeUrlBar({
        url: url,
        tabCount: tabCount,
        highlightHttps: highlightHttps,
        fakeTopHeight: fakeTopHeight
    })

    fakeUrlBar.init()

    if (fakeUrlBar.isMobile()) {
        console.log('platform: mobile')
    } else {
        console.log('platform: desktop')
    }

    // ================================================ //
    // The following code is just for demo controlling  //
    // ================================================ //

    let urlEl = window.document.getElementById('url')
    let urlBtn = window.document.getElementById('url-btn')
    let tabEl = window.document.getElementById('tab-count')
    let httpsLockEl1 = window.document.getElementById('https-lock-1')
    let httpsLockEl2 = window.document.getElementById('https-lock-2')

    function setUrl (url) {
        urlEl.value = url
        fakeUrlBar.setUrl(url)
    }

    function setTabCount (tabCount) {
        tabEl.value = tabCount
        fakeUrlBar.setTabCount(tabCount)
    }

    function setHttps (https) {
        fakeUrlBar.setHttps(https)
    }

    setUrl(url)
    setTabCount(tabCount)
    highlightHttps ? httpsLockEl2.click() : httpsLockEl1.click()

    urlBtn.addEventListener('click', e => {
        let newUrl = urlEl.value
        for (let i = 1; i <= newUrl.length; i++) {
            setTimeout(() => {
                setUrl(newUrl.substr(0, i))
            }, 100 * i)
        }
    })

    tabEl.addEventListener('change', e => {
        setTabCount(tabEl.value)
    })

    window.document.getElementById('plus').addEventListener('click', e => {
        setTabCount(parseInt(tabEl.value) + 1)
    })

    window.document.getElementById('minus').addEventListener('click', e => {
        setTabCount(parseInt(tabEl.value) - 1)
    })

    httpsLockEl1.addEventListener('click', e => {
        setHttps(false)
    })

    httpsLockEl2.addEventListener('click', e => {
        setHttps(true)
    })

    document.getElementById('demo-1').addEventListener('click', e => {
        let urlList = [
            'https://google.com',
            'facebook.com',
            'https://twitter.com'
        ]
        for (let j = 0; j < urlList.length; j++) {
            const item = urlList[j]
            for (let i = 1; i <= item.length; i++) {
                setTimeout(() => {
                    setUrl(item.substr(0, i))
                }, 100 * i + 2500 * j)
            }
        }
    })

    document.getElementById('demo-2').addEventListener('click', e => {
        for (let i = 1; i <= 87; i++) {
            setTimeout(() => {
                setTabCount(i)
            }, 100 * i)
        }
    })

    document.getElementById('demo-3').addEventListener('click', e => {
        for (let i = 1; i <= 15; i++) {
            setTimeout(() => {
                setHttps(!!(i % 2))
            }, 500 * i)
        }
    })
})()
