import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import * as path from 'path';

export function init() {
  // 收集基础信息
  questions();
  // 1. 根据收集的信息和模板创建package.json、README、.gitignore等文件
  // 2. 复制tsconfig、jestconfig、.prettierrc、.editorconfig、.eslintrc.js等文件并创建__test__目录
  // 3. 根据收集的信息创建src目录及主文件
  // 4.git
  //    初始化git
  //    建立git分支
  //    建立存储库
  //    连接存储库
}

async function questions() {
  const executePath = process.cwd();
  const answers = await inquirer.prompt([
    // 项目名称
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
    // ts声明文件名
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
  console.log('结果为:');
  console.log(answers);
}
