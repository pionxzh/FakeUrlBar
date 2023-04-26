# FakeUrlBar

Update: This is still working on Chrome latest version (v112) in 2023.

This is a POC for a new phishing technique called "[The Inception Bar](https://jameshfisher.com/2019/04/27/the-inception-bar-a-new-phishing-method/)" which is described in detail in a blog post by Jim fisher, involves creating a fake address bar that appears when the real address bar of the browser is hidden.

The implementation of this technique involves the following steps:
- Detection of address bar hiding by monitoring changes to `window.innerHeight`.
- Silently display the fake address bar at the top of the page.
- Use of a technique called "Scroll Jail" to prevent the real address bar from appearing when the user scrolls the page.

![screenshot](/screenshot/example.png)

[DEMO](https://pionxzh.github.io/FakeUrlBar/)

## Usage

```javascript
window.addEventListener('fakeUrlBarActive', e => {
    /* do something when the fakeUrlBar showed/activated */
})

let fakeUrlBar = new window.FakeUrlBar({
    url: 'https://g00gle.com',  // The fake url address
    tabCount: 87,               // The number show in the tab button
    highlightHttps: true,       // Decide whether highlight the secure lock
    fakeTopHeight: 100          // The height of the fakeTop hide on the top of the page
})

// start to listen on the hiding of address bar
fakeUrlBar.init()
```
