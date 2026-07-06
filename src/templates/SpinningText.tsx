import React from 'react';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_FONT} from '../constants';

export const spinningTextSchema = z.object({
  text: z.string(),
  fontSize: z.number().min(1),
  color: zColor(),
  fontFamily: z.string(),
  fontWeight: z.number(),
  backgroundColor: z.string(),
});

export type SpinningTextProps = z.infer<typeof spinningTextSchema>;

export const spinningTextDefaultProps = {
  text: 'SCOTT MCFALL',
  fontSize: 120,
  color: '#ffffff',
  fontFamily: DEFAULT_FONT,
  fontWeight: 700,
  backgroundColor: 'transparent',
} satisfies SpinningTextProps;

export const SpinningText: React.FC<SpinningTextProps> = ({
  text,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const rotation = interpolate(frame, [0, durationInFrames - 1], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
