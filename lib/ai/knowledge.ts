import fs from "fs";
import path from "path";

/**
 * Dynamically reads and concatenates all Obsidian Markdown (.md) notes from the 
 * "knowledge_base/" folder, maintaining file-by-file separators to give the LLM 
 * structured context. Falls back to reading "knowledge_base.md" at the root if the 
 * directory is not found.
 */
export function getLocalKnowledgeBase(): string {
  const folderPath = path.join(process.cwd(), "knowledge_base");
  const fallbackFilePath = path.join(process.cwd(), "knowledge_base.md");

  try {
    // 1. Primary: Load all markdown files from the "knowledge_base/" directory
    if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);
      const markdownFiles = files
        .filter((file) => file.endsWith(".md"))
        .sort(); // Sort alphabetically (e.g. 1_Charlie.md, 2_Servicios.md)

      if (markdownFiles.length > 0) {
        let concatenatedContent = "";
        for (const file of markdownFiles) {
          const filePath = path.join(folderPath, file);
          const content = fs.readFileSync(filePath, "utf-8");
          concatenatedContent += `\n\n--- INICIO NOTA OBSIDIAN: ${file} ---\n${content}\n--- FIN NOTA OBSIDIAN: ${file} ---\n`;
        }
        return concatenatedContent.trim();
      }
    }

    // 2. Fallback: Read the single "knowledge_base.md" from the root
    if (fs.existsSync(fallbackFilePath)) {
      return fs.readFileSync(fallbackFilePath, "utf-8");
    }
  } catch (err) {
    console.error("[knowledge] Failed to read local knowledge base:", err);
  }
  return "";
}
