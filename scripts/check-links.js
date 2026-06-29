const fs = require('fs');
const path = require('path');

const websiteDir = path.resolve(__dirname, '..', 'website', 'pages');
const allLinks = [];
const allPages = new Set();

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      scanDir(fullPath);
    } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
      const relativeRoute = fullPath.replace(websiteDir, '').replace(/\\/g, '/').replace(/\.mdx?$/, '');
      const route = relativeRoute.endsWith('/index') ? relativeRoute.slice(0, -6) : relativeRoute;
      allPages.add(route === '' ? '/' : route);

      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
      if (matches) {
        matches.forEach(match => {
          const urlMatch = match.match(/\]\(([^)]+)\)/);
          if (urlMatch) {
            const url = urlMatch[1];
            if (url.startsWith('/')) {
              allLinks.push({ source: route === '' ? '/' : route, target: url });
            }
          }
        });
      }
    }
  }
}

scanDir(websiteDir);
// Add implicit index pages for directories
allPages.add('/courses/platform-engineering');
allPages.add('/courses/platform-engineering/modules');
allPages.add('/courses/platform-engineering/labs');
allPages.add('/courses/platform-engineering/projects');
allPages.add('/courses/platform-engineering/quizzes');
allPages.add('/courses/platform-engineering/cheatsheets');

let brokenLinks = 0;
allLinks.forEach(link => {
  let targetRoute = link.target;
  if (targetRoute.includes('#')) {
    targetRoute = targetRoute.split('#')[0];
  }
  
  if (targetRoute !== '' && !allPages.has(targetRoute) && !targetRoute.startsWith('http') && !targetRoute.startsWith('mailto')) {
    console.log(`Broken link in ${link.source}: ${link.target}`);
    brokenLinks++;
  }
});

console.log(`\nScan complete. Found ${brokenLinks} broken internal links.`);
