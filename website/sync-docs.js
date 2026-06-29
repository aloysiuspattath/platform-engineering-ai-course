const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const coursesDir = path.join(rootDir, 'courses');
const websitePagesDir = path.join(__dirname, 'pages');
const websiteCoursesDir = path.join(websitePagesDir, 'courses');

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

console.log('Starting documentation sync for TechFliq Learn...');

if (fs.existsSync(coursesDir)) {
  const courses = fs.readdirSync(coursesDir, { withFileTypes: true });
  for (let course of courses) {
    if (course.isDirectory()) {
      console.log(`Syncing course: ${course.name}...`);
      const courseSrcDir = path.join(coursesDir, course.name);
      const courseDestDir = path.join(websiteCoursesDir, course.name);
      
      const contentDirs = ['modules', 'labs', 'projects', 'quizzes', 'cheatsheets'];
      for (const dir of contentDirs) {
        const srcPath = path.join(courseSrcDir, dir);
        const destPath = path.join(courseDestDir, dir);
        if (fs.existsSync(srcPath)) {
          copyDirectorySync(srcPath, destPath);
        }
      }

      // Copy root-level files like _meta.js or index.mdx
      const rootFiles = fs.readdirSync(courseSrcDir, { withFileTypes: true });
      for (const file of rootFiles) {
        if (!file.isDirectory() && (file.name.endsWith('.js') || file.name.endsWith('.mdx') || file.name.endsWith('.json'))) {
          fs.copyFileSync(path.join(courseSrcDir, file.name), path.join(courseDestDir, file.name));
        }
      }
    }
  }
}

console.log('Documentation sync complete.');
