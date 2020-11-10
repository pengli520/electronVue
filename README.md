<!--
 * @Author: your name
 * @Date: 2020-10-28 10:53:30
 * @LastEditTime: 2020-11-09 11:32:31
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