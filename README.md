# 文件结构调整

开发文件夹调整为dev
部署文件夹为app


# 项目生成说明

默认已安装好npm、bower和grunt
下载依赖：

```
npm install
```

```
bower install
```

将gruntConfit文件中的第三方库复制到开发版（dev文件夹）的libs

```
grunt setup
```

生成build版（build文件夹，生产版本预览，未压缩）

```
grunt build
```

最终生产版本(app文件夹)
```
grunt deploy
```


