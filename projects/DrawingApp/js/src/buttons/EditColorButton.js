function setUpEditColorButton() {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("change", () => {
        window.currentColor = colorPicker.value;
    });
}

module.exports = setUpEditColorButton;