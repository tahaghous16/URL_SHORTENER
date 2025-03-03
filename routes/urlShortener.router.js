import { readFile, writeFile } from "fs/promises";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import express from "express";

const router = express.Router();

const DATA_FILE = path.join("data", "links.json");

const loadLinks = async () => {
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

const saveLinks = async (links) => {
  try {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving links:", error);
  }
};

router.get("/", async (req, res) => {
  try {
    const file = await fs.readFile(path.join("views", "index.html"));
    const links = await loadLinks();

    const content = file.toString().replaceAll(
      "{{shortened-urls}}",
      Object.entries(links)
        .map(
          ([shortCode, url]) => `
            <li class="d-flex flex-wrap align-items-center mb-2">
              <a href="/${shortCode}" target="_blank" class="fw-bold text-success me-2">${req.get(
            "host"
          )}/${shortCode}</a> 
              <span class="text-secondary">→</span>
              <span class="text-primary ms-2 text-truncate long-url" title="${url}">${url}</span>
            </li>`
        )
        .join("")
    );

    return res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(6).toString("hex");

    const links = await loadLinks();
    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please enter another.");
    }
    links[finalShortCode] = url;
    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {}
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error");
    return res.redirect(links[shortCode]);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

export const shortenerUrlRoutes = router;
