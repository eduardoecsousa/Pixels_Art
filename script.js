var colors = document.querySelectorAll('.color');
var buttonReadon = document.getElementById('button-random-color');
var geraCores = function () {
    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")");
};
var setLocalStorage = function () {
    var objColor = {
        color1: colors[1].style.backgroundColor,
        color2: colors[2].style.backgroundColor,
        color3: colors[3].style.backgroundColor
    };
    localStorage.setItem('colorPalette', JSON.stringify(objColor));
};
var insereCores = function () {
    colors.forEach(function (color, index) {
        if (index > 0) {
            color.style.backgroundColor = geraCores();
        }
    });
    setLocalStorage();
};
window.onload = function () {
    if (localStorage.colorPalette) {
        var getStorage = localStorage.getItem('colorPalette');
        var convertStorage_1 = JSON.parse(getStorage || '{}');
        colors.forEach(function (color, index) {
            if (index > 0) {
                color.style.backgroundColor = convertStorage_1["color".concat(index)];
            }
        });
    }
    else {
        insereCores();
    }
};
buttonReadon === null || buttonReadon === void 0 ? void 0 : buttonReadon.addEventListener('click', insereCores);
