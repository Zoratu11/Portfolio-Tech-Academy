function setUpEditLineWidthButton() {
    const lineWidthPicker = document.getElementById("lineWidthPicker");
    lineWidthPicker.addEventListener("change", () => {
        window.lineWidth = lineWidthPicker.value;
    });
}

module.exports = setUpEditLineWidthButton;