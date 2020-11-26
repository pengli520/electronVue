/*
 * @Author: your name
 * @Date: 2020-11-25 11:46:45
 * @LastEditTime: 2020-11-25 16:20:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\src\nodeModule\huoshan.ts
 */

const got = require('got');
const qs = require('qs');
interface Option {
    userUrl?: String; // 用户主页分享地址
    saveDirectory?: string; // 视频保存地址
}
 export default class KuaiShou {
    // 条数
    count: number = 18
    max_cursor: number = 0
    option: any;
    shareUrl: string = 'https://share.huoshan.com/hotsoon/s/eOvnCiybBd8/';
    getListUrl: string = ' https://share.huoshan.com/api/user/video?';
    // 用id换回无水印video_id
    noVideoUrl: string = 'https://share.huoshan.com/api/item/info?item_id=';
    // 无水印地址
    videoUrl: string = 'https://api.huoshan.com/hotsoon/item/video/_source/?video_id=';
    constructor(option?: Option) {
        this.option = option;
        this.getUrl(this.shareUrl);
    }

    getUrl(shareUrl: string) {
        got(shareUrl).then((res: any) => {
            const to_user_id = qs.parse(res.req.path.split('?')[1]).to_user_id;
            this.getVideoList(to_user_id);
        })
        .catch((err:any) => {
            console.log(err)
        })
    }

    // 获取视频列表（有水印）
    getVideoList(to_user_id: string){
        const params = {
            encrypted_id: to_user_id,
            offset: 0,
            count: 30,
        };
        got(this.getListUrl + qs.stringify(params))
        .then(async (res: any) => {
            const body = JSON.parse(res.body);
            const videoArr: any = [];
            if (+body.status_code === 0) {
                for (let item of body.data) {
                    await got(this.noVideoUrl + item.item_id)
                    .then((res: any) => {
                        const body = JSON.parse(res.body);
                        if (+body.status_code === 0) {
                            const video_id = qs.parse(body.data.item_info.url.split('?')[1]).video_id;
                            videoArr.push({
                                videoUrl: this.videoUrl + video_id,
                                cover: body.data.item_info.cover
                            })
                        }
                    })
                    .catch((err: any) => {
                        console.log(err)
                    })
                }
                console.log(videoArr);
            } else {

            }
        })
        .catch((err: any) => {
            console.log(err)
        })
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