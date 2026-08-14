import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.resolve("data");
const DATA_PREFIX = DATA_DIR + path.sep;

const MAX_NOTE_CONTENT = 5000;

function resolveSafeDataPath(fileName: string): string {
  const resolvedPath = path.resolve(DATA_DIR, fileName);

  if (
    resolvedPath !== DATA_DIR &&
    !resolvedPath.startsWith(DATA_PREFIX)
  ) {
    throw new Error("Invalid note path");
  }

  return resolvedPath;
}

export async function loadNotes() {
  const files = await fs.readdir(DATA_DIR);

  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = resolveSafeDataPath(file);

        const content = await fs.readFile(filePath, "utf-8");

        const truncated =
          content.length > MAX_NOTE_CONTENT;

        return {
          id: file,
          title: file.replace(".md", ""),
          content: truncated
            ? content.slice(0, MAX_NOTE_CONTENT) +
              "\n\n[Content truncated]"
            : content,
        };
      })
  );

  return notes;
}

export async function searchNotes(query: string, limit = 5) {
  const notes = await loadNotes();

  const results = notes
    .filter((note) =>
      note.content.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, limit);

  return results;
}

export async function getNote(noteId: string) {
  const notePath = resolveSafeDataPath(noteId);

  if (!notePath.endsWith(".md")) {
    throw new Error("Invalid note path");
  }

  const notes = await loadNotes();

  return notes.find(
    (note) => note.id === path.basename(notePath)
  );
}

export async function createNote(
  title: string,
  content: string
) {
  const fileName = `${title
    .toLowerCase()
    .replaceAll(" ", "-")}.md`;

  const filePath = resolveSafeDataPath(fileName);

  await fs.writeFile(
    filePath,
    content,
    "utf-8"
  );

  return {
    id: fileName,
    title,
    content,
  };
}