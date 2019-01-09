<h1 align="center">Omi Prerender Plugin</h1>
<p align="center">
  <em>No config, prerender plugin for Omi framework with html-webpack-plugin.</em>
</p>

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omi-prerender-plugin.svg)]()
[![npm downloads](https://img.shields.io/npm/dt/omi-prerender-plugin.svg)]()
[![Dependency Status](https://img.shields.io/david/LeeHyungGeun/omi-prerender-plugin.svg)]()
[![license](https://img.shields.io/github/license/LeeHyungGeun/omi-prerender-plugin.svg)]()

</div>

---

<div align="center">

[![NPM](https://nodei.co/npm/omi-prerender-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/omi-prerender-plugin/)

</div>

## omi-prerender-plugin

You can prerender using `omi-prerender-plugin` in webpack configuration with `html-webpack-plugin`.

## Usage
const OmiPrerenderPlugin = require('omi-prerender-plugin');

``` javascript
plugins: [
  new HtmlWebpackPlugin({
    inject: true,
    chunks:['index'],
    template: 'index.html'
    filename: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }))
  new OmiPrerenderPlugin()
]
```