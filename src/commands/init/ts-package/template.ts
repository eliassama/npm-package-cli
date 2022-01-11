import { AnswersType } from "./index";
import * as fs from "fs";
import * as path from "path";
import * as LocalStorage from '../../../utils/local-storage';

export async function create(basicAnswers: AnswersType) {
  let localStorage = LocalStorage.read()
  const CopyFileArray = [
    { fileName: ".gitignore", params: [ "outDir" ] },
    { fileName: "package.json", params: [ "pkgName", "description", "mainName", "tsName", "outDir", "srcDir", "sshRepositoryUrl", "authorName", "authorEmail", "authorUrl", "repositoryWebUrl" ] },
    { fileName: "README.md", params: [ "pkgName" , "description", "authorName", "authorUrl"] },
    { fileName: "tsconfig.json", params: [ "outDir" ] },
  ]
  const ReplaceData : {[index: string] : string} = {
    "pkgName": basicAnswers.pkgName,
    "description": basicAnswers.description,
    "outDir": basicAnswers.outDir,
    "srcDir": basicAnswers.srcDir,
    "mainName": `${basicAnswers.mainName}.js`,
    "tsName": `${basicAnswers.tsName}.ts`,
    "httpRepositoryUrl": basicAnswers.httpRepositoryUrl,
    "repositoryWebUrl": basicAnswers.repositoryWebUrl,
    "authorName": localStorage.author.name,
    "authorUrl": localStorage.author.url,
    "authorEmail": localStorage.author.email,
  }

  for (let fileInfo of CopyFileArray ){
    let file_content = fs.readFileSync(path.resolve( __dirname, "..", "..", "..", "template", "ts-package", fileInfo.fileName), "utf-8")

    for (let param of fileInfo.params){
      file_content = file_content.replace(new RegExp(`\\\${${param}}`,"g"), ReplaceData[param])
      console.log("--------")
      console.log(file_content)
      console.log(new RegExp(`\\\${${param}}`,"g"))
      console.log(ReplaceData[param])
      console.log("--------")
    }

    await fs.writeFileSync(path.join(basicAnswers.pkgPath, fileInfo.fileName), file_content, "utf-8")
  }
}
