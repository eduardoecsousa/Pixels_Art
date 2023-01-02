const colors = document.querySelectorAll<HTMLElement>('.color');
const buttonReadon = document.getElementById('button-random-color');

const geraCores = (): string => {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b})`;
};

const setLocalStorage = () => {
  const objColor = {
    color1: colors[1].style.backgroundColor,
    color2: colors[2].style.backgroundColor,
    color3: colors[3].style.backgroundColor,
  };
  localStorage.setItem('colorPalette', JSON.stringify(objColor));
};

const insereCores = () => {
  colors.forEach((color, index) => {
    if (index > 0) {
      color.style.backgroundColor = geraCores()
    }
  })
  setLocalStorage();
};

interface MyObj {
  color1: string,
  color2: string,
  color3: string,
}

window.onload = () => {
  if (localStorage.colorPalette) {
    const getStorage = localStorage.getItem('colorPalette')
    const convertStorage:MyObj = JSON.parse(getStorage || '{}');
    colors.forEach((color, index) => {
      if (index > 0) {
        color.style.backgroundColor = convertStorage[`color${index}`]
      }
    })
  } else {
    insereCores();
  }
};

buttonReadon?.addEventListener('click', insereCores);


