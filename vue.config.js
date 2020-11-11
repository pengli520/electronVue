/*
 * @Author: your name
 * @Date: 2019-10-31 17:02:17
 * @LastEditTime: 2020-11-11 16:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MRStarBurstWeb2\vue.config.js
 */
// if (process.env.NODE_ENV === "production" || true) {
//   // 打包不同平台的 ffmpeg 到 app
//   const ffmpegBasePath = "./node_modules/ffmpeg-static/bin/"; // ffmpeg-static
//   const ffprobeBasePath = "./node_modules/ffprobe-static/bin/"; // ffprobe-static
//   const ffmpegPath = path.join(
//     ffmpegBasePath,
//     platform,
//     arch,
//     platform === "win32" ? "ffmpeg.exe" : "ffmpeg"
//   );
//   const ffprobePath = path.join(
//     ffprobeBasePath,
//     platform,
//     arch,
//     platform === "win32" ? "ffprobe.exe" : "ffprobe"
//   );
//   plugins.push(
//     // 复制二进制文件到core文件夹中
//     new CopyWebpackPlugin([
//       {
//         from: path.join(__dirname, ffmpegPath),
//         to: path.join(__dirname, "core"),
//         ignore: [".*"]
//       },
//       {
//         from: path.join(__dirname, ffprobePath),
//         to: path.join(__dirname, "core"),
//         ignore: [".*"]
//       }
//     ]),
//     // 调整二进制文件的权限
//     new PermissionsOutputPlugin({
//       buildFiles: [
//         {
//           path: path.resolve(__dirname, "core/ffmpeg"),
//           fileMode: "777"
//         },
//         {
//           path: path.resolve(__dirname, "core/ffprobe"),
//           fileMode: "777"
//         }
//       ]
//     })
//   );
// }

module.exports = {
  css: {
    sourceMap: false,
    extract: false,
    loaderOptions: {
      sass: {
        data: `@import '@/assets/scss/index.scss';`
      }        
    }
  }
}