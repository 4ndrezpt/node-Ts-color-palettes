console.log("script connected ...");
getColors();
async function getColors() {
    try {
        const res = await fetch("/getAll");
        const resFile = await fetch("../../jsonData/palettes.json");
        const json = (await res.json());
        const jsonFile = (await resFile.json());
        if (jsonFile && jsonFile.length > 0) {
            const items = jsonFile.map((item) => {
                console.log(item);
                const paletteContainer = document.createElement("div");
                paletteContainer.classList.add("palette-container");
                const divTitle = document.createElement("div");
                divTitle.classList.add("palette__header");
                const divBody = document.createElement("div");
                divBody.classList.add("palette__body");
                const paletteTitle = document.createElement("h4");
                const paletteDescription = document.createElement("p");
                paletteContainer.appendChild(divTitle);
                paletteTitle.textContent = item.title;
                paletteDescription.textContent = item.description;
                divTitle.appendChild(paletteTitle);
                divTitle.appendChild(paletteDescription);
                const colors = [item.color1, item.color2, item.color3, item.color4];
                for (let color of colors) {
                    const divColor = document.createElement("div");
                    paletteContainer.classList.add(`color`);
                    divColor.textContent = color;
                    divColor.style.backgroundColor = color;
                    divBody.appendChild(divColor);
                    paletteContainer.appendChild(divBody);
                }
                const palettesContainer = document.createElement("div");
                palettesContainer.appendChild(paletteContainer);
                return palettesContainer;
            });
            document.querySelector("#items")?.append(...items);
        }
    }
    catch (error) {
        console.error("Error type: ", error);
    }
}
export {};
