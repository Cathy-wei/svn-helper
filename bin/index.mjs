#! /usr/bin/env node
import e from "shelljs";
import n from "fs";
import s from "path";
import t from "inquirer";
function o(e, t, o, r) {
  const i = {
      A: "新增",
      C: "冲突",
      D: "删除",
      I: "忽略",
      M: "修改",
      R: "替换",
      X: "未纳入版本控制的目录,被外部引用的目录所创建",
      "!": "该项目已遗失(被非 svn 命令删除)或不完整",
      "~": "版本控制下的项目与其它类型的项目重名"
    },
    c = {},
    a = {};
  e.forEach((e) => {
    const n = i[e[0]],
      s = /\s/.test(n),
      t = e.indexOf(o),
      l = e.substring(t),
      p = e.substring(t).replace(o, r);
    !s && p && (c[n] ? (c[n].push(p), a[n].push(l)) : ((c[n] = [p]), (a[n] = [l])));
  }),
    ["", "undefined"].forEach((e) => delete a[e]),
    ["删除", "忽略", "", "undefined"].forEach((e) => delete a[e]);
  const l = JSON.stringify(c, null, 2).replace(/\\\\/g, "/").replace(/\\r/g, "");
  var p, f;
  (p = "record.json"),
    (f = l),
    n.writeFile(p, f, (e) => {
      if (e) throw e;
      console.log("The file has been saved!");
    }),
    (function (e, t, o) {
      e.forEach((e) => {
        const r = (e = e.split("\r")[0]).split(o),
          i = s.resolve(process.cwd(), t + o + r[1]);
        n.existsSync(e) &&
          n.cp(e, i, { recursive: !0 }, (n) => {
            console.log(n, e, i);
          });
      });
    })(
      (function (e) {
        const n = [];
        for (const s in e) n.push(...e[s]);
        return n;
      })(a),
      "./new/",
      t
    );
}
console.log(
  (function () {
    const e = process.platform;
    return "darwin" === e ? "mac" : "win32" === e ? "windows" : void 0;
  })()
),
  t
    .prompt([
      { type: "input", message: "请输入项目名称:", name: "projectName" },
      { type: "input", message: "请输入项目本地路径:", name: "fullPath" },
      { type: "input", message: "请输入项目SVN路径:", name: "svnPath" }
    ])
    .then((n) => {
      console.log(n),
        n.projectName &&
          n.fullPath &&
          n.svnPath &&
          (function (n, s, t) {
            const r = e.exec(`svn status ${n}`, { silent: !0 }).stdout.split("\n");
            Array.isArray(r) && o(r, s, n, t);
          })(n.fullPath, n.projectName, n.svnPath);
    });
