/*
 * @Author: your name
 * @Date: 2020-10-28 15:55:54
 * @LastEditTime: 2020-11-12 11:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\ffmpegCmd.ts
 */
const child = require('child_process');
interface Option {
    absolutePath: string; // 绝对地址
    fileName: number; // 文件名字
}
export default class ffmpegCmd {
    option: Option;
    constructor(option: Option) {
        this.option = option;
    }
    init() {
        const cmd = `ffmpeg -y -f concat -safe 0 -i 1.txt -c copy ${this.option.fileName}.mp4`
        process.chdir(this.option.absolutePath)
        console.log(process.cwd())
        return new Promise((resolve, reject) => {
            child.exec(cmd, (err: any, stdout: any, stderr: any) => {
                if (err) {
                    console.error('错误', JSON.stringify(err));
                    return reject({code: 1, err: JSON.stringify(err)});
                }
                resolve({code: 0, content: this.option.absolutePath + '\\' + this.option.fileName + '.mp4'})
            });
        });

    }
}