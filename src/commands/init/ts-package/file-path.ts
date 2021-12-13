import { BasicAnswersType } from './index';
import * as fs from "fs";
import * as path from "path";
const CopyFileArray = [
  ".editorconfig",
  ".eslintrc.js",
  ".prettierrc",
  "tsconfig.json",
]

export async function create(basicAnswers: BasicAnswersType) {
  // TODO: 需要做好目录处理，准确定位模版文件目录
  if (basicAnswers.isCreate){
    // TODO: 需要考虑处理递归创建多层目录的问题
    await fs.mkdirSync(basicAnswers.initPath)
  }
  // TODO: 需要考虑处理递归创建多层目录的问题
  await fs.mkdirSync(path.join(basicAnswers.initPath, basicAnswers.srcDir))
  // TODO: 需要考虑处理创建目录后再创建文件的问题，即区分/
  await fs.writeFileSync(path.join(basicAnswers.initPath, basicAnswers.srcDir, basicAnswers.main),"","utf-8")
  for (let fileName of CopyFileArray ){
    fs.writeFileSync(path.join(basicAnswers.initPath, basicAnswers.srcDir, fileName), fs.readFileSync(path.resolve( "..","src", "template", "ts-package", fileName), "utf-8"), "utf-8");
  }
  await fs.mkdirSync(path.join(basicAnswers.initPath, "__test__"))
}
