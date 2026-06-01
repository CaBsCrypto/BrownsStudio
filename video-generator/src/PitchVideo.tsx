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
    // 1. Measure the generated AI voiceovers
    const hookDurationSec = await getAudioDuration(staticFile(`voiceovers/${props.id}_hook.mp3`));
    const outroDurationSec = await getAudioDuration(staticFile("voiceovers/outro_v3.mp3"));

    // Add small buffer to let the animation breathe
    const hookFrames = Math.ceil(hookDurationSec * 30) + 15;
    const outroFrames = Math.ceil(outroDurationSec * 30) + 15;

    // Dynamically calculate WhatsApp frames based on number of messages
    const messageCount = props.messages?.length || 2;
    const WHATSAPP_FRAMES = messageCount * 45 + 20; // 45 frames (1.5s) per message + buffer

    const PIPELINE_FRAMES = 180;
    const SLIDE_DURATION = 20;
    const FADE_DURATION = 15;

    const totalDuration =
      hookFrames +
      WHATSAPP_FRAMES +
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
        whatsappDurationInFrames: WHATSAPP_FRAMES, // Pass this down!
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
