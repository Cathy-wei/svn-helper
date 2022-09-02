## svn变更单处理

### 使用方法
1.需要安装`Node16.7.0`以上版本，版本过低跑不起来

安装地址：[Node.js (nodejs.org)](https://nodejs.org/zh-cn/)

2.下载安装包

```bash
# 全局安装包
npm install -g svn-helper-crm
```

3.使用脚手架工具

```bash
# 使用指令
crm3

# 根据指令提示输入
请输入项目名称：输入你当前的项目
请输入项目全路径：输入项目根目录所在的全路径，不是相对路径
```

`projectName`为提取变更单项目名称，`fullPath`为项目根地址全路径

脚手架将在输入指令的目录下新建`record.json`文件，`M`为变更文件路径，`A`为新增文件路径

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
