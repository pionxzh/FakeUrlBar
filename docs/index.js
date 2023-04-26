(function () {
    if (window.FakeUrlBar === undefined) return

    const fakeTopHeight = 100

    window.addEventListener('fakeUrlBarActive', e => {
        console.log('activated')
        document.getElementById('github-clone').style.top = `${fakeTopHeight}px`

        const controlPanel = document.getElementById('control')
        controlPanel.classList.remove('blur')

        const fakeJail = document.getElementById('scroll-jail')
        fakeJail.scrollTo({
            top: controlPanel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    })


    const fakeUrlBar = new window.FakeUrlBar({
        url: 'https://www.g00gle.com',
        tabCount: 26,
        highlightHttps: true,
        fakeTopHeight,
    })
    fakeUrlBar.init()

    const isMobile = fakeUrlBar.isMobile()
    console.log(`platform: ${isMobile ? 'mobile' : 'desktop'}`)
    if(!isMobile) {
        document.querySelector('main').style.paddingTop = `64px`
        document.getElementById('control').classList.remove('blur')
        document.getElementById('github-clone').style.top = `57px`
    }

    // ================================================ //
    // The following code is just for demo controlling  //
    // ================================================ //

    const urlEl = window.document.getElementById('url')
    const urlBtn = window.document.getElementById('url-btn')
    const tabEl = window.document.getElementById('tab-count')
    const httpsLockEl1 = window.document.getElementById('https-lock-1')
    const httpsLockEl2 = window.document.getElementById('https-lock-2')

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

    setUrl('https://www.g00gle.com')
    setTabCount(26)
    true ? httpsLockEl2.click() : httpsLockEl1.click()

    urlBtn.addEventListener('click', e => {
        const newUrl = urlEl.value
        for (let i = 1; i <= newUrl.length; i++) {
            setTimeout(() => {
                setUrl(newUrl.substr(0, i))
            }, 100 * i)
        }
    })

    tabEl.addEventListener('change', e => {
        setTabCount(tabEl.value)
    })

    document.getElementById('plus').addEventListener('click', e => {
        setTabCount(parseInt(tabEl.value) + 1)
    })

    document.getElementById('minus').addEventListener('click', e => {
        setTabCount(parseInt(tabEl.value) - 1)
    })

    httpsLockEl1.addEventListener('click', e => {
        setHttps(false)
    })

    httpsLockEl2.addEventListener('click', e => {
        setHttps(true)
    })

    document.getElementById('demo-1').addEventListener('click', e => {
        const urlList = [
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
