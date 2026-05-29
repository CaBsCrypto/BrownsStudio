const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const EMBEDDING_MODEL = "text-embedding-004";

async function run() {
  console.log("[Build-Embeddings] Starting pre-compilation of knowledge base...");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Build-Embeddings] WARNING: GEMINI_API_KEY is not defined in environment variables."
    );
    console.warn(
      "[Build-Embeddings] Skipping embedding pre-generation. The system will fallback to complete concatenation."
    );
    process.exit(0);
  }

  const folderPath = path.join(process.cwd(), "knowledge_base");
  const cachePath = path.join(process.cwd(), "data", "knowledge_base_embeddings.json");

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    console.log("[Build-Embeddings] 'knowledge_base/' directory not found. Skipping.");
    process.exit(0);
  }

  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("[Build-Embeddings] No Markdown (.md) notes found in 'knowledge_base/'. Skipping.");
    process.exit(0);
  }

  console.log(`[Build-Embeddings] Found ${files.length} notes to embed using: ${EMBEDDING_MODEL}`);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
  const compiledCache = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fileStats = fs.statSync(filePath);
    const fileHash = `${fileStats.size}_${fileStats.mtimeMs}`;

    console.log(`[Build-Embeddings] Generating embedding for: ${file} (${content.length} chars)`);

    try {
      const result = await model.embedContent(content);
      if (!result.embedding?.values) {
        throw new Error("Empty embedding returned");
      }

      compiledCache.push({
        fileName: file,
        filePath,
        fileHash,
        embedding: result.embedding.values,
        content,
      });
    } catch (err) {
      console.error(`[Build-Embeddings] ERROR: Failed to embed file ${file}:`, err.message);
      // Exit with error to fail the build if embeddings are critical
      process.exit(1);
    }
  }

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(cachePath, JSON.stringify(compiledCache, null, 2), "utf-8");
    console.log(
      `[Build-Embeddings] SUCCESS: Pre-compiled ${compiledCache.length} note embeddings to: ${cachePath}`
    );
  } catch (err) {
    console.error("[Build-Embeddings] ERROR: Failed to write cache file to disk:", err.message);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("[Build-Embeddings] Fatal error in execution:", err);
  process.exit(1);
});
