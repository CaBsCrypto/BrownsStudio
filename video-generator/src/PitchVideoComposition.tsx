import React from "react";
import { AbsoluteFill, staticFile, Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { LightLeak } from "@remotion/light-leaks";
import { PitchVideoProps, defaultVideoProps } from "./types";
import { HookSlide } from "./components/HookSlide";
import { WhatsAppChat, getAppearFrame } from "./components/WhatsAppChat";
import { PipelineDiagram } from "./components/PipelineDiagram";
import { OutroSlide } from "./components/OutroSlide";
import { DentalHookSlide } from "./components/DentalHookSlide";
import { DentalPipeline3D } from "./components/DentalPipeline3D";
import { DentalOutroSlide } from "./components/DentalOutroSlide";

// We receive dynamic durations from calculateMetadata
const PIPELINE_FRAMES = 330;

// Transition durations
const SLIDE_DURATION = 20;
const FADE_DURATION = 15;
const LIGHT_LEAK_DURATION = 30;

export const PitchVideoComposition: React.FC<PitchVideoProps> = (props) => {
  const inputProps: PitchVideoProps = {
    ...defaultVideoProps,
    ...props,
  };

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Volume fade-out for Chat Ambient so it doesn't bleed into Pipeline
  const chatVolume = interpolate(
    frame,
    [650, 680],
    [0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const {
    id,
    businessName,
    industry,
    botName,
    hookText,
    messages = [],
    ctaUrl,
    crmLabel,
    actions,
    hookDurationInFrames = 120,
    outroDurationInFrames = 150,
    whatsappDurationInFrames = 270,
  } = inputProps;

  const isDental = true;

  // Absolute frame offsets for audio pings (accounting for transition overlaps)
  const hookExitFrame = hookDurationInFrames - SLIDE_DURATION;
  
  // Sync audio pings perfectly with the visual bubble appearance
  const messagePings = messages.map((_, index) => hookExitFrame + getAppearFrame(index));

  const pipelineEntryFrame = hookExitFrame + whatsappDurationInFrames - SLIDE_DURATION;
  const alert0Frame = pipelineEntryFrame + 30;
  const alert1Frame = pipelineEntryFrame + 60;
  const alert2Frame = pipelineEntryFrame + 100;
  const alert3Frame = pipelineEntryFrame + 130;

  // Exact start frame of the OutroSlide in the TransitionSeries absolute timeline
  const outroStartFrame = pipelineEntryFrame + PIPELINE_FRAMES - FADE_DURATION;

  const musicFile = "music.mp3";
  const musicVolume = 0.06;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050B14" }}>
      {/* ─── AUDIO: Background Music (looping, low volume) ─── */}
      <Audio src={staticFile(musicFile)} volume={musicVolume} loop />

      {/* ─── AUDIO: Primary Voiceovers ─── */}
      {/* Hook Voiceover */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceovers/v1_dental_hook_v4.mp3")} volume={1} />
      </Sequence>

      {/* Pipeline Voiceover */}
      <Sequence from={pipelineEntryFrame}>
        <Audio src={staticFile("voiceovers/v1_dental_pipeline_v3.mp3")} volume={1} />
      </Sequence>

      {/* Outro Voiceover */}
      <Sequence from={outroStartFrame}>
        <Audio src={staticFile("voiceovers/v1_dental_outro_v3.mp3")} volume={1} />
      </Sequence>

      {/* WhatsApp notification pings */}
      {messagePings.map((pingFrame, i) => (
        <Sequence key={i} from={pingFrame} durationInFrames={30}>
          <Audio src={staticFile("notification.mp3")} volume={0.12} />
        </Sequence>
      ))}

      {/* ─── VISUAL SCENES with TransitionSeries ─── */}
      <TransitionSeries>
        {/* 1. HOOK SLIDE */}
        <TransitionSeries.Sequence durationInFrames={hookDurationInFrames}>
          <DentalHookSlide durationInFrames={hookDurationInFrames} />
        </TransitionSeries.Sequence>

        {/* Transition: Hook → WhatsApp — slide from bottom */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE_DURATION })}
        />

        {/* 2. WHATSAPP CHAT */}
        <TransitionSeries.Sequence durationInFrames={whatsappDurationInFrames}>
          <AbsoluteFill>
            <WhatsAppChat
              businessName={businessName}
              botName={botName}
              messages={messages}
              industry={industry}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition: WhatsApp → Pipeline — slide from left */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE_DURATION })}
        />

        {/* 3. PIPELINE DIAGRAM */}
        <TransitionSeries.Sequence durationInFrames={PIPELINE_FRAMES}>
          <AbsoluteFill>
              <PipelineDiagram
                businessName={businessName}
                crmLabel={crmLabel}
                actions={actions}
                industry={industry}
              />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition: Pipeline → Outro — smooth fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_DURATION })}
        />

        {/* 4. OUTRO */}
        <TransitionSeries.Sequence durationInFrames={outroDurationInFrames}>
          <DentalOutroSlide ctaUrl={ctaUrl} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

    </AbsoluteFill>
  );
};
