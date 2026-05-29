import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getLocalKnowledgeBase } from "./knowledge";

const EMBEDDING_MODEL = "text-embedding-004";

interface CachedEmbedding {
  fileName: string;
  filePath: string;
  fileHash: string; // MD5/Timestamp hash to detect content changes
  embedding: number[];
  content: string;
}

function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set for embedding generation");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Calculates the cosine similarity between two numeric vectors.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Helper to compute the vector embedding of a string using Gemini.
 */
async function computeEmbedding(text: string, apiKeyOverride?: string): Promise<number[]> {
  const apiKey = apiKeyOverride ?? process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("No Gemini API key available for embeddings");
  
  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ model: EMBEDDING_MODEL });
  
  const result = await model.embedContent(text);
  if (!result.embedding?.values) {
    throw new Error("Failed to generate embedding from Gemini API");
  }
  return result.embedding.values;
}

/**
 * Synchronizes and updates the local embeddings cache file.
 * Scans 'knowledge_base/' and re-computes embeddings only for new or modified files.
 */
export async function syncEmbeddingsCache(apiKeyOverride?: string): Promise<CachedEmbedding[]> {
  const folderPath = path.join(process.cwd(), "knowledge_base");
  const cachePath = path.join(process.cwd(), "data", "knowledge_base_embeddings.json");

  let cache: CachedEmbedding[] = [];
  if (fs.existsSync(cachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    } catch {
      cache = [];
    }
  }

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".md"));
  const updatedCache: CachedEmbedding[] = [];
  let cacheModified = false;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fileStats = fs.statSync(filePath);
    const fileHash = `${fileStats.size}_${fileStats.mtimeMs}`; // Simple fast hash

    // Try to find in existing cache
    const existing = cache.find(c => c.fileName === file);

    if (existing && existing.fileHash === fileHash) {
      // Content has not changed, keep cached embedding
      updatedCache.push(existing);
    } else {
      // New or modified file — generate new embedding
      console.log(`[RAG-Vector] Generating new embedding for: ${file}`);
      try {
        const embedding = await computeEmbedding(content, apiKeyOverride);
        updatedCache.push({
          fileName: file,
          filePath,
          fileHash,
          embedding,
          content,
        });
        cacheModified = true;
      } catch (err) {
        console.error(`[RAG-Vector] Failed to embed file ${file}:`, err);
        // Keep existing on failure if available to avoid complete loss
        if (existing) updatedCache.push(existing);
      }
    }
  }

  // Save cache to disk if anything changed
  if (cacheModified && updatedCache.length > 0) {
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(cachePath, JSON.stringify(updatedCache, null, 2), "utf-8");
      console.log(`[RAG-Vector] Embeddings cache file synchronized successfully.`);
    } catch (err) {
      console.error(`[RAG-Vector] Failed to write embeddings cache to disk:`, err);
    }
  }

  return updatedCache;
}

/**
 * Perform a real-time semantic RAG search.
 * Returns only the top relevant Markdown nodes based on Cosine Similarity.
 * 
 * @param query           - The user's query
 * @param limit           - Maximum number of relevant notes to retrieve (default: 3)
 * @param apiKeyOverride  - Custom Gemini API key (for multi-tenant support)
 */
export async function getSemanticKnowledgeContext(
  query: string,
  limit = 3,
  apiKeyOverride?: string
): Promise<string> {
  try {
    // 1. Sync cache (checks in milliseconds if files are unchanged)
    const cachedNotes = await syncEmbeddingsCache(apiKeyOverride);
    
    if (cachedNotes.length === 0) {
      console.log(`[RAG-Vector] Embeddings empty — falling back to complete concatenation`);
      return getLocalKnowledgeBase();
    }

    // 2. Embed user's message query (single fast API call)
    const queryEmbedding = await computeEmbedding(query, apiKeyOverride);

    // 3. Compute cosine similarity against all cached notes in-memory (0ms latency)
    const matches = cachedNotes.map(note => {
      const similarity = cosineSimilarity(queryEmbedding, note.embedding);
      return { note, similarity };
    });

    // 4. Sort and select top matching notes
    matches.sort((a, b) => b.similarity - a.similarity);
    const topMatches = matches.slice(0, limit);

    console.log(`[RAG-Vector] Semantic matches found for: "${query.substring(0, 30)}..."`);
    topMatches.forEach((m, idx) => {
      console.log(`   #${idx + 1}: ${m.note.fileName} (Score: ${(m.similarity * 100).toFixed(1)}%)`);
    });

    // 5. Concatenate and return only the selected relevant notes
    let semanticContext = "";
    for (const match of topMatches) {
      semanticContext += `\n\n--- INICIO NOTA OBSIDIAN: ${match.note.fileName} (Relevancia: ${(match.similarity * 100).toFixed(0)}%) ---\n${match.note.content}\n--- FIN NOTA OBSIDIAN: ${match.note.fileName} ---\n`;
    }

    return semanticContext.trim();
  } catch (err) {
    console.error(`[RAG-Vector] Semantic RAG failed, falling back gracefully to full context:`, err);
    return getLocalKnowledgeBase();
  }
}
