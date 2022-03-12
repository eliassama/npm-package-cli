import { AnswersType } from './index';
import * as path from 'path';
import { filepath } from '../../../utils';

export function create(basicAnswers: AnswersType) {
  const CopyFileArray = [
    { templateFileName: 'editorconfig.tpl', fileName: '.editorconfig' },
    { templateFileName: 'eslintrc.js.tpl', fileName: '.eslintrc.js' },
    { templateFileName: 'prettierrc.tpl', fileName: '.prettierrc' },
  ];

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

  for (const fileInfo of CopyFileArray) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      await filepath.copyFile(
        path.join(basicAnswers.pkgPath, fileInfo.fileName),
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'template',
          'ts-package',
          fileInfo.templateFileName,
        ),
        { overwrite: false },
      );
      return basicAnswers;
    });
  }

  return promise;
}
