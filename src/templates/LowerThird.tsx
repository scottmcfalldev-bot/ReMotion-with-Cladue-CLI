import React from 'react';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_FONT} from '../constants';

export const lowerThirdSchema = z.object({
  name: z.string(),
  title: z.string(),
  accentColor: zColor(),
  textColor: zColor(),
  backgroundColor: z.string(),
});

export type LowerThirdProps = z.infer<typeof lowerThirdSchema>;

export const lowerThirdDefaultProps: LowerThirdProps = {
  name: 'Jane Doe',
  title: 'Podcast Host',
  accentColor: '#3b82f6',
  textColor: '#ffffff',
  backgroundColor: 'transparent',
};

export const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  title,
  accentColor,
  textColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames, width} = useVideoConfig();

  // Slide in over 0.7s, hold, slide out over the last 0.5s.
  const slideIn = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const slideOut = interpolate(
    frame,
    [durationInFrames - 0.5 * fps, durationInFrames - 1],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    },
  );
  const progress = slideIn - slideOut;
  const offscreen = -width * 0.6;

  return (
    <AbsoluteFill style={{backgroundColor}}>
      <div
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '12%',
          display: 'flex',
          alignItems: 'stretch',
          gap: 28,
          translate: `${interpolate(progress, [0, 1], [offscreen, 0])}px 0px`,
          opacity: interpolate(progress, [0, 0.4], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div style={{width: 14, backgroundColor: accentColor}} />
        <div style={{fontFamily: DEFAULT_FONT}}>
          <div style={{fontSize: 72, fontWeight: 700, color: textColor}}>
            {name}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              color: accentColor,
              marginTop: 8,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
