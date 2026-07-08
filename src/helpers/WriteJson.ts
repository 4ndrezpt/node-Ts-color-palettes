import { readFile, writeFile } from "fs/promises";
import { promises as fs, constants } from "fs";

const checkJsonFileExists = async (path: string):Promise<boolean> => {
  try {
    await fs.access(`./src/frontend/${path}/palettes.json`, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const readJsonFile = async (path:string):Promise<any> => {
  try {
    const fileContent = await readFile(`./src/frontend/${path}/palettes.json`, "utf8");
    const currentData: any[] = await JSON.parse(fileContent);
    if (currentData === null) {
      return [];
    } else {
      return currentData;
    }
  } catch (error) {
    console.error(error);
  }
}

export const saveJsonFile = async <T>(path: string, data: any):Promise<void> => {
  const fileExists = await checkJsonFileExists(`${path}`);
  console.log(fileExists)
  if (!fileExists) {
    //file does not exist so create one
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      let jsonArray = [jsonContent]
      await writeFile(`./src/frontend/${path}/palettes.json`, jsonArray, "utf8");
      console.log("JSON file successfully created!");
    } catch (error) {
      console.error("Error writting file: ", error);
    }
  } else {
    try {
      // append to an existent file
      let currentData = await readJsonFile(path);
      console.log("data found:", typeof (currentData));
      let currentArray = [currentData];

      if (currentData.length > 1) {
        currentData.push(data);
        console.log("currentArray", currentData);
        const jsonUpdated = JSON.stringify(currentData, null, 2);
        await writeFile(`./src/frontend/${path}/palettes.json`, jsonUpdated, "utf8");
      } else {
        currentArray.push(data);
        console.log("currentDara", currentArray);
        const jsonUpdated = JSON.stringify(currentArray, null, 2);
        await writeFile(`./src/frontend/${path}/palettes.json`, jsonUpdated, "utf8");
      }

      //currentData.push(data);
      console.log("JSON file successfully updated!");
    } catch (error) {
      console.error("Error processing the JSON file: ", error)
    }
  }
}

/*
interface User {
  id: string,
  name: string,
  email: string
}
const user1 : User = {
  id: "2",
  name: "Andres Zain",
  email: "andresz@email.com"
}
const newData = [user1]
saveJsonFile("jsonData", user1);
*/
