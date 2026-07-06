import React from 'react';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_FONT} from '../constants';

export const bigStatRevealSchema = z.object({
  value: z.string(),
  label: z.string(),
  color: zColor(),
  accentColor: zColor(),
  backgroundColor: z.string(),
});

export type BigStatRevealProps = z.infer<typeof bigStatRevealSchema>;

export const bigStatRevealDefaultProps: BigStatRevealProps = {
  value: '4.2M',
  label: 'monthly listeners',
  color: '#ffffff',
  accentColor: '#f59e0b',
  backgroundColor: 'transparent',
};

export const BigStatReveal: React.FC<BigStatRevealProps> = ({
  value,
  label,
  color,
  accentColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pop = spring({frame, fps, config: {damping: 12, mass: 0.8}});

  const labelIn = interpolate(frame, [0.4 * fps, 1.2 * fps], [0, 1], {
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
          fontSize: 340,
          lineHeight: 1,
          color,
          fontFamily: DEFAULT_FONT,
          fontWeight: 800,
          scale: String(pop),
          opacity: interpolate(pop, [0, 0.6], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {value}
      </div>
      {label ? (
        <div
          style={{
            marginTop: 36,
            fontSize: 72,
            color: accentColor,
            fontFamily: DEFAULT_FONT,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: labelIn,
            translate: `0px ${interpolate(labelIn, [0, 1], [30, 0])}px`,
          }}
        >
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
