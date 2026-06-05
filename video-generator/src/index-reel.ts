import { registerRoot } from "remotion";
import { ReelVideo } from "./ReelVideo";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Register premium fonts (same as the pitch format)
loadOutfit();
loadInter();

// Register only the Reel compositions
registerRoot(ReelVideo);
