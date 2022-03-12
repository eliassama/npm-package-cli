import { AnswersType } from './index';
import * as fs from 'fs';
import * as path from 'path';
import * as LocalStorage from '../../../utils/local-storage';
import { filepath } from '../../../utils';

export function create(basicAnswers: AnswersType) {
  const localStorage = LocalStorage.read();
  const CopyFileArray = [
    {
      templateFileName: 'gitignore.tpl',
      fileName: '.gitignore',
      params: ['outDir'],
    },
    {
      templateFileName: 'package.json.tpl',
      fileName: 'package.json',
      params: [
        'pkgName',
        'version',
        'description',
        'mainName',
        'tsName',
        'outDir',
        'srcDir',
        'sshRepositoryUrl',
        'repositoryWebUrl',
        'httpRepositoryUrl',
        'authorName',
        'authorEmail',
        'authorUrl',
      ],
    },
    {
      templateFileName: 'README.md.tpl',
      fileName: 'README.md',
      params: ['pkgName', 'description', 'authorName', 'authorUrl'],
    },
    {
      templateFileName: 'tsconfig.json.tpl',
      fileName: 'tsconfig.json',
      params: ['outDir'],
    },
  ];
  const ReplaceData: { [index: string]: string } = {
    pkgName: basicAnswers.pkgName,
    description: basicAnswers.description,
    version: basicAnswers.initialVersion,
    outDir: basicAnswers.outDir,
    srcDir: basicAnswers.srcDir,
    mainName: `${basicAnswers.mainName}.js`,
    tsName: `${basicAnswers.tsName}.ts`,
    httpRepositoryUrl: basicAnswers.httpRepositoryUrl,
    repositoryWebUrl: basicAnswers.repositoryWebUrl,
    authorName: localStorage.author.name,
    authorUrl: localStorage.author.url,
    authorEmail: localStorage.author.email,
  };

  let promise = Promise.resolve(basicAnswers);

  for (const fileInfo of CopyFileArray) {
    promise = promise.then(async (basicAnswers: AnswersType) => {
      let file_content = fs.readFileSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'template',
          'ts-package',
          fileInfo.templateFileName,
        ),
        'utf-8',
      );

      for (const param of fileInfo.params) {
        file_content = file_content.replace(
          new RegExp(`\\\${${param}}`, 'g'),
          ReplaceData[param],
        );
      }

      await filepath.writeFile(
        path.join(basicAnswers.pkgPath, fileInfo.fileName),
        file_content,
        { overwrite: false },
      );
      return basicAnswers;
    });
  }

  return promise;
}
