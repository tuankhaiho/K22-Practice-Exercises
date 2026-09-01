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

const baseDir = path.resolve('d:/F8/project-1');
const htmlFiles = getAllFiles(baseDir, '.html');

for (const filePath of htmlFiles) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Determine the prefix based on whether it's in the root or a subdirectory
    const isSubDir = path.dirname(filePath) !== baseDir;
    const prefix = isSubDir ? '../' : './';
    const faviconTag = `\n        <link rel="icon" type="image/png" href="${prefix}assets/images/Logo.png" />`;

    // Only add if it doesn't already have a favicon
    if (!content.includes('rel="icon"')) {
        const newContent = content.replace(/(<title>.*?<\/title>)/i, `$1${faviconTag}`);
        
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Fixed ' + filePath);
        }
    }
}
