/*
 * @Author: your name
 * @Date: 2020-10-28 15:55:54
 * @LastEditTime: 2020-11-05 15:47:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\ffmpegCmd.ts
 */
const child = require('child_process');
interface Option {
    absolutePath: string; // 绝对地址
}
export default class ffmpegCmd {
    option: Option;
    constructor(option: Option) {
        this.option = option;
        this.init()
    }
    init() {
        const times = +new Date();
        const cmd = `ffmpeg -y -f concat -safe 0 -i 1.txt -c copy ${times}.mp4`
        process.chdir(this.option.absolutePath)
        console.log(process.cwd(), this.option.absolutePath)
        child.exec(cmd, (err: any, stdout: any, stderr: any) => {
            if (err) {
                console.error('错误', JSON.stringify(err));
                return;
            }
            console.log(stdout);
        });
    }
}