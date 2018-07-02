function setUpEditColorButton() {
    const editColorButton = document.getElementById("editColorButton");
    const popup = document.getElementById("popup");

    editColorButton.addEventListener("click", () => {
        if(!window.popupIsOpen) {
            const heading = document.createElement("h3");
            heading.innerHTML = `You can add 10 more colors using the color picker 
            and the add color button! Currently you can't edit or delete
            previous colors, so try to get it right the first time`;
            heading.style.textAlign = "center";

            //editColorPopup is what I will be attaching everything to in this module
            const editColorPopup = document.createElement("div");
            editColorPopup.id = "editColorPopup";
            popup.appendChild(editColorPopup);

            editColorPopup.style.width = "100%";
            editColorPopup.style.height = "100%";
            editColorPopup.appendChild(heading);

            //Set up the inputs so that people can add more colors
            const colorPicker = document.createElement("input");
            colorPicker.type = "color";
            colorPicker.id = "colorPicker";
            editColorPopup.appendChild(colorPicker);
            
            const addButton = document.createElement("button");
            addButton.id = "addButton";
            addButton.innerHTML = "Add Color";
            editColorPopup.appendChild(addButton);
            addButton.addEventListener("click", () => {
                const colorValue = document.getElementById("colorPicker").value;
                window.colorHistoryArray.push(colorValue);

                document.getElementById("sampleColors").outerHTML="";

                const sampleColors = document.createElement("div");
                editColorPopup.appendChild(sampleColors);

                sampleColors.id = "sampleColors";
                sampleColors.style.width = "100%";
                sampleColors.style.height = "20%";
                sampleColors.style.marginLeft = "5px";
                sampleColors.style.marginRight = "5px";

                populateColors();
            });
            

            const sampleColors = document.createElement("div");
            editColorPopup.appendChild(sampleColors);

            sampleColors.id = "sampleColors";
            sampleColors.style.width = "100%";
            sampleColors.style.height = "20%";
            sampleColors.style.marginLeft = "5px";
            sampleColors.style.marginRight = "5px";

            populateColors();

            window.popupIsOpen = true;

            popup.style.display = "block";
        } else {
            popup.style.display = "none";
            window.popupIsOpen = false;

            //Deletes the element
            document.getElementById("editColorPopup").outerHTML="";

        }
    });
}

function populateColors() {
    for(let c in window.colorHistoryArray) {
        const newSampleColor = document.createElement("div");
        const sampleColors = document.getElementById("sampleColors");
        sampleColors.appendChild(newSampleColor);

        newSampleColor.style.width = "7%";
        newSampleColor.style.height = "90%";
        newSampleColor.style.display = "inline-block";
        newSampleColor.style.margin = "0 auto";

        const backgroundColor = window.colorHistoryArray[c];
        newSampleColor.style.backgroundColor = backgroundColor;

        newSampleColor.addEventListener("click", () => {
            window.currentColor = backgroundColor;

            const editSampleColor = document.getElementById("editSampleColor");
            editSampleColor.style.backgroundColor = window.currentColor;
        });
    }
}

function setUpInputs() {
    //Set up the inputs so that people can add more colors
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";

}

module.exports = setUpEditColorButton;