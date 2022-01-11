import * as LocalStorage from '../../../utils/local-storage';
import * as output from '../../../utils/output';
import * as ast from '../../../utils/ast';

export function execute(data: string) {
  if (data[data.length - 1] === '/') {
    data = data.substring(0, data.length - 1);
  }

  if (ast.httpUrl(data)) {
    if (LocalStorage.save('author.url', data)) {
      return output.prompt(`The author url is successfully set to ${data}`);
    }
  }
  output.error(
    `Failed to set author's url ${data}, because the set url is not valid`,
  );
}
