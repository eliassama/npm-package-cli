import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import * as path from 'path';
import * as validate from 'validate-npm-package-name';
import * as semver from 'semver';

import * as template from './template';
import * as filePath from './file-path';
import * as git from './git';
import { exception, output, ast } from '../../../utils';
import * as LocalStorage from '../../../utils/local-storage';

export interface AnswersType {
  pkgPath: string;
  pkgName: string;
  description: string;
  initialVersion: string;
  srcDir: string;
  outDir: string;
  mainName: string;
  tsName: string;
  httpRepositoryUrl: string;
  sshRepositoryUrl: string;
  repositoryWebUrl: string;
  firstCommitMessage: string;
}

const Questions = {
  packageName: async function (config: AnswersType): Promise<AnswersType> {
    // 确定包名
    const { packageName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'packageName',
        message: chalk.bgBlueBright(`package name:`),
        default: path.basename(config.pkgPath),
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    const { validForNewPackages, validForOldPackages, warnings, errors } =
      validate(packageName);
    if (!validForNewPackages || !validForOldPackages) {
      if (warnings) {
        output.warn(...warnings);
      } else if (errors) {
        output.warn(...errors);
      } else {
        output.warn('Invalid package name');
      }
      return Questions.packageName(config);
    }

    config.pkgName = packageName;
    return config;
  },

  isCreate: async function (config: AnswersType): Promise<AnswersType> {
    // 确定是新建目录还是使用当前目录
    const { isCreate } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isCreate',
        default: true,
        message: chalk.bgBlueBright(
          'Is create a new directory using package name?',
        ),
      },
    ]);

    if (isCreate) {
      config.pkgPath = path.join(config.pkgPath, config.pkgName);
    }

    return config;
  },

  description: async function (config: AnswersType): Promise<AnswersType> {
    // 确定包描述
    const { description } = await inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: chalk.bgBlueBright(`description:`),
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    config.description = description;
    return config;
  },

  initialVersion: async function (config: AnswersType): Promise<AnswersType> {
    const { initialVersion } = await inquirer.prompt([
      // 初始版本
      {
        type: 'input',
        name: 'initialVersion',
        default: '0.0.0',
        message: chalk.bgBlueBright(`Version start for:`),
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    const version = semver.valid(semver.coerce(semver.clean(initialVersion)));

    if (version) {
      if (version !== initialVersion) {
        const { confirmVersion } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'isContinue',
            default: true,
            message: chalk.bgBlueBright(
              `You input is not a semVer. Do you mean ${version} ?`,
            ),
          },
        ]);

        if (!confirmVersion) {
          return Questions.initialVersion(config);
        }
      }
    } else {
      output.warn('Not a valid version');
      return Questions.initialVersion(config);
    }

    config.initialVersion = version;
    return config;
  },

  srcDir: async function (config: AnswersType): Promise<AnswersType> {
    const { srcDir } = await inquirer.prompt([
      // 核心代码基础目录
      {
        type: 'input',
        name: 'srcDir',
        message: chalk.bgBlueBright(`src dir:`),
        default: 'src',
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    config.srcDir = srcDir;
    return config;
  },

  outDir: async function (config: AnswersType): Promise<AnswersType> {
    const { outDir } = await inquirer.prompt([
      // 编译输出基础目录
      {
        type: 'input',
        name: 'outDir',
        message: chalk.bgBlueBright(`compile out dir:`),
        default: 'lib',
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    config.outDir = outDir;
    return config;
  },

  mainName: async function (config: AnswersType): Promise<AnswersType> {
    const { mainName } = await inquirer.prompt([
      // 主入口文件名，也是编译后的入口文件名
      {
        type: 'input',
        name: 'mainName',
        message: chalk.bgBlueBright(`package entry file name:`),
        default: 'index',
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    config.mainName = mainName.replace(/\.ts|\.js/g, '');
    return config;
  },

  tsName: async function (config: AnswersType): Promise<AnswersType> {
    // ts 声明文件名
    const { tsName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'tsName',
        message: chalk.bgBlueBright(`typescript declare file name:`),
        default: 'index.d.ts',
        filter(input: string) {
          if (!ast.tsFile(input)) {
            input += '.ts';
          }
          return input.trim();
        },
      },
    ]);

    if (!ast.declareFileName(tsName)) {
      output.warn('Not a valid typescript declaration file');
      return Questions.tsName(config);
    }

    config.tsName = tsName.replace(/\.ts|\.js/g, '');

    return config;
  },

  repositoryUrl: async function (config: AnswersType): Promise<AnswersType> {
    let { repositoryUrl } = await inquirer.prompt([
      // git 存储库地址
      {
        type: 'input',
        name: 'repositoryUrl',
        message: chalk.bgBlueBright(`git repository url:`),
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    repositoryUrl = repositoryUrl.toLowerCase();

    if (ast.gitSshUrl(repositoryUrl)) {
      repositoryUrl = repositoryUrl.replace('git@', '');
      const repositoryTmpArray = repositoryUrl.split(':');
      const tailStr = repositoryTmpArray.pop();
      repositoryUrl = `${repositoryTmpArray.join(':')}/${tailStr}`;
    } else if (ast.gitHttpUrl(repositoryUrl)) {
      repositoryUrl = repositoryUrl.replace(/http(s):\/\//, '');
    } else {
      output.warn(
        'You did not enter a valid Git repository url, please try again',
      );
      return Questions.repositoryUrl(config);
    }

    const [gitDomain, gitUserName, gitRepoName]: string[] =
      repositoryUrl.split('/');

    config.sshRepositoryUrl = `git@${gitDomain}:${gitUserName}/${gitRepoName}`;
    config.httpRepositoryUrl = `https://${gitDomain}/${gitUserName}/${gitRepoName}`;
    config.repositoryWebUrl = `https://${gitDomain}/${gitUserName}/${gitRepoName.replace(
      '.git',
      '',
    )}`;
    return config;
  },

  firstCommitMessage: async function (
    config: AnswersType,
  ): Promise<AnswersType> {
    const { firstCommitMessage } = await inquirer.prompt([
      // 初始化项目提交信息
      {
        type: 'input',
        name: 'firstCommitMessage',
        default: 'feat: Initialize the npm package.',
        message: chalk.bgBlueBright(`git first commit message:`),
        filter(input: string) {
          return input.trim();
        },
      },
    ]);

    config.firstCommitMessage = firstCommitMessage;
    return config;
  },

  isContinue: async function (config: AnswersType): Promise<AnswersType> {
    const { isContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isContinue',
        default: true,
        message: chalk.bgBlueBright('Is this OK?'),
      },
    ]);

    if (!isContinue) {
      exception.panic('You canceled the initialization');
    }

    return config;
  },
};

// 获取包名和路径
async function pkgNameAndPath(config: AnswersType): Promise<AnswersType> {
  return Questions.packageName(config).then(Questions.isCreate);
}

// 获取包基础信息
async function pkgInfo(config: AnswersType): Promise<AnswersType> {
  return Questions.description(config).then(Questions.initialVersion);
}

// 获取包基础路径
async function pkgBasicPath(config: AnswersType): Promise<AnswersType> {
  config = await Questions.srcDir(config).then(Questions.outDir);

  if (!ast.diffName(config.srcDir, config.outDir)) {
    output.warn(
      'The code path is the same as the compiled output path, please try again',
    );
    return pkgBasicPath(config);
  }

  return config;
}

// 获取包基础文件名
async function pkgBasicFileName(config: AnswersType): Promise<AnswersType> {
  config = await Questions.mainName(config).then(Questions.tsName);

  if (!ast.diffName(config.tsName, config.mainName)) {
    output.warn(
      'The ts declaration file name must be different from the code entry file name',
    );
    return pkgBasicFileName(config);
  }

  return config;
}

// 获取包远程库相关信息
async function pkgRepositoryInfo(config: AnswersType): Promise<AnswersType> {
  return Questions.repositoryUrl(config).then(Questions.firstCommitMessage);
}

async function done(config: AnswersType): Promise<AnswersType> {
  output.prompt("Here's what you input or selected");
  output.info('package basic path: ', chalk.cyan(config.pkgPath));
  output.info('package name: ', chalk.cyan(config.pkgName));
  output.info('package description: ', chalk.cyan(config.description));
  output.info('package code directory: ', chalk.cyan(config.srcDir));
  output.info('package output directory: ', chalk.cyan(config.outDir));
  output.info(
    'package typescript declare file name : ',
    chalk.cyan(config.tsName),
  );
  output.info('package main file name: ', chalk.cyan(config.mainName));
  output.info(
    'package git repository url - ssh: ',
    chalk.cyan(config.httpRepositoryUrl),
  );
  output.info(
    'package git repository url - http: ',
    chalk.cyan(config.sshRepositoryUrl),
  );
  output.info(
    'package git repository url - webUrl: ',
    chalk.cyan(config.repositoryWebUrl),
  );

  return Questions.isContinue(config);
}

async function questionToBasicAnswer(
  config: AnswersType,
): Promise<AnswersType> {
  return pkgNameAndPath(config)
    .then(pkgInfo)
    .then(pkgBasicPath)
    .then(pkgBasicFileName)
    .then(pkgRepositoryInfo)
    .then(done);
}

export function init() {
  const localStorage = LocalStorage.read();

  if (
    !(
      localStorage.author.name &&
      localStorage.author.email &&
      localStorage.author.url
    )
  ) {
    exception.panic(
      `Please complete the author information by using '${chalk.bold.cyan(
        'npm-template config help author',
      )}' or see '${chalk.bold.cyan(
        'https://github.com/eliassama/npm-package-cli#commands',
      )}' for help`,
    );
  }

  questionToBasicAnswer(<AnswersType>{ pkgPath: process.cwd() })
    .then(filePath.create)
    .then(template.create)
    .then(git.create);
}
