class Dom {
    static appendAfter (element, newElement) {
        element.parentNode.insertBefore(newElement, element.nextSibling)
    }

    static injectStyle (css) {
        let style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = css
        document.getElementsByTagName('head').item(0).appendChild(style)
    }

    static paintKeyword (text, keyword, color) {
        return text.replace(keyword, `<font color="${color}">${keyword}</font>`)
    }
}

export default Dom
