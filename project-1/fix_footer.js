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

    let newContent = content;

    // Grid container
    newContent = newContent.replace(
        /class="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-10 xl:gap-8"/g,
        'class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 xl:gap-8"'
    );

    // Column 1
    newContent = newContent.replace(
        /<div class="md:col-span-3">/g,
        '<div class="lg:col-span-3">'
    );

    // Column 2
    newContent = newContent.replace(
        /<div class="mt-2 md:col-span-2 md:mt-0">/g,
        '<div class="mt-2 md:mt-0 lg:col-span-2">'
    );

    // Column 3
    newContent = newContent.replace(
        /<div class="mt-2 md:col-span-3 md:mt-0">/g,
        '<div class="mt-2 md:mt-0 lg:col-span-3">'
    );

    // Column 4
    newContent = newContent.replace(
        /<div class="relative mt-4 md:col-span-4 md:mt-0">/g,
        '<div class="relative mt-4 md:mt-0 lg:col-span-4">'
    );
    
    // Also bottom section of the footer
    // <div class="border-dark mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 md:mt-24 md:flex-row md:items-end md:gap-0">
    // On tablet, it might be fine, but if it's too cramped we could change it. Usually flex-row on md is okay if it just has a logo and some social icons.

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Fixed ' + filePath);
    }
}
