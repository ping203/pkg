#!/usr/bin/env node

'use strict';

// too many problems when treating
// 'files' as scripts. TODO clarify one day
if (process) return;

const path = require('path');
const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2];
const input = './sub/test-x-index.js';
const output = './run-time/test-output.exe';

let left, right;
utils.mkdirp.sync(path.dirname(output));

left = utils.spawn.sync(
  'node', [ path.basename(input) ],
  { cwd: path.dirname(input) }
);

utils.pkg.sync([
  '--target', target,
  '--config', './test-config.js',
  '--output', output, input
]);

right = utils.spawn.sync(
  './' + path.basename(output), [],
  { cwd: path.dirname(output) }
);

assert.equal(left, right);
utils.vacuum.sync(path.dirname(output));
