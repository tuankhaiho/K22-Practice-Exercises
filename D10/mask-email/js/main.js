function maskEmail(email) {
    let atIndex = email.indexOf("@"); 
    let result = "";
    for (let i = 0; i < email.length; i++) {
        if (i >= atIndex) {
            result += email[i];
            continue; 
        }
        if (atIndex > 4) {
            if (i === 0 || i === 1 || i === atIndex - 1 || i === atIndex - 2) {
                result += email[i];
            } else {
                result += "*";
            }
        } 
        else {
            if (i === 0) {
                result += email[i];
            } else {
                result += "*";
            }
        }
    }

    return result;
}

console.log(maskEmail("alexander@gmail.com"));  
console.log(maskEmail("nguyenvana@f8.edu.vn"));
console.log(maskEmail("frontend@example.com")); 
console.log(maskEmail("an@gmail.com"));
console.log(maskEmail("john@gmail.com"));       