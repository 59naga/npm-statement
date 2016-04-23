Npm Statement
---

<p align="right">
  <a href="https://npmjs.org/package/npm-statement">
    <img src="https://img.shields.io/npm/v/npm-statement.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/npm-statement">
    <img src="http://img.shields.io/travis/59naga/npm-statement.svg?style=flat-square">
  </a>
  <a href="https://ci.appveyor.com/project/59naga/npm-statement">
    <img src="https://img.shields.io/appveyor/ci/59naga/npm-statement.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/npm-statement/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/npm-statement.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/npm-statement">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/npm-statement.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/npm-statement">
    <img src="https://img.shields.io/gemnasium/59naga/npm-statement.svg?style=flat-square">
  </a>
</p>

Installation
---
```bash
npm install npm-statement --global
```

Usage
---
depending on the environment variable, can run the script.

```bash
export NODE_ENV=production
npm-if NODE_ENV is production then 'echo optimyze files...'
# optimyze files...
```

in addition can be run a local npm commands.

```bash
npm install eslint
npm-if NODE_ENV is production then 'eslint src' && echo pass
# pass
```

Syntaxes
---
```bash
npm-if VARIABLE trueScript
npm-if VARIABLE trueScript falseScript
npm-if VARIABLE then trueScript else falseScript
npm-if VARIABLE is {string|undefined} then trueScript else falseScript
npm-if VARIABLE is {string|undefined} then trueScript else falseScript
npm-if VARIABLE isnt {string|undefined} then trueScript else falseScript

npm-unless VARIABLE trueScript
npm-unless VARIABLE trueScript falseScript
npm-unless VARIABLE then trueScript else falseScript
npm-unless VARIABLE is {string|undefined} then trueScript else falseScript
npm-unless VARIABLE is {string|undefined} then trueScript else falseScript
npm-unless VARIABLE isnt {string|undefined} then trueScript else falseScript
```

Development
---
Requirement global
* NodeJS v5.10.0
* Npm v3.8.3

```bash
git clone https://github.com/59naga/npm-statement
cd npm-statement
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
