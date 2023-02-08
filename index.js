const gridContainer = document.querySelector('#grid-container');
//var colorPicker = '#FFA07A';
const colorPicker = document.getElementById('picked-color');
const colorModes = ['color-mode', 'eraser', 'crazy-mode', 'da-vinci'];
let actualColorMode = colorModes[0];

let pickedColor = 'rgb(255,255,255)';
let canvasSize = 16;
let cellSize = 640/canvasSize - 0;
let mousePressed = false;

let mouseDown = false;

let colorButtons = document.querySelectorAll('.color-button');

for (let j=0; j<canvasSize; j++) {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('outer-div');
    gridContainer.appendChild(outerDiv);
    
    for(let i=0; i<canvasSize; i++){
        const div = document.createElement('div');
        div.classList.add('child');
        outerDiv.appendChild(div);
    }
}

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.addEventListener('change', updateColorPicker);

function updateColorPicker(e) {
    pickedColor = e.target.value;
}

function changeColorMode(e){
    mouseToggle();
    colorButtons.forEach(item => {
        item.classList.remove('active-button');
    });
    e.target.classList.add('active-button');

    switch( e.target['id'] ){
        case colorModes[0]:
            actualColorMode = colorModes[0];
            break;
        case colorModes[1]:
            actualColorMode = colorModes[1];
            break;
        
        case colorModes[2]:
            actualColorMode = colorModes[2];
            break;
        
        default:
            actualColorMode = colorModes[3];
            break;
    }
}

function getRandomRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";  
}

function darkenRGB() {

}

colorButtons.forEach(item => {
    item.addEventListener('click', (e)=>{
        changeColorMode(e);
        console.log(actualColorMode);
    })
});

function changeColor(e) {
    if(mousePressed == false) return;

    switch(actualColorMode){
        case colorModes[0]:{
            e.target.style.backgroundColor = pickedColor;
            break;
        }
        case colorModes[1]:{
            e.target.style.backgroundColor = '#FFFFFF';
            break;
        }
        case colorModes[2]:{
            e.target.style.backgroundColor = getRandomRGB();
            break;
        }
        default:{
            e.target.style.backgroundColor = '#FFFFFF';
            break;
        }
    }
}

function mouseToggle() {
    if(mousePressed == true) { mousePressed = false } else mousePressed = true;
}

const pixelDivs = document.querySelectorAll('.child');


pixelDivs.forEach( item => {
    item.addEventListener('click', (e) => {
        mouseToggle();
        changeColor(e);
    });

    item.addEventListener('mouseover', e => changeColor(e));
});

function clearCanvas(){
    console.log("eeee");
    pixelDivs.forEach(item => {
        item.target.style.backgroundColor = '#FFFFFF';
    });
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCanvas);