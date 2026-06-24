import React from "react";
import { Composition } from "remotion";
import { ReelVideoComposition } from "./ReelVideoComposition";
import { ReelVideoProps, REEL_DEFAULTS } from "./reel-types";
import reelLeads from "../reel-leads.json";

/**
 * Registers all reel compositions in Remotion.
 *
 * Reel format specs:
 *   - Resolution: 1080 × 1920 (9:16 vertical, same canvas as pitch)
 *   - FPS: 30
 *   - Target duration: ~1800 frames (~60 seconds)
 *
 * Each lead in reel-leads.json becomes a separate renderable composition
 * accessible in Remotion Studio and via `generate-reel.js`.
 */
export const ReelVideo: React.FC = () => {
  return (
    <>
      {(reelLeads as ReelVideoProps[]).map((lead) => {
        const hookFrames = lead.hookDurationInFrames ?? 210;
        const videoFrames = lead.videoSceneSrc ? (lead.videoSceneDurationInFrames ?? 150) : 0;
        const chatFrames = lead.chatDurationInFrames ?? 1350;
        const ctaFrames = lead.ctaDurationInFrames ?? 240;

        // Total duration accounting for transition overlaps
        const transitionOverlap = lead.videoSceneSrc ? (20 + 20 + 18) : (20 + 18); // slide + slide? + fade
        const totalFrames = hookFrames + videoFrames + chatFrames + ctaFrames - transitionOverlap;

        return (
          <Composition
            key={lead.id}
            id={lead.id}
            component={ReelVideoComposition}
            durationInFrames={totalFrames}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={lead}
          />
        );
      })}
    </>
  );
};
