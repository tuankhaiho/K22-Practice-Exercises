const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, ext, fileList);
        } else if (filePath.endsWith(ext)) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const baseDir = 'd:/F8/project-1';
const htmlFiles = getAllFiles(baseDir, '.html');

for (const filePath of htmlFiles) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove md:px-14 from the header class
    // Original: class="flex items-center justify-between md:px-14 xl:px-32"
    // Also handle possible formatting differences
    const newContent = content.replace(/class="([^"]*?)md:px-14([^"]*?)"/g, (match, p1, p2) => {
        // Only replace inside the <header> or if it matches the specific header classes
        if (match.includes('flex items-center justify-between')) {
             return `class="${(p1 + p2).replace(/\s+/g, ' ').trim()}"`;
        }
        return match;
    });

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Fixed ' + filePath);
    }
}
