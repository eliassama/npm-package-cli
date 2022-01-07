import { AnswersType } from "./index";
import * as fs from "fs";
import * as path from "path";
import * as LocalStorage from '../../../utils/local-storage';

const CopyFileArray = [
  "package.json",
  "README.md",
  ".gitignore",
]

export function create(basicAnswers: AnswersType) {
  // let localStorage = LocalStorage.read()
  // if (!basicAnswers.repository){
    // basicAnswers.repository = `${localStorage.author.url}/${basicAnswers.name}`
  // }
  for (let fileName of CopyFileArray ){
    // let file_content = fs.readFileSync(path.resolve( __dirname, "..", "..", "..", "template", "ts-package", fileName), "utf-8")
    // file_content = file_content.replace(/\${project\.name}/g, basicAnswers.name)
    // file_content = file_content.replace(/\${project\.description}/g, basicAnswers.description)
    // file_content = file_content.replace(/\${project\.repository}/g, basicAnswers.repository)
    // file_content = file_content.replace(/\${project\.main}/g, basicAnswers.main)
    // file_content = file_content.replace(/\${project\.types}/g, basicAnswers.types)
    // file_content = file_content.replace(/\${project\.srcDir}/g, basicAnswers.srcDir)
    // file_content = file_content.replace(/\${project\.outDir}/g, basicAnswers.outDir)
    // file_content = file_content.replace(/\${project\.name-badge}/g, basicAnswers.name.replace(/\-/g,"--"))
    // file_content = file_content.replace(/\${author\.name}/g, localStorage.author.name)
    // file_content = file_content.replace(/\${author\.email}/g, localStorage.author.email)
    // file_content = file_content.replace(/\${author\.url}/g, localStorage.author.url)
    // fs.writeFileSync(path.join(basicAnswers.initPath, fileName),file_content, "utf-8")
  }

}
