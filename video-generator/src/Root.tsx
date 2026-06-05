import React from "react";
import { PitchVideo } from "./PitchVideo";
import { ReelVideo } from "./ReelVideo";

/**
 * Root component — exposes ALL compositions in Remotion Studio:
 *   • Pitch videos (horizontal, 1080×1920, from leads.json)
 *   • Reel videos  (vertical  9:16, 1080×1920, from reel-leads.json)
 */
export const Root: React.FC = () => {
  return (
    <>
      <PitchVideo />
      <ReelVideo />
    </>
  );
};
