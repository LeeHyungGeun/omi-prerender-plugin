'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

var list = []; // store a data to inject js codes. { data, outputPath, outputName, fileName }

var OmiPrerender = function () {
  function OmiPrerender() {
    _classCallCheck(this, OmiPrerender);
  }

  _createClass(OmiPrerender, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.hooks.compilation.tap('OmiPrerenderPlugin', function (compilation) {
        HtmlWebpackPlugin.getHooks && HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('OmiPrerenderPlugin', function (data, cb) {
          var outputPath = compiler.outputPath;
          var outputName = data.plugin.childCompilationOutputName;
          var assetJson = data.plugin.assetJson || [];
          var files = JSON.parse(assetJson);
          files.forEach(function (fileName) {
            list.push({
              data,
              outputPath,
              outputName,
              fileName
            });
          });
          cb(null, data);
        });
      });
      // done
      compiler.hooks.done.tap('done', function () {
        injectJs(list); // inject JS into JS assets
      });
    }
  }]);

  return OmiPrerender;
}();

// inject JS into JS assets


function injectJs(list) {
  list.forEach(function (_ref) {
    var data = _ref.data,
        outputPath = _ref.outputPath,
        outputName = _ref.outputName,
        fileName = _ref.fileName;

    if (/\.(js|ts)$/.test(fileName)) {
      var jsPath = path.resolve(outputPath, fileName);
      console.log(jsPath);
      var htmlPath = path.resolve(outputPath, outputName);
      var $ = cheerio.load(data.html);
      var jscode = fs.readFileSync(jsPath, 'utf8');
      $('body').append('<script>' + jscode + '</script>');
      fs.writeFileSync(htmlPath, $.html(), function () {});
    }
  });
}

module.exports = OmiPrerender;