import express, {  Request, Response } from "express";
import { randomUUID } from "crypto";
import { Color, ColorPalette, ColorRequest } from "./types/types";

const app = express();
const PORT: number = 3000;

app.use(express.static("./src/public"));
app.use(express.urlencoded);


app.post("/register", (req: Request, res: Response) => {
  const { title, description, colors }: ColorRequest = req.body;
  const colorValues : Color[] = [...colors];
  const map: Map<string, number> = new Map();
  colorValues?.forEach(value => {
    if (map.has(value.name)) {
      const ref = map.get(value.name);
      ref && map.set(value.name, ref + 1);
    } else {
      map.set(value.name, 1);
    }
    let repeated: boolean = false;
    map.forEach((value, key) => {
      if (value > 1) {
        repeated = true;
      }
    });
    if (repeated) {
      res.redirect(".src/public/error.html");
    } else {
      const palette: ColorPalette = {
        id: randomUUID(),
        title: title,
        description: description,
        colors: colorValues
      };
      res.redirect(".src/public");

    }
  });

});

app.listen(PORT, () => {
  console.log(`Server initialized in port ${PORT}`);
});
