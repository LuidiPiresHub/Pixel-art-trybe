let pixelBox = document.querySelector('#pixel-board');
let tamanhoCaixa = document.querySelector('#pixelBoxBorder');

function createBox(value) {
    tamanhoCaixa.style.width = (value * 39.4) + 'px';
    for (let i = 0; i < value; i += 1) {
        for (let i2 = 0; i2 < value; i2 += 1) {
            let div = document.createElement('div');
            div.className = 'pixel';
            div.style.backgroundColor = 'white';
            pixelBox.appendChild(div);
        };
    };
};
console.log(tamanhoCaixa.style.width.value);

createBox(5);

// function selectedClassBlackColor() {
//     let cores = document.querySelectorAll('.color');
//     for (let i = 0; i < cores.length; i += 1) {
//         if (i === 0) {
//             cores[0].className += ' selected';
//         };
//     };
// };
// selectedClassBlackColor();

function SelectedClassColorPalette() {
    let paletteColor = document.querySelectorAll('.color');
    let borrachaButton = document.querySelector('#Borracha')
    for (let color of paletteColor) {
        color.addEventListener('click', function () {
            for (let colors of paletteColor) {
                borrachaButton.classList.remove('selected')
                colors.classList.remove('selected');
            };
            color.className += ' selected';
        });
    };
};
SelectedClassColorPalette();

function putColorInPixels() {
    let pixels = document.querySelectorAll('.pixel');

    for (let pixel of pixels) {
        pixel.addEventListener('click', function () {
            let color = document.querySelector('.selected');
            let whatColor = window.getComputedStyle((color)).backgroundColor;
            pixel.style.backgroundColor = whatColor;
        });
    };
};
putColorInPixels();

function DragClick() {
    let pixels = document.querySelectorAll('.pixel');

    for (let pixel of pixels) {
        pixel.addEventListener('dragenter', function () {
            let color = document.querySelector('.selected');
            let whatColor = window.getComputedStyle((color)).backgroundColor;
            pixel.style.backgroundColor = whatColor;
        });
    };
}
DragClick();


function clearButton() {
    let button = document.querySelector('#clear-board');
    button.addEventListener('click', function () {
        let pixels = document.querySelectorAll('.pixel');
        for (let pixel of pixels) {
            pixel.style.backgroundColor = 'white';
        };
    });
};
clearButton();

function removeBox() {
    let pixels = document.querySelectorAll('.pixel');
    for (let i = pixels.length - 1; i >= 0; i -= 1) {
        let element = pixels[i];
        element.remove();
    }
}


function boxSize() {
    let caixaPixels = document.querySelector('input[name= "BoxSize"]');
    removeBox();
    if (caixaPixels.value >= 0 && caixaPixels.value < 5) {
        createBox(5);
        alert('Apenas valores acima de 5! :D')
        alert('O valor da caixa foi definido para 5!')
    }
    else if (caixaPixels.value > 50) {
        createBox(50);
        alert('50 é o Limite! ;)')
        alert('O valor da caixa foi definido para 50!')
    }
    else if (caixaPixels.value >= 5) {
        createBox(caixaPixels.value);
    }
    putColorInPixels();
}

function VQVButton() {
    let caixaPixels = document.querySelector('input[name= "BoxSize"]');
    let button = document.querySelector('#generate-board');
    button.addEventListener('click', function () {
        if (caixaPixels.value > 0) {
            createBox(caixaPixels.value)
            boxSize();
        } else {
            alert('Board inválido!')
            removeBox();
            createBox(5);
        }
    });
}
VQVButton();

function RGB() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return `rgba(${r}, ${g}, ${b}, ${1})`;
}

function randomColors() {
    let newColors = document.querySelectorAll('.newColor');
    let blackColor = document.querySelector("#color1");
    blackColor.style.backgroundColor = 'black'
    for (let color of newColors) {
        color.style.backgroundColor = RGB();
    };
};
randomColors();

function borracha() {
    let borrachaButton = document.querySelector('#Borracha');
    borrachaButton.addEventListener('click', function () {
        let selecionado = document.querySelectorAll('.color');
        for (let cor of selecionado) {
            cor.classList.remove('selected');
            borrachaButton.className = 'selected'
            borrachaButton.style.border = 'black 1px solid'
            borrachaButton.style.padding = '1.5px 6px'
        }
    })
}
borracha();

let TorF = true
function ONOFF() {
    if (TorF === true) {
        TorF = false;
        removeGrid();
    } else {
        TorF = true;
        addGrid();
    }
}


let button = document.querySelector('#GridRemover');
function removeGrid() {
    let pixelBoxBorder = document.querySelector('#pixelBoxBorder');
    let pixels = document.querySelectorAll('.pixel');
    pixelBoxBorder.style.border = '0px'
    for (let pixel of pixels) {
        pixel.style.border = '0px'
    }
}
function addGrid() {
    let pixelBoxBorder = document.querySelector('#pixelBoxBorder');
    let pixels = document.querySelectorAll('.pixel');
    pixelBoxBorder.style.border = '1px solid black'
    for (let pixel of pixels) {
        pixel.style.border = '1px solid black'
    }
}
button.addEventListener('click', ONOFF)