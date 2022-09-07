#! /usr/bin/env node
import shell from "shelljs";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";

/**
 * @description 复制文件到指定目录
 * @param {*} source 源文件路径数组
 * @param {*} basePath 生成文件的目录
 * @param {*} projectName 项目名称
 */
function copyFile(source, basePath, projectName) {
  source.forEach((item) => {
    const lastIndex = item.split(projectName);
    const dest = path.resolve(process.cwd(), basePath + projectName + lastIndex[1]);
    fs.cp(item, dest, { recursive: true }, (err) => {});
  });
}

/**
 * @description 写入文件
 * @param {String} filename 文件名称
 * @param {String} content 文件内容
 */
function writeFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

/**
 * @description 将对象转换为路径数组
 * @param {*} obj 变更对象
 * @returns 路径数组
 */
function convertObjToArray(obj) {
  const arr = [];
  for (const key in obj) {
    arr.push(...obj[key]);
  }
  return arr;
}

/**
 * @description 将svn提交记录拆分成键值对
 * @param {Array} record svn记录
 * @param {String} projectName 项目名称
 * @param {String} basePath 项目本地路径
 * @param {String} svnPath svn路径前缀
 */
function splitRecord(record, projectName, basePath, svnPath) {
  const statusType = {
    // " ": "无修改",
    A: "增加",
    C: "冲突",
    D: "删除",
    I: "忽略",
    M: "修改",
    R: "替换",
    X: "未纳入版本控制的目录,被外部引用的目录所创建",
    // "?": "未纳入版本控制",
    "!": "该项目已遗失(被非 svn 命令删除)或不完整",
    "~": "版本控制下的项目与其它类型的项目重名"
  };
  const recordMap = {};
  const recordFileMap = {};
  record.forEach((item) => {
    const key = statusType[item[0]];
    // const key = item[0];
    const emptyKey = /\s/.test(key);
    const index = item.indexOf(basePath);
    const filePath = item.substring(index);
    const path = item.substring(index).replace(basePath, svnPath);
    if (!emptyKey && path) {
      if (recordMap[key]) {
        recordMap[key].push(path);
        recordFileMap[key].push(filePath);
      } else {
        recordMap[key] = [path];
        recordFileMap[key] = [filePath];
      }
    }
  });

  // 删除不需要的文件记录
  delete recordMap["?"];
  delete recordMap[" "];
  delete recordMap["undefined"];

  // 生成修改新增记录到文件中
  const fileStr = JSON.stringify(recordMap, null, 2).replace(/\\\\/g, "/").replace(/\\r/g, "");
  writeFile("record.json", fileStr);
  // 复制文件到指定目录
  copyFile(convertObjToArray(recordFileMap), "./new/", projectName);
}

/**
 * @description 获取svn更新记录
 * @param {String} basePath 项目全路径
 * @param {String} projectName 项目名称
 * @param {String} svnPath SVN路径前缀
 */
function getSvnEditPath(basePath, projectName, svnPath) {
  const result = shell.exec(`svn status ${basePath}`, { silent: true });
  const stdRecord = result.stdout.split("\n");
  if (Array.isArray(stdRecord)) {
    splitRecord(stdRecord, projectName, basePath, svnPath);
  }
}

/**
 * @description 获取平台信息
 * @returns 平台信息
 */
function getPlatform() {
  const platform = process.platform;
  if (platform === "darwin") {
    return "mac";
  } else if (platform === "win32") {
    return "windows";
  }
}

const promptList = [
  {
    type: "input",
    message: "请输入项目名称:",
    name: "projectName"
  },
  {
    type: "input",
    message: "请输入项目本地路径:",
    name: "fullPath"
  },
  {
    type: "input",
    message: "请输入项目SVN路径:",
    name: "svnPath"
  }
];

console.log(getPlatform());
inquirer.prompt(promptList).then((answers) => {
  console.log(answers); // 返回的结果
  if (answers.projectName && answers.fullPath && answers.svnPath) {
    getSvnEditPath(answers.fullPath, answers.projectName, answers.svnPath);
  }
});
// getSvnEditPath("E:\\vueProj\\ruleProj2022", "ruleProj2022", "rule/unified-rule-platform/rule-mng-web");
