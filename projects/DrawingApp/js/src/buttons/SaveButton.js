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