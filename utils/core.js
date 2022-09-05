import shell from "shelljs";
import { copyFile, writeFile } from "./file";
import { convertObjToArray } from "./transform"

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
export function getSvnEditPath(basePath, projectName) {
  const result = shell.exec(`svn status ${basePath}`, { silent: true });
  const stdRecord = result.stdout.split("\n");
  if (Array.isArray(stdRecord)) {
    splitRecord(stdRecord, projectName);
  }
}
