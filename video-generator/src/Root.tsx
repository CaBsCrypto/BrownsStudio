import React from "react";
import { PitchVideo } from "./PitchVideo";
import { ReelVideo } from "./ReelVideo";
import { WebPromoVideo } from "./WebPromoVideo";

/**
 * Root component — exposes ALL compositions in Remotion Studio:
 *   • Pitch videos (horizontal, 1080×1920, from leads.json)
 *   • Reel videos  (vertical  9:16, 1080×1920, from reel-leads.json)
 *   • Web Promo video (vertical 9:16)
 */
export const Root: React.FC = () => {
  return (
    <>
      <PitchVideo />
      <ReelVideo />
      <WebPromoVideo />
    </>
  );
};
