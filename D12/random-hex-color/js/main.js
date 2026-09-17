
function generateRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor.padStart(6, '0').toUpperCase();
}

const bodyBg = document.getElementById('body-bg');
const colorCode = document.getElementById('color-code');
const btnGenerate = document.getElementById('btn-generate');

btnGenerate.addEventListener('click', function() {
    const newHexColor = generateRandomHexColor(); 
    bodyBg.style.backgroundColor = newHexColor;
    colorCode.textContent = newHexColor;
});

