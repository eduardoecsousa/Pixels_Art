const setColor = document.querySelectorAll('.color');
const btnRamdomColor = document.getElementById('button-random-color');

const color1 = setColor[0];
const color2 = setColor[1];
const color3 = setColor[2];
const color4 = setColor[3];

const boardPixel = document.getElementById('pixel-board');

window.onload = (color1.classList.add('selected'));

const buttonClear = document.getElementById('clear-board');

const buttonSize = document.getElementById('generate-board');
const input = document.getElementById('board-size');

function assingFirstColor() {
  color1.style.backgroundColor = 'rgb(0, 0, 0)';
  color2.style.backgroundColor = 'red';
  color3.style.backgroundColor = 'yellow';
  color4.style.backgroundColor = 'blue';
}
assingFirstColor();

let n = 0;

function btnRamdom() {
  if (n === 3) {
    n = 0;
    return 3;
  } if (n === 2) {
    n += 1;
    return 2;
  } if (n === 1) {
    n += 1;
    return 1;
  }
  n += 1;
  return 0;
}

function colorRamdom2(num) {
  if (num === 0) {
    return '#BE529E';
  } if (num === 1) {
    return '#008018';
  } if (num === 2) {
    return '#7BB291';
  }
  return 'red';
}

function colorRamdom3(num) {
  if (num === 0) {
    return '#9F9F9F';
  } if (num === 1) {
    return '#ECCA9D';
  } if (num === 2) {
    return '#A26747';
  }
  return 'yellow';
}

function colorRamdom4(num) {
  if (num === 0) {
    return '#F76150';
  } if (num === 1) {
    return '#1F2955';
  } if (num === 2) {
    return '#0425AB';
  }
  return 'blue';
}

function buttonRamdomColor() {
  const num = btnRamdom();
  const corSelect2 = colorRamdom2(num);
  const corSelect3 = colorRamdom3(num);
  const corSelect4 = colorRamdom4(num);
  const objColor = {
    c2: color2.style.backgroundColor = corSelect2,
    c3: color3.style.backgroundColor = corSelect3,
    c4: color4.style.backgroundColor = corSelect4,
  };
  localStorage.setItem('colorPalette', JSON.stringify(objColor));
}

btnRamdomColor.addEventListener('click', buttonRamdomColor);

function storageLoad() {
  if (localStorage.colorPalette) {
    const convertStorage = JSON.parse(localStorage.getItem('colorPalette'));
    color2.style.backgroundColor = convertStorage.c2;
    color3.style.backgroundColor = convertStorage.c3;
    color4.style.backgroundColor = convertStorage.c4;
  }
}

storageLoad();

function assignsLine(numLine) {
  function createLine() {
    const line = document.createElement('div');
    line.className = 'line';
    return line;
  }
  function loopCreateLine(num) {
    for (let i = 1; i <= num; i += 1) {
      boardPixel.appendChild(createLine());
    }
  }
  if (numLine < 5) {
    loopCreateLine(5);
  } else if (numLine > 50) {
    loopCreateLine(50);
  } else {
    loopCreateLine(numLine);
  }
}

function createPixel() {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.style.backgroundColor = 'white';
  return pixel;
}
function assignsPixel() {
  const setPixel = document.querySelectorAll('.line');
  for (let i = 0; i < setPixel.length; i += 1) {
    for (let ix = 0; ix < setPixel.length; ix += 1) {
      setPixel[i].appendChild(createPixel());
    }
  }
}

function selectColor(event) {
  const getEvent = event.target;
  for (let i = 0; i < setColor.length; i += 1) {
    if (setColor[i].classList.contains('selected')) {
      setColor[i].classList.remove('selected');
    }
  }
  getEvent.classList.add('selected');
}

color1.addEventListener('click', selectColor);
color2.addEventListener('click', selectColor);
color3.addEventListener('click', selectColor);
color4.addEventListener('click', selectColor);

function paintPixel(event) {
  const selectedColor = document.querySelector('.selected').style.backgroundColor;
  const pixels = document.querySelectorAll('.pixel');

  const pixeltriggered = event.target;
  pixeltriggered.style.backgroundColor = selectedColor;
  const arrayPixel = [];
  for (let i = 0; i < pixels.length; i += 1) {
    arrayPixel.push(pixels[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayPixel));
}

function inputline() {
  const frameInput = Number(input.value);
  function clearpainel() {
    const lineDel = document.querySelectorAll('.line');
    for (let i = 0; i < lineDel.length; i += 1) {
      lineDel[i].remove();
    }
  }
  if (frameInput === 0) {
    alert('Board inválido!');
  } else {
    clearpainel();
    assignsLine(frameInput);
    assignsPixel();
    localStorage.setItem('boardSize', JSON.stringify(frameInput));
  }
}
function xablau() {
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', paintPixel);
  }
  return null;
}

function reloadPainel() {
  if (localStorage.boardSize) {
    const storageBoardSize = JSON.parse(localStorage.getItem('boardSize'));
    assignsLine(storageBoardSize);
    assignsPixel();
    xablau();
  } else {
    assignsLine(5);
    assignsPixel();
    xablau();
  }
}

reloadPainel();

buttonSize.addEventListener('click', inputline);
buttonSize.addEventListener('click', xablau);

function clearPainting() {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

buttonClear.addEventListener('click', clearPainting);

function storageLoadPainel() {
  const pixels = document.querySelectorAll('.pixel');
  if (localStorage.pixelBoard) {
    const convertStoragePainel = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = convertStoragePainel[i];
    }
  }
}

storageLoadPainel();
