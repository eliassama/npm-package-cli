import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from "fs";
import * as template from "./template";
import * as filePath from "./file-path";
import * as git from "./git";

export interface BasicAnswersType {
  name: string
  description: string
  srcDir: string
  outDir: string
  main: string
  types: string
  repository: string
  initPath: string
  isCreate: boolean
}

export function init() {
  questionToBasicAnswer().then((basicAnswers: BasicAnswersType)=>{
    filePath.create(basicAnswers)
    return basicAnswers
  }).then((basicAnswers: BasicAnswersType)=>{
    template.create(basicAnswers)
    git.create(basicAnswers)
  });
}

async function questionToBasicAnswer(): Promise<BasicAnswersType> {
  const executePath = process.cwd();
  const { isCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCreate',
      default: true,
      message: chalk.bgBlueBright('Is create a new directory?'),
    }
  ])

  if (isCreate === false){
    const executePathFileArray = fs.readdirSync(executePath)
    if (executePathFileArray.length !== 0){
      console.log(
        chalk.bold.red(
          "Initialization cannot be performed because the current directory is not clean",
        ),
      );
      process.exit()
    }
  }

  const basicAnswers : BasicAnswersType = await inquirer.prompt([
    // 项目名称
    // TODO: 需要提前检查是否有重名的，这一块最好整体拆开一点点处理
    // FIXME: 对于创建新目录的默认值需要为空
    {
      type: 'input',
      name: 'name',
      message: chalk.bgBlueBright(`package name:`),
      default: path.basename(executePath),
      filter(input: string) {
        return input.trim();
      },
      // validate(input: string) {
      //   return /^[a-z|@|0-9|\-|_]{1,214}$/.test(input);
      // },
    },
    // 项目描述
    {
      type: 'input',
      name: 'description',
      message: chalk.bgBlueBright(`description:`),
      filter(input: string) {
        return input.trim();
      },
    },
    // 核心代码基础目录
    {
      type: 'input',
      name: 'srcDir',
      message: chalk.bgBlueBright(`src dir:`),
      default: 'src',
      filter(input: string) {
        return input.trim();
      },
      // validate(input: string) {
      // return /^[a-z][a-z|0-9|.|\/|\-|_]*.ts$/.test(input);
      // },
    },
    // 编译输出基础目录
    {
      type: 'input',
      name: 'outDir',
      message: chalk.bgBlueBright(`out dir:`),
      default: 'lib',
      filter(input: string) {
        return input.trim();
      },
      // validate(input: string) {
      //   return /^[a-z][a-z|0-9|.|\/|\-|_]*.ts$/.test(input);
      // },
    },
    // 主入口文件名
    {
      type: 'input',
      name: 'main',
      message: chalk.bgBlueBright(`main:`),
      default: 'index.js',
      filter(input: string) {
        return input.trim();
      },
      // validate(input: string) {
      //   return /^[a-z][a-z|0-9|.|\-|_]*.js$/.test(input);
      // },
    },
    // ts 声明文件名
    {
      type: 'input',
      name: 'types',
      message: chalk.bgBlueBright(`types:`),
      default: 'index.d.ts',
      filter(input: string) {
        return input.trim();
      },
      // validate(input: string) {
      //   return /^[a-z][a-z|0-9|.|\/|\-|_]*.d.ts$/.test(input);
      // },
    },
    // git 存储库地址
    {
      type: 'repository',
      name: 'repository',
      message: chalk.bgBlueBright(`git repository:`),
      filter(input: string) {
        return input.trim();
      },
    },
  ]);

  let initPath = executePath

  if (isCreate){
    initPath = path.join(executePath, basicAnswers.name)
  }

  console.log(`About to init to ${initPath}`)
  console.log(basicAnswers);

  const { isContinue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isContinue',
      default: true,
      message: chalk.bgBlueBright('Is this OK?'),
    },
  ]);

  if (isContinue === false){
    console.log(
      chalk.bold.red(
        "You canceled the initialization",
      ),
    );
    process.exit()
  }

  basicAnswers.initPath = initPath
  basicAnswers.isCreate = isCreate

  return basicAnswers
}
