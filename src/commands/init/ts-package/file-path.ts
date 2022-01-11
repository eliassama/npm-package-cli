import { AnswersType } from './index';
import * as fs from "fs";
import * as path from "path";
import * as filepath from "../../../utils/filepath";

export async function create(basicAnswers: AnswersType) {
  const CopyFileArray = [
    ".editorconfig",
    ".eslintrc.js",
    ".prettierrc",
  ]

  const CreateFileArray = [
    path.join(basicAnswers.srcDir, `${basicAnswers.mainName}.ts`)
  ]

  const CreateDirectory = [
    basicAnswers.srcDir,
    basicAnswers.outDir,
    "__test__",
  ]

  for (let dirName of CreateDirectory ){
    await filepath.recursionMkdir(path.join(basicAnswers.pkgPath, dirName))
  }

  for (let fileName of CreateFileArray ){
    fs.writeFileSync(path.join(basicAnswers.pkgPath, fileName),"","utf-8")
  }

  for (let fileName of CopyFileArray ){
    fs.writeFileSync(path.join(basicAnswers.pkgPath, fileName), fs.readFileSync(path.resolve( __dirname, "..", "..", "..", "template", "ts-package", fileName), "utf-8"), "utf-8");
  }
}
