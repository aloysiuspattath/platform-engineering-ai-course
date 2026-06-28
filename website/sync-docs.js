const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const websitePagesDir = path.join(__dirname, 'pages');

const directoriesToSync = [
  { src: path.join(rootDir, 'output', 'approved'), dest: path.join(websitePagesDir, 'modules') },
  { src: path.join(rootDir, 'labs'), dest: path.join(websitePagesDir, 'labs') },
  { src: path.join(rootDir, 'projects'), dest: path.join(websitePagesDir, 'projects') },
  { src: path.join(rootDir, 'quizzes'), dest: path.join(websitePagesDir, 'quizzes') },
  { src: path.join(rootDir, 'cheatsheets'), dest: path.join(websitePagesDir, 'cheatsheets') }
];

function copyDirectorySync(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    if (entry.name === '.gitkeep') continue;
    if (entry.name === 'agents' || entry.name === 'prompts') continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Starting documentation sync...');
directoriesToSync.forEach(({ src, dest }) => {
  console.log(`Syncing ${src} to ${dest}...`);
  copyDirectorySync(src, dest);
});
console.log('Documentation sync complete.');
