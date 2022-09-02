## svn变更单处理

### 使用方法

1.下载安装包

```bash
# 全局安装包
npm install -g svn-helper-crm
```

2.使用脚手架工具

```bash
# 使用指令
crm3
```

![image-20220902163037012](https://git.poker/cloudhao1999/image-hosting/blob/master/20220902/image.6d0pav7nx4w0.webp?raw=true)

`projectName`为提取变更单项目名称，`fullPath`为项目根地址全路径

脚手架将在输入指令的路径新建`record.json`文件，`M`为变更文件路径，`A`为新增文件路径

```json
{
  "M": [
    "/Users/cloudhao/Documents/workspace/Work/Project/pom.xml",
    "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/analy/controller/MainController.java"
  ],
  "A": [
  "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/analy/fragment/BctionDetailHistory.java",
    "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/analy/fragment/AolisticCostView.java",
    "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/analy/fragment/bctionDetailHistory-tpl.html",
    "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/bita/plugs/moment.min.js",
    "/Users/cloudhao/Documents/workspace/Work/Project/src/main/java/com/company/xxx/bita/plugs/vue2.js"
  ]
}
```

同时会将变更与新增文件整合成与原工程相同的目录结构，在`new`文件夹内
