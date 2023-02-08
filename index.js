const gridContainer = document.querySelector('#grid-container');
//var colorPicker = '#FFA07A';
const colorPicker = document.getElementById('picked-color');
const colorModes = ['color-mode', 'eraser', 'crazy-mode', 'da-vinci'];
let actualColorMode = colorModes[0];
const rangeSlider = document.getElementById("range-slider");
const rangeSliderSubtitle = document.getElementById("slider-subtitle");
let actualGrid = 16;

let pixelDivs = null;
let outerDivs = null;

let pickedColor = 'rgb(255,255,255)';
let canvasSize = 16;
let cellSize = 640/actualGrid - 0;
let mousePressed = false;

let mouseDown = false;

let colorButtons = document.querySelectorAll('.color-button');

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.addEventListener('change', (e) => {
    updateColorPicker(e);
});

function updateColorPicker(e) {
    pickedColor = e.target.value;
    console.log(pickedColor);
}

rangeSlider.addEventListener('change', (e) => {
    updateGrid(e.target.value)
});

function updateGrid(value) {
    actualGrid = value;
    rangeSliderSubtitle.textContent = `${actualGrid}x${actualGrid}`;
    restartGrid();
}

function restartGrid(){
    if(outerDivs != null){
        outerDivs.forEach(item => {
            item.remove()
        })
    }
    
    for (let j=0; j<actualGrid; j++) {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('outer-div');
        gridContainer.appendChild(outerDiv);
        
        for(let i=0; i<actualGrid; i++){
            const div = document.createElement('div');
            div.classList.add('child');
            outerDiv.appendChild(div);
        }
    }

    pixelDivs = document.querySelectorAll('.child');
    outerDivs = document.querySelectorAll('.outer-div');
    cellSize = (640/actualGrid - 0) + 'px';
    addListeners();
}

function changeColorMode(e){
    //mouseToggle();
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

colorButtons.forEach(item => {
    item.addEventListener('click', (e)=>{
        changeColorMode(e);
    })
});

function changeColor(e) {
    if(mousePressed == false) return;
    console.log("testing");

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
            e.target.style.backgroundColor = pickedColor;
            e.target.style.backgroundColor = '#FFFFFF';
            break;
        }
    }
}

function mouseToggle() {
    if(mousePressed == true) { mousePressed = false } else mousePressed = true;
}

function addListeners(){
    pixelDivs.forEach( item => {
        item.addEventListener('click', (e) => {
            mouseToggle();
            changeColor(e);
        });
    
        item.addEventListener('mouseover', e => changeColor(e));

        item.style.width = cellSize;
        item.style.height = cellSize;
    });
}

function clearCanvas(){
    
    pixelDivs.forEach(item => {
        item.style.backgroundColor = '#FFFFFF';
    });
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCanvas);

function getRandomRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";  
}

function darkenRGB() {

}

updateGrid(16);