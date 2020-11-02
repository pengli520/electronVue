/*
 * @Author: your name
 * @Date: 2020-10-28 15:55:54
 * @LastEditTime: 2020-10-28 16:26:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\ffmpegCmd.ts
 */
const child = require('child_process');

export default class ffmpegCmd {
    constructor() {
        this.init()
    }
    init() {
        const cmd = `ffmpeg -ss 00:00:02  -i 1.mp4  -r 1 -q:v 100 -vframes 50  -f image2 image-%d.png`
        process.chdir('dist_electron')
        console.log(process.cwd())
        child.exec(cmd, (err: any, stdout: any, stderr: any) => {
            if (err) {
                console.error('错误', JSON.stringify(err));
                return;
            }
            console.log(JSON.stringify(stdout));
        });
    }
}