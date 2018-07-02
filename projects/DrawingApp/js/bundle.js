(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
function setUpEditColorButton() {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("change", () => {
        window.currentColor = colorPicker.value;
    });
}

module.exports = setUpEditColorButton;
},{}],2:[function(require,module,exports){
function setUpEditLineWidthButton() {
    const lineWidthPicker = document.getElementById("lineWidthPicker");
    lineWidthPicker.addEventListener("change", () => {
        window.lineWidth = lineWidthPicker.value;
    });
}

module.exports = setUpEditLineWidthButton;
},{}],3:[function(require,module,exports){
function setUpSaveButton() {
    function download() {
        const drawingCanvas = document.getElementById("drawingCanvas");
        const dt = drawingCanvas.toDataURL("image/jpeg");
        this.href = dt;
    }
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", download);
}

module.exports = setUpSaveButton;
},{}],4:[function(require,module,exports){
window.currentColor = "#000000";
window.lineWidth = 1;

const paint = require('./paint/paint.js');

window.onload = paint();
},{"./paint/paint.js":5}],5:[function(require,module,exports){
function setUpPaint() {

    //This tool works better on computers than on other devices

    /*
    First we will get the window width and height
    then use that to size the canvas.
    */
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    window.popupIsOpen = false;

    const canvas = document.getElementById("drawingCanvas");
    const canvasWidth = parseFloat(windowWidth * 0.95);
    const canvasHeight = parseFloat(windowHeight * 0.85);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.zIndex = -1;
    canvas.style.position = "absolute";

    const lengthFromTop = parseFloat(windowHeight * 0.12);
    canvas.style.top = lengthFromTop + "px";
    const lengthFromLeft = parseFloat(windowWidth * 0.025);
    canvas.style.left = lengthFromLeft + "px";

    canvas.style.border = "1px solid";

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    const ctx = canvas.getContext("2d");

    //Set up all buttons
    const setUpEditColorButton = require('../buttons/EditColorButton.js');
    setUpEditColorButton();
    const setUpEditLineWidthButton = require("../buttons/EditLineWidthButton.js");
    setUpEditLineWidthButton();
    const setUpSaveButton = require("../buttons/SaveButton.js");
    setUpSaveButton();

    let startX;
    let startY;
    let mouseDown;

    function handleMouseDown(e) {
        e.preventDefault();
        startX = parseInt(e.clientX - lengthFromLeft);
        startY = parseInt(e.clientY - lengthFromTop);
        mouseDown = true;
    }

    function handleMouseMove(e) {
        //We use the length from top and left as the offset, otherwise
        //you will be drawing at the wrong place
        const offsetX = lengthFromLeft;
        const offsetY = lengthFromTop;

        if(!mouseDown) { 
            return;
        }
        e.preventDefault();

        const x = e.clientX - lengthFromLeft;
        const y = e.clientY - lengthFromTop;
        const coor = "Coordinates: (" + x + "," + y + ")";

        ctx.strokeStyle = window.currentColor;
        ctx.lineJoin = "round";
        ctx.lineWidth = window.lineWidth;
        ctx.lineHeight = window.lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        startX = x;
        startY = y;
    }

    function handleMouseUp(e) {
        e.preventDefault();
        mouseDown = false;
    }
}

module.exports = setUpPaint;
},{"../buttons/EditColorButton.js":1,"../buttons/EditLineWidthButton.js":2,"../buttons/SaveButton.js":3}]},{},[4]);
