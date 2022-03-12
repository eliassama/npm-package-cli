export const regex = {
  posixShortPath: /^[0-9a-z_\-\.]+$/i,
  declareBasePath: /\.d\.ts$/i,
  tsFile: /\.ts$/i,
  email:
    /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
  http: /^(?:http:\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i,
  https:
    /^(?:https:\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i,
  url: /^(?:http(s)?:\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i,
  gitSsh: /^git@[^:]+:[^\/]+?\/.*?.git$/,
  gitHttp: /^http(s)?:\/\/([^\/]+?\/){2}.*?.git$/,
  gitUrl: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?.git$/,
};