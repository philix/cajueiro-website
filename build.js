({
  appDir: "./js",
  baseUrl: "./",
  dir: "./build_js",

  // call with `node js/jsx-requirejs-plugin/r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./js/app.js",

  stubModules: ['jsx'],

  modules: [
    {
      name: "app",
      exclude: ["react", "JSXTransformer", "text"]
    }
  ]
})
