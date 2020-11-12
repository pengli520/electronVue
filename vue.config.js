/*
 * @Author: your name
 * @Date: 2020-10-28 15:18:37
 * @LastEditTime: 2020-11-12 18:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\vue.config.js
 */
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");
console.log('ffmpegStatic:',ffmpegStatic.path, 'ffprobeStatic:',ffprobeStatic.path)
module.exports = {
  css: {
    sourceMap: false,
    extract: false,
    loaderOptions: {
      sass: {
        data: `@import '@/assets/scss/index.scss';`
      }        
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "ffmpegGUI",
        appId: "com.xmit.ffmpegGUI",
        win: {
          target: [
            {
              target: "nsis"
            }
          ],
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true,
          allowElevation: true,
        },
        extraResources: {
          from: "./public/ffmpeg/",
          to: "./public/ffmpeg/",
        }
      }
    }
  }
}