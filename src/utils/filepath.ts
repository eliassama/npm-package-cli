import {versions} from "process";
import * as fs from "fs";
import * as path from "path";

/***
 * @description 递归创建目录
 * @param {string} targetPath 指定目录，绝对路径或相对路径都可，如为相对路径，则会从项目根目录开始计算
 * @return {boolean} 是否创建成功
 */
export async function recursionMkdir(targetPath: string) {
  if (!path.isAbsolute(targetPath)) {
    targetPath = path.resolve(__dirname, "..", "..", targetPath);
  }

  if (parseInt(`${versions.node}`.split('.').join('')) >= 10120) {
    fs.mkdirSync(targetPath, { recursive: true });
    return true;
  } else {
    if (fs.existsSync(targetPath)) {
      return true;
    } else if (await recursionMkdir(path.dirname(targetPath))) {
      fs.mkdirSync(targetPath);
      return true;
    }
  }
}
