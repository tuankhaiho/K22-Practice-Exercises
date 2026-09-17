const generateOTP = function () {
    return Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
};

console.log(generateOTP());
console.log(generateOTP());
console.log(generateOTP());
console.log(generateOTP());
