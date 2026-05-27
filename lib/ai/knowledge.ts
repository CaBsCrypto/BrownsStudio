import fs from "fs";
import path from "path";

/**
 * Reads the local Obsidian-compatible knowledge base file (knowledge_base.md) from the project root.
 * This is injected directly into the LLM system prompt to ensure Charlie is perfectly trained
 * on your latest agency documentation and services.
 */
export function getLocalKnowledgeBase(): string {
  try {
    const filePath = path.join(process.cwd(), "knowledge_base.md");
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch (err) {
    console.error("[knowledge] Failed to read local knowledge base:", err);
  }
  return "";
}
