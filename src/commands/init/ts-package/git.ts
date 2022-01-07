import { AnswersType } from "./index";
import { execSync } from 'child_process';

export async function create(basicAnswers: AnswersType) {
  // FIXME: 修复执行失败的问题。目前莫名其妙好了，以后有时间再去看看能否复现。
  // const gitCommandArray : string[] = [
  //   "git init",
  //   "git add .",
  //   'git commit -m "first commit"',
  //   "git branch dev",
  //   `git remote add origin ${basicAnswers.repository}`
  // ]
  // for (let command of gitCommandArray){
  //   // await execSync(command, { cwd: basicAnswers.initPath })
  // }
}
