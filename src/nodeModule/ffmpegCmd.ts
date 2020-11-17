/*
 * @Author: your name
 * @Date: 2020-10-28 15:55:54
 * @LastEditTime: 2020-11-17 10:56:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\nodeModule\ffmpegCmd.ts
 */
import path from "path";
const { exec, spawn } = require('child_process');
let ffmpegPath = process.env.ffmpegStatic;
let ffprobePath = process.env.ffprobeStatic;
let basePath = path.resolve(__dirname, "./../core/");
// 更新打包后 ffmpeg、ffprobe 路径
if (process.env.NODE_ENV === "production") {
  ffmpegPath = path.join(basePath,'ffmpeg.exe');
  ffprobePath = path.join(basePath,'ffprobe.exe');
}
console.log(process.env.NODE_ENV,ffmpegPath)
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
            exec(cmd, (err: any, stdout: any, stderr: any) => {
                if (err) {
                    console.error('错误', JSON.stringify(err));
                    return reject({code: 1, err: JSON.stringify(err)});
                }
                resolve({code: 0, content: this.option.absolutePath + '\\' + this.option.fileName + '.mp4'})
            });
        });

    }

    // 合并视频
    merge() {
        return new Promise((resolve, reject) => {
            exec(`${ffmpegPath} -h`, (err: string) => {
                if (err) {
                    return reject({
                        code: 1,
                        err: err.toString(),
                    })
                }
                process.chdir(this.option.absolutePath)
                const mergeVideo = spawn(`${ffmpegPath}`, ['-y', '-f', 'concat', '-safe', 0, '-i', '1.txt', '-c', 'copy', `${this.option.fileName}.mp4`]);
                mergeVideo.stdout.on('data', (data: any) => {
                    console.log(`stdout--------: ${data}`);
                });
                mergeVideo.stderr.on('data', (data: any) => {
                    console.error(`stderr: ${data}`);
                });
                mergeVideo.on('close', (code: number) => {
                    console.log(`子进程退出，退出码 ${code}`);
                });
                mergeVideo.on('close', (code: number) => {
                    if (code !== 0) {
                      console.log(`ps 进程退出，退出码 ${code}`);
                        return reject({
                            code: 1,
                            err: '程序错误',
                        })
                    } else {
                        resolve({
                            code: 0,
                            content: this.option.absolutePath + '\\' + this.option.fileName + '.mp4'
                        })
                    }
                });
            })
        })
    }
}