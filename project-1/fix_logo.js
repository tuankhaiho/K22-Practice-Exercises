const fs = require('fs');
const path = require('path');

const dir = 'd:/F8/project-1/attorneys-profile';
const files = fs.readdirSync(dir);

for (const file of files) {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Only fix the logo path in the footer which has src="./assets/images/Logo.png"
        // Just replacing all occurrences of src="./assets/images/Logo.png" is safe enough.
        const newContent = content.replace(/src="\.\/assets\/images\/Logo\.png"/g, 'src="../assets/images/Logo.png"');
        
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Fixed ' + filePath);
        }
    }
}
