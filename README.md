# npm-package-cli
![standard-readme compliant](https://img.shields.io/badge/typescript-v4.5.2-green.svg?style=flat-square)

A CLI tool used to normalize the creation, management, and distribution of NPM packages

## Table of Contents

- [Install](#install)
  - [CNPM](#cnpm)
  - [NPM](#npm)
  - [YARN](#yarn)
  - [PNPM](#pnpm)
- [Usage](#usage)
  - [Introduce](#introduce)
  - [Function](#function)
- [Example](#example)
  - [Javascript](#javascript)
  - [Typescript](#typescript)
- [Maintainers](#maintainers)

## Install
### CNPM
```
cnpm i @eliassama/npm-package-cli --save
```

### NPM
```
npm i @eliassama/npm-package-cli --save
```

### YARN
```
yarn add @eliassama/npm-package-cli
```

### PNPM
```
pnpm add @eliassama/npm-package-cli
```

## Usage

### Introduce

### Commands
#### config \<command\>
+ **author \<option\>**
  + **Description**: Set the default author information.
  + **options**: 
    + -n, --name <authorName>: Set the default author name.
    + -e, --email <authorEmail>: Set the default author email.
    + -u, --url <authorUrl>: Set the default author address.
  + **Synopsis**
  ```shell
    # Set the default author name.
    # Run either of the following commands.
    npm-template config author -n eliassama 
    npm-template config author --name eliassama 
    
    # Set the default author name.
    # Run either of the following commands.
    npm-template config author -e github@elias.ink
    npm-template config author --email github@elias.ink
       
    # Set the default author name.
    # Run either of the following commands.
    npm-template config author -u https://github.com/eliassama
    npm-template config author --url https://github.com/eliassama
    
    # Set the email address, URL, and name of the default author.
    # Run either of the following commands.
    npm-template config author -n eliassama -e github@elias.ink -u https://github.com/eliassama
    npm-template config author --name eliassama --email github@elias.ink --url https://github.com/eliassama
  ```
+ **help \<command\>**
  + **Description**:  Use the help command to view the command information.
  + **commands**:
    + author: View help information about Author Command
  + **Synopsis**
  ```shell
      # View help information about Author Command
      npm-template config help author
  ```

#### init \<option\>
+ **Description**: Initialize the NPM package base file.
+ **options**:
  + -ts, --typescript: Initialize to create a typescript NPM package.
+ **Synopsis**
  ```shell
    # Initialize to create a typescript NPM package.
    # Run either of the following commands.
    npm-template init -ts
    npm-template init --typescript 
  ```

#### help \<command\>
+ **Description**: Use the help command to view the command information.
+ **command**:
  + config: View help information about config Command.
  + init: View help information about init Command.
+ **Synopsis**
  ```shell
    # View help information about config Command.
    npm-template help config
    
    # View help information about init Command.
    npm-template help init
  ```
## Maintainers
[@eliassama](https://github.com/eliassama/)
