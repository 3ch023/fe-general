const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   performance: {hints: "warning"},
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'dependencies' ? 'clientlib-dependencies/[name].js' : 'clientlib-site/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
      }),
      new FileManagerPlugin({
          onEnd: {
              copy: [
                  { source: './dist/clientlib-site/site.js',
                    destination: '../ui.apps/src/main/content/jcr_root/apps/fe-general' + '/clientlibs/clientlib-site/js' },
                  { source: './dist/clientlib-site/site.css',
                      destination: '../ui.apps/src/main/content/jcr_root/apps/fe-general' + '/clientlibs/clientlib-site/css' }
              ]
          }
      })
   ],
   devServer: {
      inline: true,
      proxy: [{
         context: ['/content', '/etc.clientlibs'],
         target: 'http://localhost:4502',
      }]
   }
});