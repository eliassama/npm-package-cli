import { AnswersType } from "./index";
import { execSync } from 'child_process';

export async function create(basicAnswers: AnswersType) {
  const gitCommandArray : string[] = [
    "git init",
    "git add .",
    'git commit -m "first commit"',
    "git branch dev",
    `git remote add origin ${basicAnswers.sshRepositoryUrl}`
  ]
  for (let command of gitCommandArray){
    await execSync(command, { cwd: basicAnswers.pkgPath })
  }
}
