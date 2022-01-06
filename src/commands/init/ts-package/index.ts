import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from "fs";
import * as template from "./template";
import * as filePath from "./file-path";
import * as git from "./git";
import * as exception from "../../../utils/exception";
import * as output from "../../../utils/output";
import * as ast from "../../../utils/ast";

export interface AnswersType {
  pkgPath: string
  pkgName: string
  description: string
  srcDir: string
  outDir: string
  mainName: string
  tsName: string
  repository: string
}

export function init() {
  questionToBasicAnswer().then(async (answers: AnswersType)=>{
    await filePath.create(answers)
    await template.create(answers)
    await git.create(answers)
  });
}

// 获取包名和路径
async function pkgNameAndPath(): Promise<{ pkgName: string, pkgPath: string }> {
  const executePath = process.cwd();
  const result = {
    pkgName: "",
    pkgPath: executePath,
  }

  // 确定是新建目录还是使用当前目录
  const { isCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCreate',
      default: true,
      message: chalk.bgBlueBright('Is create a new directory?'),
    }
  ])

  // 检查是否是干净的目录
  if (!isCreate){
    const executePathFileArray = fs.readdirSync(executePath)
    if (executePathFileArray.length !== 0){
      exception.panic("Initialization cannot be performed because the current directory is not clean")
    }
  }

  // 确定包名
  const { packageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'packageName',
      message: chalk.bgBlueBright(`package name:`),
      default: isCreate? null : path.basename(executePath),
      filter(input: string) {
        return input.trim();
      },
    },
  ])

  // 检查是否有重名目录
  if (isCreate){
    result.pkgPath = path.join(executePath, packageName)
    if (fs.existsSync(result.pkgPath)) {
      exception.panic(`The specified directory [${result.pkgPath}] already exists`)
    }
  }

  result.pkgName = packageName
  return result
}

// 获取包基础信息
async function pkgInfo(): Promise<{ description: string }> {
  const result = {
    description: "",
  }

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
  ])

  result.description = description
  return result
}

// 获取包基础路径
async function pkgBasicPath(): Promise<{ srcDir: string, outDir: string }> {
  const result = {
    srcDir: "",
    outDir: "",
  }

  const { srcDir, outDir } = await inquirer.prompt([
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
  ])

  if (!ast.diffFileName(srcDir, outDir)) {
    output.warn("The code path is the same as the compiled output path, please try again")
    return pkgBasicPath()
  }

  result.srcDir = srcDir
  result.outDir = outDir

  return result
}

// 获取包基础文件名
async function pkgBasicFileName(): Promise<{ mainName: string, tsName: string }> {
  const result = {
    mainName: "",
    tsName: "",
  }

  // ts 声明文件名
  const { tsName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'tsName',
      message: chalk.bgBlueBright(`typescript declare file name:`),
      default: 'index.d',
      filter(input: string) {
        return input.trim();
      },
    },
  ])

  result.tsName = tsName.replace(/\.ts|\.js/g,"")
  if (!ast.declareFileName(tsName)){
    output.warn("Not a valid typescript declaration file")
    return pkgBasicFileName()
  }

  const { mainName } = await inquirer.prompt([
    // 主入口文件名，也是编译后的入口文件名
    {
      type: 'input',
      name: 'mainName',
      message: chalk.bgBlueBright(`code entry file name:`),
      default: 'index',
      filter(input: string) {
        return input.trim();
      },
    },
  ])

  result.mainName = mainName.replace(/\.ts|\.js/g,"")
  if (!ast.diffFileName(result.tsName, result.mainName)) {
    output.warn("The ts declaration file name must be different from the code entry file name")
    return pkgBasicFileName()
  }

  return result
}

// 获取包 git 库信息
// FIXME: 需要对不同情况下存储库的路径进行处理
async function pkgGitInfo(): Promise<{ repository: string }> {
  const result = {
    repository: "",
  }

  const { repository } = await inquirer.prompt([
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

  result.repository = repository
  return result
}

async function questionToBasicAnswer(): Promise<AnswersType> {
  const result: AnswersType = <AnswersType>{}
  const { pkgName, pkgPath } = await pkgNameAndPath()
  const { description } = await pkgInfo()
  const { srcDir, outDir } = await pkgBasicPath()
  const { mainName, tsName } = await pkgBasicFileName()
  const { repository } = await pkgGitInfo()

  result.pkgPath = pkgPath
  result.pkgName = pkgName
  result.description = description
  result.srcDir = srcDir
  result.outDir = outDir
  result.mainName = mainName
  result.tsName = tsName
  result.repository = repository

  output.prompt("Here's what you input or selected")
  output.info("package basic path: ", chalk.cyan(result.pkgPath))
  output.info("package name: ",chalk.cyan(result.pkgName))
  output.info("package description: ",chalk.cyan(result.description))
  output.info("package code directory: ",chalk.cyan(result.srcDir))
  output.info("package output directory: ",chalk.cyan(result.outDir))
  output.info("package typescript declare file name : ",chalk.cyan(result.tsName))
  output.info("package main file name: ",chalk.cyan(result.mainName))
  output.info("package git repository url : ",chalk.cyan(result.repository))

  const { isContinue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isContinue',
      default: true,
      message: chalk.bgBlueBright('Is this OK?'),
    },
  ]);

  if (!isContinue){
    exception.panic("You canceled the initialization")
  }

  return result
}
