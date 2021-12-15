import { BasicAnswersType } from "./index";
import { execSync } from 'child_process';

export async function create(basicAnswers: BasicAnswersType) {
  // FIXME: 修复执行失败的问题
  const gitCommandArray : string[] = [
    "git init",
    "git add .",
    'git commit -m "first commit"',
    "git branch dev",
    `git remote add origin ${basicAnswers.repository}`
  ]
  for (let command of gitCommandArray){
    await execSync(command, { cwd: basicAnswers.initPath })
  }
}
