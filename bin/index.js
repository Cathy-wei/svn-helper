#! /usr/bin/env node
'use strict';

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shell__default = /*#__PURE__*/_interopDefaultLegacy(shell);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);

/**
 * @description 复制文件到指定目录
 * @param {*} source 源文件路径数组
 * @param {*} basePath 生成文件的目录
 * @param {*} projectName 项目名称
 */
function copyFile(source, basePath, projectName) {
    source.forEach((item) => {
        const lastIndex = item.split(projectName);
        const dest = path__default["default"].resolve(process.cwd(), basePath + projectName + lastIndex[1]);
        fs__default["default"].cp(item, dest, {recursive: true}, (err) => {
        });
    });
}

/**
 * @description 写入文件
 * @param {String} filename 文件名称
 * @param {String} content 文件内容
 */
function writeFile(filename, content) {
    fs__default["default"].writeFile(filename, content, (err) => {
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
 */
function splitRecord(record, projectName) {
  const recordMap = {};
  record.forEach((item) => {
    const key = item.split("")[0];
    const path = item.split("       ")[1];
    if (recordMap[key]) {
      recordMap[key].push(path);
    } else {
      recordMap[key] = [path];
    }
  });

  // 删除不需要的文件记录
  delete recordMap["?"];
  delete recordMap[" "];
  delete recordMap["undefined"];

  // 生成修改新增记录到文件中
  writeFile("record.json", JSON.stringify(recordMap, null, 2));
  // 复制文件到指定目录
  copyFile(convertObjToArray(recordMap), "./new/", projectName);
}

/**
 * @description 获取svn更新记录
 * @param {String} basePath 项目全路径
 * @param {String} projectName 项目名称
 */
function getSvnEditPath(basePath, projectName) {
  const result = shell__default["default"].exec(`svn status ${basePath}`, { silent: true });
  const stdRecord = result.stdout.split("\n");
  if (Array.isArray(stdRecord)) {
    splitRecord(stdRecord, projectName);
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

const promptList = [{
    type: 'input',
    message: '请输入项目名称:',
    name: 'projectName',
},{
    type: 'input',
    message: '请输入项目全路径:',
    name: 'fullPath',
}];

console.log(getPlatform());
inquirer__default["default"].prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
    if (answers.projectName && answers.fullPath) {
        getSvnEditPath(answers.fullPath, answers.projectName);
    }
});
