console.log("script connected ...");
getColors();
async function getColors() {
    try {
        const res = await fetch("/getAll");
        const json = (await res.json());
        if (json && json.length > 0) {
            const items = json.map((item) => {
                const paletteContainer = document.createElement("div");
                paletteContainer.classList.add("palette-container");
                const divTitle = document.createElement("div");
                const paletteTitle = document.createElement("h4");
                const paletteDescription = document.createElement("p");
                paletteContainer.appendChild(divTitle);
                paletteTitle.textContent = item.title;
                paletteDescription.textContent = item.description;
                divTitle.appendChild(paletteTitle);
                divTitle.appendChild(paletteDescription);
                for (let color of item.colors) {
                    const divColor = document.createElement("div");
                    paletteContainer.classList.add(`color`);
                    divColor.textContent = color.name;
                    divColor.style.backgroundColor = color.name;
                    paletteContainer.appendChild(divColor);
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
