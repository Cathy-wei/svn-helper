const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

function copyFile(source, basePath, projectName) {
  source.forEach((item) => {
    const lastIndex = item.split(projectName);
    const dest = path.resolve(process.cwd(), basePath + projectName + lastIndex[1]);
    fs.cp(item, dest, { recursive: true }, (err) => {});
  });
}

function writeFile(filename, content) {
    fs.writeFile(filename, content, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  }

function convertObjToArray(obj) {
  const arr = [];
  for (const key in obj) {
    arr.push(...obj[key]);
  }
  return arr;
}

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

function getSvnEditPath(basePath, projectName) {
  const result = shell.exec(`svn status ${basePath}`, { silent: true });
  const stdRecord = result.stdout.split("\n");
  if (Array.isArray(stdRecord)) {
    splitRecord(stdRecord, projectName);
  }
}

module.exports = {
  getSvnEditPath,
};
