const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

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

<<<<<<< HEAD
/**
 * @description 将对象转换为路径数组
 * @param {*} obj 变更对象
 * @returns 路径数组
 */
=======
  /**
   * @description 将对象转换为路径数组
   * @param {*} obj 变更对象
   * @returns 路径数组
   */
>>>>>>> chore: 增加注释
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
<<<<<<< HEAD
function splitRecord(record, basePath, svnPath) {
    const statusType = {
        // " ": "无修改",
        "A": "增加",
        "C": "冲突",
        "D": "删除",
        "I": "忽略",
        "M": "修改",
        "R": "替换",
        "X": "未纳入版本控制的目录,被外部引用的目录所创建",
        // "?": "未纳入版本控制",
        "!": "该项目已遗失(被非 svn 命令删除)或不完整",
        "~": "版本控制下的项目与其它类型的项目重名",
=======
function splitRecord(record, projectName) {
  const recordMap = {};
  record.forEach((item) => {
    const key = item.split("")[0];
    const path = item.split("       ")[1];
    if (recordMap[key]) {
      recordMap[key].push(path);
    } else {
      recordMap[key] = [path];
>>>>>>> chore: 增加注释
    }
    const recordMap = {};
    record.forEach((item) => {
        if (item) {
            const key = statusType[item[0]];
            // const key = item[0];
            const emptyKey = /\s/.test(key);
            const index = item.indexOf(basePath);
            const path = item.substring(index).replace(basePath, svnPath);
            if (!emptyKey && path) {
                if (recordMap[key]) {
                    recordMap[key].push(path);
                } else {
                    recordMap[key] = [path];
                }
            }

        }
    });

    // 删除不需要的文件记录
    delete recordMap["?"];
    delete recordMap[" "];
    delete recordMap["undefined"];

    // 生成修改新增记录到文件中
    const fileStr = JSON.stringify(recordMap, null, 2).replace(/\\\\/g, "\/").replace(/\\r/g, "");
    writeFile("record.json", fileStr);
    // 复制文件到指定目录
    // copyFile(convertObjToArray(recordMap), "./new/", projectName);
}

/**
 * @description 获取svn更新记录
 * @param {String} basePath 项目全路径
 * @param {String} projectName 项目名称
 */
<<<<<<< HEAD
function getSvnEditPath(basePath, projectName, svnPath) {
    const result = shell.exec(`svn status ${basePath}`, { silent: true });
    const stdRecord = result.stdout.split("\n");
    if (Array.isArray(stdRecord)) {
        splitRecord(stdRecord, basePath, svnPath);
    }
=======
function getSvnEditPath(basePath, projectName) {
  const result = shell.exec(`svn status ${basePath}`, { silent: true });
  const stdRecord = result.stdout.split("\n");
  if (Array.isArray(stdRecord)) {
    splitRecord(stdRecord, projectName);
  }
>>>>>>> chore: 增加注释
}

module.exports = {
    getSvnEditPath,
};