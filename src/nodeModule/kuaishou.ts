/*
 * @Author: your name
 * @Date: 2020-11-23 15:55:05
 * @LastEditTime: 2020-11-23 17:15:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\src\nodeModule\kuaishou.ts
 */
const got = require('got');
interface Option {
    userUrl?: String; // 用户主页分享地址
    saveDirectory?: string; // 视频保存地址
}
 export default class KuaiShou {
    // 条数
    count: number = 18
    max_cursor: number = 0
    option: any;
    path: string = 'https://c.kuaishou.com/rest/kd/feed/profile';
    constructor(option?: Option) {
        this.option = option;
        this.init(this.path);
    }

    init(path: string){
        const client = got.extend({
            headers: {
                "Host": "live.kuaishou.com",
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Cookie': 'clientid=3;did=web_6761e010f2f49d8437bf1d6c8e994582;client_key=65890b29;didv=1606117714000',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
            }
        });
        client.post(path, {
            json: {
                count: this.count,
                eid: "3x824nwsd33ca5e",
                pcursor: "1.60005729E12",
            }
        }).then((res: any) => {
            console.log('----', Object.keys(res), res)
        })
        .catch((err: any) => {
            console.log(err)
        });
    }
 }