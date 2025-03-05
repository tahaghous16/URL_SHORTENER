import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join("data", "links.json");

export const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

export const saveLinks = async (links) => {
  try {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving links:", error);
  }
};
