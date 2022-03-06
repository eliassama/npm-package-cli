import { AnswersType } from './index';
import { execSync } from 'child_process';

export function create(basicAnswers: AnswersType) {
  const gitCommandArray: string[] = [
    'git init',
    'git add .',
    `git commit -m "${basicAnswers.firstCommitMessage}"`,
    `git remote add origin ${basicAnswers.sshRepositoryUrl}`,
    'git branch dev',
  ];

  let promise = Promise.resolve(basicAnswers);
  for (let idx = 1; idx < gitCommandArray.length; ++idx) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      await execSync(gitCommandArray[idx], { cwd: basicAnswers.pkgPath });
      return basicAnswers;
    });
  }

  return promise;
}
