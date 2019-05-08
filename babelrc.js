module.exports = function (api) {
    api.cache(true);

    const presets = ["es2015-rollup", {module: false}, {comments: false}];
    // const plugins = [ ... ];

    return {
      "presets": presets,
      // "plugins": plugins
      "comment": false,
      "minified": true
    };
}
