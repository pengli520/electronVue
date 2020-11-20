<!--
 * @Author: your name
 * @Date: 2020-10-28 10:53:30
 * @LastEditTime: 2020-11-20 11:35:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\README.md
-->
# test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
https://v.douyin.com/JPU6cfJ/
https://www.amemv.com/web/api/v2/aweme/post/?u_code=3cc1kl0ldef9&sec_uid=MS4wLjABAAAATr4HTJGO4XQ4kOVd0_QkU9EauV1uPu7RWdKt-zd0lzuew9RT_ydkDOv8ASATZa-C&app=aweme&utm_campaign=client_share&utm_medium=ios&tt_from=copy&utm_source=copy&count=2&max_cursor=0&aid=1128

视频合并
ffmpeg -y -f concat -safe 0 -i 1.txt -c copy out.mp4

ffmpeg -i 2.mp4 -c:v libx264 -strict -2 3.mp4

ffmpeg -i 1.mp4 -t 10 -s 320x240 -pix_fmt rgb24 jidu1.gif

注意：
视频保存地址不能存在空格 修复

ffmpeg 合成视频 1.txt路径用单引号包裹

