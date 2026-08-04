import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.resolve("data");

export async function loadNotes() {
  const files = await fs.readdir(DATA_DIR);

  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const content = await fs.readFile(
          path.join(DATA_DIR, file),
          "utf-8"
        );

        return {
          id: file,
          title: file.replace(".md", ""),
          content,
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
  const notes = await loadNotes();

  return notes.find((note) => note.id === noteId);
}

export async function createNote(
  title: string,
  content: string
) {
  const fileName = `${title.toLowerCase().replaceAll(" ", "-")}.md`;

  await fs.writeFile(
    path.join(DATA_DIR, fileName),
    content,
    "utf-8"
  );

  return {
    id: fileName,
    title,
    content,
  };
}