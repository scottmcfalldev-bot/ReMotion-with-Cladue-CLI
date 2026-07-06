import React from 'react';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_FONT, FPS} from '../constants';

export const counterSchema = z.object({
  from: z.number(),
  to: z.number(),
  durationInSeconds: z.number().min(0.1),
  suffix: z.string(),
  fontSize: z.number().min(1),
  color: zColor(),
  fontFamily: z.string(),
  fontWeight: z.number(),
  easing: z.enum(['linear', 'easeOut']),
  backgroundColor: z.string(),
});

export type CounterProps = z.infer<typeof counterSchema>;

export const counterDefaultProps: CounterProps = {
  from: 0,
  to: 100,
  durationInSeconds: 3,
  suffix: '%',
  fontSize: 320,
  color: '#ffffff',
  fontFamily: DEFAULT_FONT,
  fontWeight: 700,
  easing: 'easeOut',
  backgroundColor: 'transparent',
};

export const calculateCounterMetadata: CalculateMetadataFunction<
  CounterProps
> = ({props}) => {
  return {
    durationInFrames: Math.max(1, Math.round(props.durationInSeconds * FPS)),
  };
};

export const Counter: React.FC<CounterProps> = ({
  from,
  to,
  suffix,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  easing,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const value = interpolate(frame, [0, durationInFrames - 1], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easing === 'easeOut' ? Easing.out(Easing.cubic) : Easing.linear,
  });

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
          fontFamily,
          fontWeight,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {Math.round(value)}
        {suffix}
      </div>
    </AbsoluteFill>
  );
};
