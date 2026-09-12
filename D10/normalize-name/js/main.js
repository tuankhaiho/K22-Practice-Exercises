function normalizeName(fullName) {
    if (!fullName) return "";
    fullName = fullName.trim().toLowerCase();

    let result = "";
    for (let i = 0; i < fullName.length; i++) {
        if (fullName[i] === " " && fullName[i + 1] === " ") continue;

        if (i === 0 || fullName[i - 1] === " ") {
            result += fullName[i].toUpperCase();
        } else {
            result += fullName[i];
        }
    }
    return result;
}

console.log(normalizeName(" ngUYen vaN a "));
console.log(normalizeName("tRan   THI    b"));
console.log(normalizeName("  le  vAn  c  "));
