import React from "react";
import { Composition, CalculateMetadataFunction, staticFile } from "remotion";
import { PitchVideoComposition } from "./PitchVideoComposition";
import { defaultVideoProps, PitchVideoProps } from "./types";
import { getAudioDuration } from "./utils/get-audio-duration";
import leads from "../leads.json";

const calculateMetadata: CalculateMetadataFunction<PitchVideoProps> = async ({
  props,
}) => {
  try {
    let hookFile = `voiceovers/${props.id}_hook.mp3`;
    let outroFile = "voiceovers/outro_v3.mp3";
    let messageCount = props.messages?.length || 2;
    let whatsappDurationInFrames = 270;

    if (props.industry === "dental") {
      hookFile = "voiceovers/v1_dental_hook_v4.mp3";
      outroFile = "voiceovers/v1_dental_outro_v3.mp3";
      whatsappDurationInFrames = 680;
    } else {
      whatsappDurationInFrames = messageCount * 45 + 20;
    }

    const hookDurationSec = await getAudioDuration(staticFile(hookFile));
    const outroDurationSec = await getAudioDuration(staticFile(outroFile));

    // Add small buffer to let the animation breathe
    const hookFrames = Math.ceil(hookDurationSec * 30) + 15;
    const outroFrames = Math.ceil(outroDurationSec * 30) + 15;

    const PIPELINE_FRAMES = 330;
    const SLIDE_DURATION = 20;
    const FADE_DURATION = 15;

    const totalDuration =
      hookFrames +
      whatsappDurationInFrames +
      PIPELINE_FRAMES +
      outroFrames -
      SLIDE_DURATION * 2 -
      FADE_DURATION;

    return {
      durationInFrames: totalDuration,
      props: {
        ...props,
        hookDurationInFrames: hookFrames,
        outroDurationInFrames: outroFrames,
        whatsappDurationInFrames: whatsappDurationInFrames,
      },
    };
  } catch (e) {
    console.warn("Could not calculate audio duration, using fallbacks:", e);
    return {
      durationInFrames: 755,
      props: {
        ...props,
        hookDurationInFrames: 120,
        outroDurationInFrames: 120,
        whatsappDurationInFrames: 270,
      },
    };
  }
};

export const PitchVideo: React.FC = () => {
  return (
    <>
      {leads.map((lead) => (
        <Composition
          key={lead.id}
          id={lead.id}
          component={PitchVideoComposition}
          durationInFrames={755}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={lead as PitchVideoProps}
          calculateMetadata={calculateMetadata}
        />
      ))}
    </>
  );
};
