const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync('courses/platform-engineering');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Add color:#000000 to ensure readability on pastel backgrounds
  content = content.replace(/(classDef\s+\w+\s+[^;\n]+);/g, (match, p1) => {
    if (p1.includes('color:')) return match;
    return `${p1},color:#000000;`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`\nFixed Mermaid classDefs in ${modifiedCount} files.`);
