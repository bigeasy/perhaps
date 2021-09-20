[![Actions Status](https://github.com/bigeasy/perhaps/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/perhaps/actions)
[![codecov](https://codecov.io/gh/bigeasy/perhaps/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/perhaps)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A future wrapper around a Promise.

| What          | Where                                         |
| --- | --- |
| Discussion    | https://github.com/bigeasy/perhaps/issues/1   |
| Documentation | https://bigeasy.github.io/perhaps             |
| Source        | https://github.com/bigeasy/perhaps            |
| Issues        | https://github.com/bigeasy/perhaps/issues     |
| CI            | https://travis-ci.org/bigeasy/perhaps         |
| Coverage:     | https://codecov.io/gh/bigeasy/perhaps         |
| License:      | MIT                                           |

```
npm install perhaps
```

## Overview

Extant is an implementation of SQL's COALESCE that I've used for some time to
deal with the fact that JavaScript truthiness will treat `''` and `0` as true so
the `||` operator can't always be used to create given or default one-liner.

```javascript
const { Future } = require('perhaps')
```

We use the name "perhaps" on NPM because we want the first extant argument.

## Living `README.md`

This `README.md` is also a unit test using the
[Proof](https://github.com/bigeasy/proof) unit test framework. We'll use the
Proof `okay` function to assert out statements in the readme. A Proof unit test
generally looks like this.

```javascript
require('proof')(4, async okay => {
    okay('always okay')
    okay(true, 'okay if true')
    okay(1, 1, 'okay if equal')
    okay({ value: 1 }, { value: 1 }, 'okay if deep strict equal')
})
```

You can run this unit test yourself to see the output from the various
code sections of the readme.

```text
git clone git@github.com:bigeasy/perhaps.git
cd perhaps
npm install --no-package-lock --no-save
node test/readme.t.js
```

## Usage

The `'extant'` module exports a single `coalesce` function.

```javascript
const { Future } = require('perhaps')
```

Note that Extant is SQL's `COALESCE`. It returns the first non-null-like value,
that is the first value that is not `== null`, which would be `null` or
`undefined`. If there is no such argument it returns `null`.

```javascript
okay('test')
```
