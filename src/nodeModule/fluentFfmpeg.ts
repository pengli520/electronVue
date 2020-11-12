/*
 * @Author: your name
 * @Date: 2020-10-28 15:58:16
 * @LastEditTime: 2020-11-12 18:15:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\fluentFfmpeg.ts
 */
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
// ffmpeg.setFfmpegPath("/ffmpeg/win/ffmpeg.exe");
// ffmpeg.setFfprobePath("/ffmpeg/win/ffprobe.exe")
interface Option {
    absolutePath: string; // 绝对地址
    fileName: number; // 文件名字
}
export default class fluentFfmpeg{
    option: Option;
    constructor(option: any) {
        this.option = option;
        this.init()
    }
    init() {
    console.log(ffmpeg.path);
        process.chdir(this.option.absolutePath)
        console.log(process.cwd())
        console.time() 
        console.log(ffmpeg)
        ffmpeg('1.mp4')
        .inputOptions(
            '-ss', '00:00:02',
            '-i', '1.mp4',  '-r', '1', '-q:v', 
            '100', '-vframes', '50',  '-f', 'image2', 'image-%d.png'
        ).on('error', function (err: any) {
            console.log('处理发生错误: ' + err.message);
        }).on('end', function () {
            console.log('处理成功');
            console.timeEnd()
        }).save(path.join(__dirname, 'second.mp4'));
    }
}