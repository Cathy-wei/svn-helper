import { getSvnEditPath } from './util'
import inquirer from 'inquirer'

const promptList = [{
    type: 'input',
    message: '请输入项目名称:',
    name: 'projectName',
},{
    type: 'input',
    message: '请输入项目全路径:',
    name: 'fullPath',
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
    if (answers.projectName && answers.fullPath) {
        getSvnEditPath(answers.fullPath, answers.projectName);
    }
})