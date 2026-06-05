import React from "react";
import {
  AbsoluteFill,
  staticFile,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  TransitionSeries,
  springTiming,
  linearTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { ReelVideoProps } from "./reel-types";
import { ReelStatHook } from "./components/ReelStatHook";
import { WhatsAppChat, getAppearFrame } from "./components/WhatsAppChat";
import { ReelCtaSlide } from "./components/ReelCtaSlide";

// Transition durations (in frames)
const SLIDE_DURATION = 20;
const FADE_DURATION = 18;

export const ReelVideoComposition: React.FC<ReelVideoProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    industry,
    businessName,
    botName,
    statNumber,
    statText,
    statSubline,
    messages = [],
    ctaUrl,
    ctaHeadline,
    hookDurationInFrames = 210,
    chatDurationInFrames = 1350,
    ctaDurationInFrames = 240,
  } = props;

  // ── Audio timing ────────────────────────────────────────────────────────
  const chatStartFrame = hookDurationInFrames - SLIDE_DURATION;
  const messagePings = messages.map(
    (_, index) => chatStartFrame + getAppearFrame(index)
  );
  const ctaStartFrame = chatStartFrame + chatDurationInFrames - FADE_DURATION;

  const musicVolume = interpolate(
    frame,
    [0, 30, ctaStartFrame, ctaStartFrame + ctaDurationInFrames - 30],
    [0, 0.08, 0.05, 0.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Voiceover file resolution ────────────────────────────────────────────
  // Falls back to existing pitch voiceovers while reel-specific ones are pending.
  //
  // Once you generate your ElevenLabs audio, place the files in public/voiceovers/:
  //   dental:   reel_dental_hook_v1.mp3  /  reel_dental_cta_v1.mp3
  //   abogados: reel_abogados_hook_v1.mp3 / reel_abogados_cta_v1.mp3
  // Then flip REEL_VO_READY to true.
  const REEL_VO_READY = true;

  const reelVoiceovers: Record<string, { hook: string; cta: string }> = {
    dental:   { hook: "voiceovers/reel_dental_hook_v1.mp3",   cta: "voiceovers/reel_dental_cta_v1.mp3" },
    abogados: { hook: "voiceovers/reel_abogados_hook_v1.mp3", cta: "voiceovers/reel_abogados_cta_v1.mp3" },
    training: { hook: "voiceovers/reel_training_hook_v1.mp3", cta: "voiceovers/reel_training_cta_v1.mp3" },
  };

  // Existing on-disk fallbacks (same industry, different script)
  const fallbackVoiceovers: Record<string, { hook: string; cta: string }> = {
    dental:   { hook: "voiceovers/v1_dental_hook_v4.mp3",  cta: "voiceovers/v1_dental_outro_v3.mp3" },
    abogados: { hook: "voiceovers/v2_legal_hook.mp3",       cta: "voiceovers/v3_legal_outro_final.mp3" },
  };

  const defaultFallback = { hook: "voiceovers/v1_dental_hook_v4.mp3", cta: "voiceovers/v1_dental_outro_v3.mp3" };

  const voiceover = REEL_VO_READY
    ? (reelVoiceovers[industry] ?? defaultFallback)
    : (fallbackVoiceovers[industry] ?? defaultFallback);

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* ─── AUDIO: Background music (looping, low volume) ─── */}
      <Audio src={staticFile("music.mp3")} volume={musicVolume} loop />

      {/* ─── AUDIO: Hook voiceover ─── */}
      <Sequence from={0} durationInFrames={hookDurationInFrames}>
        <Audio src={staticFile(voiceover.hook)} volume={1} />
      </Sequence>

      {/* ─── AUDIO: CTA voiceover ─── */}
      <Sequence from={ctaStartFrame}>
        <Audio src={staticFile(voiceover.cta)} volume={0.85} />
      </Sequence>

      {/* ─── AUDIO: WhatsApp notification pings ─── */}
      {messagePings.map((pingFrame, i) => (
        <Sequence key={i} from={pingFrame} durationInFrames={30}>
          <Audio src={staticFile("notification.mp3")} volume={0.15} />
        </Sequence>
      ))}

      {/* ─── VISUAL SCENES ─── */}
      <TransitionSeries>
        {/* 1. STAT HOOK */}
        <TransitionSeries.Sequence durationInFrames={hookDurationInFrames}>
          <ReelStatHook
            industry={industry}
            statNumber={statNumber}
            statText={statText}
            statSubline={statSubline}
            durationInFrames={hookDurationInFrames}
          />
        </TransitionSeries.Sequence>

        {/* Transition: Hook → WhatsApp — energetic slide from bottom */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 180, stiffness: 200 },
            durationInFrames: SLIDE_DURATION,
          })}
        />

        {/* 2. WHATSAPP CHAT DEMO */}
        <TransitionSeries.Sequence durationInFrames={chatDurationInFrames}>
          <AbsoluteFill>
            <WhatsAppChat
              businessName={businessName}
              botName={botName}
              messages={messages}
              industry={industry}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition: WhatsApp → CTA — smooth fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_DURATION })}
        />

        {/* 3. CTA SLIDE */}
        <TransitionSeries.Sequence durationInFrames={ctaDurationInFrames}>
          <ReelCtaSlide
            industry={industry}
            ctaUrl={ctaUrl}
            ctaHeadline={ctaHeadline}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
