import { AnswersType } from './index';
import * as path from 'path';
import { filepath } from '../../../utils';

export function create(basicAnswers: AnswersType) {
  const CopyFileArray = ['.editorconfig', '.eslintrc.js', '.prettierrc'];

  const CreateFileArray = [
    path.join(basicAnswers.srcDir, `${basicAnswers.mainName}.ts`),
  ];

  const CreateDirectory = [
    basicAnswers.srcDir,
    basicAnswers.outDir,
    '__test__',
  ];

  let promise = Promise.resolve(basicAnswers);

  for (const dirName of CreateDirectory) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      await filepath.recursionMkdir(path.join(basicAnswers.pkgPath, dirName));
      return basicAnswers;
    });
  }

  for (const fileName of CreateFileArray) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      await filepath.writeFile(path.join(basicAnswers.pkgPath, fileName), '', {
        overwrite: false,
      });
      return basicAnswers;
    });
  }

  for (const fileName of CopyFileArray) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      await filepath.copyFile(
        path.join(basicAnswers.pkgPath, fileName),
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'template',
          'ts-package',
          fileName,
        ),
        { overwrite: false },
      );
      return basicAnswers;
    });
  }

  return promise;
}
