import React from "react";
import { AbsoluteFill, staticFile, Audio, Sequence } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { LightLeak } from "@remotion/light-leaks";
import { PitchVideoProps, defaultVideoProps } from "./types";
import { HookSlide } from "./components/HookSlide";
import { WhatsAppChat } from "./components/WhatsAppChat";
import { PipelineDiagram } from "./components/PipelineDiagram";
import { OutroSlide } from "./components/OutroSlide";

// We receive dynamic durations from calculateMetadata
const PIPELINE_FRAMES = 180;

// Transition durations
const SLIDE_DURATION = 20;
const FADE_DURATION = 15;
const LIGHT_LEAK_DURATION = 30;

export const PitchVideoComposition: React.FC<PitchVideoProps> = (props) => {
  const inputProps: PitchVideoProps = {
    ...defaultVideoProps,
    ...props,
  };

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

  // Absolute frame offsets for audio pings (accounting for transition overlaps)
  const hookExitFrame = hookDurationInFrames - SLIDE_DURATION;
  
  // Calculate ping frames dynamically based on message indexes
  const messagePings = messages.map((_, index) => hookExitFrame + 20 + index * 45);

  const pipelineEntryFrame = hookExitFrame + whatsappDurationInFrames - SLIDE_DURATION;
  const alert0Frame = pipelineEntryFrame + 30;
  const alert1Frame = pipelineEntryFrame + 60;
  const alert2Frame = pipelineEntryFrame + 100;
  const alert3Frame = pipelineEntryFrame + 130;

  // Exact start frame of the OutroSlide in the TransitionSeries absolute timeline
  const outroStartFrame = pipelineEntryFrame + PIPELINE_FRAMES - FADE_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: "#080e2e" }}>
      {/* ─── AUDIO: Background Music (looping, low volume) ─── */}
      <Audio src={staticFile("music.mp3")} volume={0.06} loop />

      {/* ─── AUDIO: Primary Voiceovers (Top-level Sequence to prevent TransitionSeries duplication bugs) ─── */}
      <Sequence from={0} durationInFrames={hookDurationInFrames}>
        <Audio src={staticFile(`voiceovers/${id}_hook.mp3`)} volume={1} />
      </Sequence>

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <Audio src={staticFile(`voiceovers/outro_v3.mp3`)} volume={1} />
      </Sequence>

      {/* ─── AUDIO: WhatsApp notification pings ─── */}
      {messagePings.map((pingFrame, i) => (
        <Sequence key={i} from={pingFrame} durationInFrames={30}>
          <Audio src={staticFile("notification.mp3")} volume={0.12} />
        </Sequence>
      ))}

      {/* Pipeline alert 0 (Obsidian) */}
      <Sequence from={alert0Frame} durationInFrames={30}>
        <Audio src={staticFile("beep.wav")} volume={0.12} />
      </Sequence>

      {/* Pipeline alert 1 */}
      <Sequence from={alert1Frame} durationInFrames={30}>
        <Audio src={staticFile("beep.wav")} volume={0.12} />
      </Sequence>

      {/* Pipeline alert 2 */}
      <Sequence from={alert2Frame} durationInFrames={30}>
        <Audio src={staticFile("beep.wav")} volume={0.12} />
      </Sequence>

      {/* Pipeline alert 3 */}
      <Sequence from={alert3Frame} durationInFrames={30}>
        <Audio src={staticFile("beep.wav")} volume={0.12} />
      </Sequence>

      {/* ─── VISUAL SCENES with TransitionSeries ─── */}
      <TransitionSeries>
        {/* 1. HOOK SLIDE */}
        <TransitionSeries.Sequence durationInFrames={hookDurationInFrames}>
          <HookSlide hookText={hookText} industry={industry} durationInFrames={hookDurationInFrames} />
        </TransitionSeries.Sequence>

        {/* Transition: Hook → WhatsApp — slide from bottom */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE_DURATION })}
        />

        {/* 2. WHATSAPP CHAT */}
        <TransitionSeries.Sequence durationInFrames={whatsappDurationInFrames}>
          {/* LightLeak overlay at the start of this sequence (plays over the cut) */}
          <AbsoluteFill>
            <WhatsAppChat
              businessName={businessName}
              botName={botName}
              messages={messages}
            />
          </AbsoluteFill>
          <Sequence durationInFrames={LIGHT_LEAK_DURATION}>
            <LightLeak seed={3} hueShift={180} />
          </Sequence>
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
          <Sequence durationInFrames={LIGHT_LEAK_DURATION}>
            <LightLeak seed={7} hueShift={240} />
          </Sequence>
        </TransitionSeries.Sequence>

        {/* Transition: Pipeline → Outro — smooth fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_DURATION })}
        />

        {/* 4. OUTRO */}
        <TransitionSeries.Sequence durationInFrames={outroDurationInFrames}>
          <OutroSlide ctaUrl={ctaUrl} industry={industry} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

    </AbsoluteFill>
  );
};
