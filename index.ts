import express, {  Request, Response } from "express";
import { randomUUID } from "crypto";
import { Color, ColorPalette, ColorRequest } from "./src/types/types";
import { saveJsonFile, readJsonFile } from "./src/helpers/WriteJson";

const app = express();
const PORT: number = 3000;

app.use(express.static("./src/frontend"));
app.use(express.urlencoded());

const palettes: ColorPalette[] = [];

app.post("/register", (req: Request, res: Response) => {

  const { title, description, color1, color2, color3, color4 }: ColorRequest = req.body;
  console.log(title);
  const colorValues = [color1, color2, color3, color4];
  const map: Map<string, number> = new Map();
  colorValues?.forEach(value => {
    if (map.has(value)) {
      const ref = map.get(value);
      ref && map.set(value, ref + 1);
    } else {
      map.set(value, 1);
    }

  });
  let repeated: boolean = false;
  map.forEach((value) => {
    if (value > 1) {
      repeated = true;
    }
  });
  if (repeated) {
    res.redirect("error.html");
  } else {
    const palette: ColorPalette = {
      id: randomUUID(),
      title: title,
      description: description,
      color1: color1,
      color2: color2,
      color3: color3,
      color4: color4
    };
    palettes.push(palette);
    console.log(palettes);
    // write the palette into a jsonFile
    saveJsonFile("jsonData",palette);
    res.redirect("/");
  }
});
/*
app.get("/",  (req: Request, res: Response) => {
  res.send(".src/frontend");
})
*/

app.get("/getAll", (req: Request, res: Response) => {

  res.json(palettes);

})

app.listen(PORT, () => {
  console.log(`Server initialized in port ${PORT}`);
});
