import { execSync } from 'child_process';
import fs from 'fs';

fs.writeFileSync('setup_log.txt', 'Starting setup at ' + new Date().toISOString() + '\n');
try {
  const res = execSync('npm.cmd install', { encoding: 'utf-8' });
  fs.appendFileSync('setup_log.txt', 'Result:\n' + res + '\n');
} catch (err) {
  fs.appendFileSync('setup_log.txt', 'Error:\n' + (err.stderr || err.message) + '\n');
}
