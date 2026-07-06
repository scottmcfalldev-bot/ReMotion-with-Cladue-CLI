import React from 'react';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_FONT, FPS} from '../constants';

export const countdownTimerSchema = z.object({
  totalSeconds: z.number().int().min(1),
  color: zColor(),
  fontSize: z.number().min(1),
  backgroundColor: z.string(),
});

export type CountdownTimerProps = z.infer<typeof countdownTimerSchema>;

export const countdownTimerDefaultProps: CountdownTimerProps = {
  totalSeconds: 60,
  color: '#ffffff',
  fontSize: 280,
  backgroundColor: 'transparent',
};

export const calculateCountdownTimerMetadata: CalculateMetadataFunction<
  CountdownTimerProps
> = ({props}) => {
  return {
    durationInFrames: Math.max(1, Math.round(props.totalSeconds * FPS)),
  };
};

const formatTime = (seconds: number): string => {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  color,
  fontSize,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // Counts down to exactly 00:00 on the final frame.
  const remaining = Math.max(
    0,
    Math.ceil((durationInFrames - frame - 1) / fps),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize,
          color,
          fontFamily: DEFAULT_FONT,
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatTime(remaining)}
      </div>
    </AbsoluteFill>
  );
};
