{
  "name": "${pkgName}",
  "version": "${version}",
  "description": "${description}",
  "main": "${outDir}/${mainName}",
  "types": "${outDir}/${tsName}",
  "scripts": {
    "test": "jest --config jestconfig.json",
    "format": "prettier --write ${srcDir}/",
    "lint": "eslint ${srcDir}/",
    "prebuild": "npm run format && npm run lint && git add -A ${srcDir} && rm -rf ${outDir}",
    "build": "tsc",
    "preversion": "npm run build",
    "patch": "npm version patch",
    "minor": "npm version minor",
    "major": "npm version major",
    "postversion": "git push && git push --tags",
    "prepublishOnly": "npm run build",
    "version": "npm run format && git add -A ${srcDir}"
  },
  "pre-commit": [
    "build"
  ],
  "repository": {
    "type": "git",
    "url": "git+${httpRepositoryUrl}"
  },
  "author": "${authorName} <${authorEmail}> (${authorUrl})",
  "license": "MIT",
  "bugs": {
    "url": "${repositoryWebUrl}/issues"
  },
  "homepage": "${repositoryWebUrl}",
  "devDependencies": {
    "@types/jest": "27.0.3",
    "@typescript-eslint/eslint-plugin": "5.5.0",
    "@typescript-eslint/parser": "5.5.0",
    "eslint": "8.4.1",
    "eslint-config-eliassama": "1.3.2",
    "eslint-plugin-jest": "25.3.0",
    "jest": "27.4.3",
    "pre-commit": "1.2.2",
    "prettier": "2.5.1",
    "ts-jest": "27.1.1",
    "typescript": "4.5.2"
  },
  "files": [
    "${outDir}/*"
  ]
}
