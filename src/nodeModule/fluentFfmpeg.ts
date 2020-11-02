/*
 * @Author: your name
 * @Date: 2020-10-28 15:58:16
 * @LastEditTime: 2020-10-28 17:21:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\fluentFfmpeg.ts
 */
const ffmpeg = require('fluent-ffmpeg');

const path = require('path');
export default class fluentFfmpeg{
    constructor(option: any) {
        this.init()
    }
    init() {
    console.log(ffmpeg.path);
        process.chdir('dist_electron')
        console.log(process.cwd())
        console.time() 
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