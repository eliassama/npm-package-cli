import * as LocalStorage from '../../../utils/local-storage';
import { output, ast } from '../../../utils';

export function execute(data: string) {
  if (ast.isEmail(data)) {
    if (LocalStorage.save('author.email', data)) {
      return output.prompt(`The author email is successfully set to ${data}`);
    }
  }

  output.error(
    `Failed to set author's email ${data}, because the set email is not valid`,
  );
}
