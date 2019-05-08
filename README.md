# FakeUrlBar

A new trick to fake your address bar.This demo page provides the basic api for using.

[DEMO](https://pionxzh.github.io/FakeUrlBar/)

## Use Case

First of all, require the script from repo's folder `/dist`.

By default, the script will export the `FakeUrlBar` to global.
```javascript
if (window.FakeUrlBar === undefined) return

window.addEventListener('fakeUrlBarActive', e => {
    /* do something when the fakeUrlBar showed/actived */
})

let fakeUrlBar = new window.FakeUrlBar({
    url: 'https://g00gle.com',  // The fake url address
    tabCount: 87,               // The number show in the tab button
    highlightHttps: true,       // Decide whether highlight the secure lock
    fakeTopHeight: 100          // The height of the fakeTop hide on the top of the page
})

// start to listen the hidden of chrome's address bar
fakeUrlBar.init()
```

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

```
