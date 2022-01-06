import { AnswersType } from './index';
import * as fs from "fs";
import * as path from "path";
const CopyFileArray = [
  ".editorconfig",
  ".eslintrc.js",
  ".prettierrc",
  "tsconfig.json",
]

export async function create(basicAnswers: AnswersType) {
  // if (basicAnswers.isCreate){
  //   // TODO: 需要考虑处理递归创建多层目录的问题
  //   await fs.mkdirSync(basicAnswers.initPath)
  // }
  // // TODO: 需要考虑处理递归创建多层目录的问题
  // await fs.mkdirSync(path.join(basicAnswers.initPath, basicAnswers.srcDir))
  // // TODO: 需要考虑处理创建目录后再创建文件的问题，即区分/
  // await fs.writeFileSync(path.join(basicAnswers.initPath, basicAnswers.srcDir, basicAnswers.main),"","utf-8")
  // // FIXME: 需要对入口文件的后缀进行处理，即main在package做对应的是变异后，创建时应该是src的编译前ts文件
  // for (let fileName of CopyFileArray ){
  //   fs.writeFileSync(path.join(basicAnswers.initPath, fileName), fs.readFileSync(path.resolve( __dirname, "..", "..", "..", "template", "ts-package", fileName), "utf-8"), "utf-8");
  // }
  // await fs.mkdirSync(path.join(basicAnswers.initPath, "__test__"))
}
