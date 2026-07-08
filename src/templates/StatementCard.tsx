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

export const statementCardSchema = z.object({
  line1: z.string(),
  line2: z.string(),
  textColor: zColor(),
  accentColor: zColor(),
  backgroundColor: z.string(),
  fontFamily: z.string(),
  fontWeight: z.number().min(400).max(900),
  fontSizePercent: z.number().min(50).max(200),
});

export type StatementCardProps = z.infer<typeof statementCardSchema>;

export const statementCardDefaultProps: StatementCardProps = {
  line1: 'WE ARE LIVING IN A',
  line2: 'VERY WEIRD DYSTOPIAN FUTURE',
  textColor: '#ffffff',
  accentColor: '#f59e0b',
  backgroundColor: 'transparent',
  fontFamily: DEFAULT_FONT,
  fontWeight: 800,
  fontSizePercent: 100,
};

export const StatementCard: React.FC<StatementCardProps> = ({
  line1,
  line2,
  textColor,
  accentColor,
  backgroundColor,
  fontFamily,
  fontWeight,
  fontSizePercent,
}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const scale = fontSizePercent / 100;

  const line1In = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Delay = line1 ? 0.22 * fps : 0;
  const line2Pop = spring({
    frame: frame - line2Delay,
    fps,
    config: {damping: 14, mass: 0.7},
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: width * 0.07,
        paddingRight: width * 0.07,
      }}
    >
      {line1 ? (
        <div
          style={{
            fontFamily,
            fontWeight,
            fontSize: 64 * scale,
            color: textColor,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            opacity: line1In,
            translate: `0px ${interpolate(line1In, [0, 1], [24, 0])}px`,
          }}
        >
          {line1}
        </div>
      ) : null}
      {line2 ? (
        <div
          style={{
            fontFamily,
            fontWeight,
            fontSize: 88 * scale,
            color: accentColor,
            lineHeight: 1.1,
            letterSpacing: '0.01em',
            marginTop: line1 ? 12 : 0,
            scale: String(interpolate(line2Pop, [0, 1], [0.85, 1])),
            opacity: interpolate(line2Pop, [0, 0.6], [0, 1], {
              extrapolateRight: 'clamp',
            }),
            transformOrigin: 'left center',
          }}
        >
          {line2}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
