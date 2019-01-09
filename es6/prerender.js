const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const list = []; // store a data to inject js codes. { data, outputPath, outputName, fileName }

class OmiPrerender {
  apply (compiler) {
    compiler.hooks.compilation.tap('OmiPrerenderPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks && HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'OmiPrerenderPlugin',
        (data, cb) => {
          const outputPath = compiler.outputPath;
          const outputName = data.plugin.childCompilationOutputName;
          const assetJson = data.plugin.assetJson || [];
          const files = JSON.parse(assetJson);
          files.forEach((fileName) => {
             list.push({
               data,
               outputPath,
               outputName,
               fileName,
             });
          });
          cb(null, data)
        } 
      )
    });
    // done
    compiler.hooks.done.tap('done', () => {
      injectJs(list); // inject JS into JS assets
    })
  }
}

// inject JS into JS assets
function injectJs(list) {
    list.forEach(({ data, outputPath, outputName, fileName }) => {
      if (/\.(js|ts)$/.test(fileName)) {
        const jsPath = path.resolve(outputPath, fileName);
        console.log(jsPath);
        const htmlPath = path.resolve(outputPath, outputName);
        const $ = cheerio.load(data.html);
        const jscode = fs.readFileSync(jsPath, 'utf8');
        $('body').append('<script>' + jscode + '</script>');
        fs.writeFileSync(htmlPath, $.html(), () => {});
      }
    });
}

module.exports = OmiPrerender;