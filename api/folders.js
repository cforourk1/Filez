import express from "express";
import { getFolders, getFoldersById } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

const router = express.Router();
export default router;

// GET /folders
router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

// GET /folders/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const folder = await getFoldersById(id);
  if (!folder) {
    return res.status(404).send("Folder not found");
  }
  res.send(folder);
});

// POST /folders/:id/files
router.post("/:id/files", async (req, res) => {
  const { id } = req.params;
  const folder = await getFoldersById(id);
  if (!folder) {
    return res.status(404).send("Folder not found");
  }
  if (!req.body) {
    return res.status(400).send("Request must have a body");
  }
  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).send("Missing required fields");
  }
  const file = await createFile({ name, size, folder_id: id });
  res.status(201).send(file);
});
