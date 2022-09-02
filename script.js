const colorPallet = document.getElementsByClassName('colorPallet');
const clearAll = document.getElementById('clearAll');
const input = document.getElementById('inputValue');
const confirmButton = document.getElementById('confirmButton');
const eraseButton = document.getElementById('eraseButton');
const gridButton = document.getElementById('gridButton');
const selected = document.getElementsByClassName('selected')
const pixelsContainer = document.getElementById('pixelsContainer');
const pixels = document.getElementsByClassName('pixel');

const selectColor = () => {
    colorPallet[0].classList.add('selected')
    for (let color of colorPallet) {
        color.addEventListener('click', () => {
            for (let color2 of colorPallet) {
                eraseButton.classList.remove('selected');
                color2.classList.remove('selected');
                color.classList.add('selected');
            }
        });
    }
}
selectColor();

const getColor = () => {
    const colorSelected = selected[0];
    let color = '';
    if (colorSelected.innerText === 'Borracha') {
        color = 'rgb(255,255,255)'
    } else {
        color = window.getComputedStyle((colorSelected)).backgroundColor;
    }
    return color
}

const savePixelArt = () => {
    const allPixels = [...pixels];
    const allPixelsColor = allPixels.map((pixel) => window.getComputedStyle((pixel)).backgroundColor);
    let inputValue = input.value;
    if (!inputValue) {
        inputValue = 10;
    }
    const isDisable = allPixels.every((pixel) => pixel.style.border === '0px');
    const pixelArtInfo = {
        boxSize: inputValue,
        pixelColor: allPixelsColor,
        fixedColorPallet: {
        secondColorPallet: window.getComputedStyle((colorPallet[1])).backgroundColor,
        thirdColorPallet: window.getComputedStyle((colorPallet[2])).backgroundColor,
        fourthColorPallet: window.getComputedStyle((colorPallet[3])).backgroundColor,
        },
        gridDisabled: isDisable,
    }
    localStorage.setItem('PixelArtInfo', JSON.stringify(pixelArtInfo));
    checkPalletColors();
}

const paintPixels = () => {
    for (let pixel of pixels) {
        pixel.addEventListener('mousedown', () => {
            pixel.style.backgroundColor = getColor();
            savePixelArt();
        })
        pixel.addEventListener('mouseover', () => {
            if (!draw) return
            pixel.style.backgroundColor = getColor();
            savePixelArt();
        })
    }
}

let draw = false;
let firstPaintRender = true;

const createPixelBox = (value, pixelColor) => {
    pixelsContainer.innerHTML = '';
    pixelsContainer.style.setProperty('--size', value)
    for (let i = 0; i < value * value; i += 1) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.backgroundColor = 'rgb(255, 255, 255)'
        pixelsContainer.appendChild(pixel);
        if (!firstPaintRender) {
            if (pixelColor !== undefined) {
                pixel.style.backgroundColor = pixelColor[i];
            }
        }
    }
    paintPixels()
};

const verifyInput = () => {
    const inputValue = input.value
    if (!inputValue) {
        alert('Precisa de pelo menos algum numero')
    } else if (inputValue > 50) {
        return alert('50 é o máximo')
    } else if (inputValue <= 0 || inputValue < 5) {
        return alert('Apenas numeros acima de 5')
    } else {
        createPixelBox(inputValue)
    }
}

const randomColor = () => {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return `rgba(${r}, ${g}, ${b}, ${1})`;
}

const checkPalletColors = () => {
    const pixelArt = JSON.parse(localStorage.getItem('PixelArtInfo'));
    const allPixels = [...pixels]
    const white = 'rgb(255, 255, 255)';
    const pixelBackground = allPixels.map((pixel) => pixel.style.backgroundColor);
    const isTrue = pixelBackground.every((pixel) => pixel === white);
    !isTrue ? input.value = pixelArt.boxSize : input.value = "";
    return isTrue;
}

const randomPalletColor = () => {
    const isTrue = checkPalletColors();
    const colors = JSON.parse(localStorage.getItem('PixelArtInfo'))
    if (isTrue) {
        for (let pallet of colorPallet) {
            pallet.style.backgroundColor = randomColor()
        }
    } else {
        const { fixedColorPallet: {secondColorPallet, thirdColorPallet, fourthColorPallet } } = colors;
        colorPallet[1].style.backgroundColor = secondColorPallet
        colorPallet[2].style.backgroundColor = thirdColorPallet
        colorPallet[3].style.backgroundColor = fourthColorPallet
    }
    colorPallet[0].style.backgroundColor = 'black';
}

let TorF = true;

const changeGrid = () => {
    if (TorF) {
        TorF = false;
        for (let pixel of pixels) {
            pixel.style.border = '0px'
        }
    } else {
        TorF = true;
        for (let pixel of pixels) {
            pixel.style.border = '1px solid black'
        }
    }
}

const getPixelArt = () => {
    const pixelArt = JSON.parse(localStorage.getItem('PixelArtInfo'));
    if (pixelArt !== null) {
        let size = pixelArt.boxSize;
        if (size > 50) {
            size = 10;
        } else if (size < 10) {
            size = 10;
        }
        input.value = size 
        const pixelColor = pixelArt.pixelColor;
        firstPaintRender = false;
        createPixelBox(size, pixelColor)
        if (pixelArt.gridDisabled) {
            changeGrid()
        }
    } else {
        createPixelBox(10)
    }
}

const clearPixels = () => {
    pixelsContainer.innerHTML = '';
    let inputValue = input.value;
    if (!inputValue) {
        inputValue = 10
        createPixelBox(inputValue);
    } else if (inputValue >= 5 && inputValue <= 50) {
        createPixelBox(inputValue);
    } else {
        createPixelBox(10);
    }
    savePixelArt();
}

const erasePixel = () => {
    for (let select of selected) {
        select.classList.remove('selected')
        eraseButton.classList.add('selected')
    }
}

window.addEventListener('mousedown', () => {
    draw = true;
})

window.addEventListener('mouseup', () => {
    draw = false;
})

window.onload = () => {
    createPixelBox(10)
    getPixelArt()
    randomPalletColor()
    savePixelArt()
    clearAll.addEventListener('click', clearPixels)
    confirmButton.addEventListener('click', verifyInput);
    eraseButton.addEventListener('click', erasePixel);
    gridButton.addEventListener('click', changeGrid);
}