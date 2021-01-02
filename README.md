Flip-StaticStore-cli
====================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/Flip-StaticStore-cli.svg)](https://npmjs.org/package/Flip-StaticStore-cli)
[![Downloads/week](https://img.shields.io/npm/dw/Flip-StaticStore-cli.svg)](https://npmjs.org/package/Flip-StaticStore-cli)
[![License](https://img.shields.io/npm/l/Flip-StaticStore-cli.svg)](https://github.com/JamesFNGibbons/Flip-StaticStore-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g Flip-StaticStore-cli
$ staticStore COMMAND
running command...
$ staticStore (-v|--version|version)
Flip-StaticStore-cli/0.0.0 darwin-x64 node-v14.15.3
$ staticStore --help [COMMAND]
USAGE
  $ staticStore COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`staticStore hello [FILE]`](#staticstore-hello-file)
* [`staticStore help [COMMAND]`](#staticstore-help-command)

## `staticStore hello [FILE]`

describe the command here

```
USAGE
  $ staticStore hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ staticStore hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JamesFNGibbons/Flip-StaticStore-cli/blob/v0.0.0/src/commands/hello.ts)_

## `staticStore help [COMMAND]`

display help for staticStore

```
USAGE
  $ staticStore help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
