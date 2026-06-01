import { registerRoot } from "remotion";
import { PitchVideo } from "./PitchVideo";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Register premium fonts for the video
loadOutfit();
loadInter();

// Register the core video composition
registerRoot(PitchVideo);
