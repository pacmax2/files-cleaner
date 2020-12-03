#!/usr/bin/env node
import yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
  .usage('Usage: generate --type gif')
  .options({
    path: { type: 'string', default: './', description: 'default ./', alias: 'path' },
  }).argv;
