const gridContainer = document.querySelector('#grid-container');


for (let j=0; j<16; j++){
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('outer-div');
    gridContainer.appendChild(outerDiv);
    
    for(let i=0; i<16; i++){
        const div = document.createElement('div');
        div.classList.add('child');
        outerDiv.appendChild(div);
    }
}