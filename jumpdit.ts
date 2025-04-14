#!/usr/bin/env bun

import { spawn } from 'child_process';
import { resolve } from 'path';
import { existsSync } from 'fs';

const folderPath = process.argv[2] || '.';
const resolvedPath = resolve(process.cwd(), folderPath);

// Check if the folder exists
if (!existsSync(resolvedPath)) {
  console.error(`Error: Folder "${folderPath}" doesn't exist`);
  process.exit(1);
}

// Create the fzf process with input at top and results below
const command = `find ${resolvedPath} -mindepth 1 -maxdepth 1 -type d | awk -F'/' '{print $NF}' | sort | fzf --layout=reverse`;

const fzf = spawn(command, {
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: true
});

let output = '';

fzf.stdout.on('data', (data) => {
  output += data.toString();
});

fzf.on('close', (code) => {
  if (code === 0 && output.trim()) {
    const selectedFolder = resolve(resolvedPath, output.trim());
    spawn('nvim', [selectedFolder], {
      stdio: 'inherit',
      shell: true
    });
  }
});
