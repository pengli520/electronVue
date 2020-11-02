/*
 * @Author: your name
 * @Date: 2020-10-27 14:40:54
 * @LastEditTime: 2020-11-02 17:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\node\douYiVideo.js
 */

const got = require('got');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const os = require('os');
const qs = require('qs');

const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();

interface Option {
    userUrl: String; // 用户主页分享地址
}
app.use(bodyParser.urlencoded({ extended: false }));

export default class downVideo  {
    // 条数
    count: number = 2
    max_cursor: number = 0
    aid: number = 1128
    // 视频地址
    videoUrl: string = 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id='
    // 用户列表
    baseUrl: string = 'https://www.amemv.com/web/api/v2/aweme/post/?';
    option: Option;
    constructor(option: Option) {
        // console.log(option)
        this.option = option;
    }
    init () {
        app.listen(8001, () => {
            console.log('Example app listening on port 3000!');
        });
    }
    // 用户分享码解析
    shareCodeParsing() {
        return got(this.option.userUrl, {
            timeout: 10000
        }).then((response: any) => {
            let arr = response.url.split('?');
            // 获取用户 sec_uid
            let param = qs.parse(arr[1]);
            // 条数
            param.count = this.count
            param.max_cursor = this.max_cursor
            param.aid = this.aid
            // 抖音用户数据列表
            const path = this.baseUrl + qs.stringify(param)
            console.log(path)
            return this.userInfo(path)
        }).catch((error: any) => {
            console.log('用户分享码解析' + error)
        })
    }

    // 用户视频列表
    userInfo(path: string) {
        return got(path).then((resList: any) => {
            const res = JSON.parse(resList.body);
            // 视频地址
            const videoArr = [];
            for (let item of res.aweme_list) {
                videoArr.push({
                    videoUrl: this.videoUrl.replace('playwm', 'play') + item.video.vid,
                    desc: item.desc,
                    cover: item.video.cover.url_list[0],
                });
            }
            return videoArr;
        }).catch((error: any) => {
            console.log('用户视频列表' + error)
        })
    }

    // 下载文件
    downFile(url: string, name: string) {
        const homeDir = __dirname || os.homedir()   //获取用户主目录地址
        const filename = path.join(homeDir, name)  //组装文件存放地址
        const file = fs.createWriteStream(filename)   //生成一个写入文件的流
        let httpType
        if (url.split('://')[0] === 'http') {   //判断是什么类型的请求
            httpType = http
        } else {
            httpType = https
        }

        httpType.get(url, (response: any) => {
            response.pipe(file)    //将文件流写入
            response.on('end', () => {
                console.log(filename)
            })
            response.on('error', (err: any) => {
                console.log(err)
            })
        })
    }

    // 视频地址解析
    videoParsing(path: string) {
        got(path).then((res: any) => {
            this.downFile(res.url, `${+new Date()}.mp4`)
        }).catch((err: any) => {
            console.log('视频地址解析', err)
        })
    }

}