# node-ts-template

这是一个脚手架，项目目的是用 nodejs+typescript 创建一个空项目

支持使用`create-app-git`命令一键安装。`create-app-git init node-ts-template`或者`npx create-app-git init node-ts-template`

## 命令

1. `dev`开发模式，执行启动就好，默认端口 8082
2. `build`编译 ts 文件到 js
3. `start`启动编译好的 js 文件

## 启动

1. 执行`npm run build`生成可执行文件
2. 使用守护进程启动项目。根目录下有 pm2 的配置文件`pm2 start pm2.json`
