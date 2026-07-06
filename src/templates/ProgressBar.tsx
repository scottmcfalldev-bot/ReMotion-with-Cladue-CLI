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

export const progressBarSchema = z.object({
  fromPercent: z.number().min(0).max(100),
  toPercent: z.number().min(0).max(100),
  barColor: zColor(),
  trackColor: zColor(),
  height: z.number().min(1),
  borderRadius: z.number().min(0),
  showLabel: z.boolean(),
  backgroundColor: z.string(),
});

export type ProgressBarProps = z.infer<typeof progressBarSchema>;

export const progressBarDefaultProps: ProgressBarProps = {
  fromPercent: 0,
  toPercent: 75,
  barColor: '#3b82f6',
  trackColor: '#33ffffff',
  height: 64,
  borderRadius: 32,
  showLabel: true,
  backgroundColor: 'transparent',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  fromPercent,
  toPercent,
  barColor,
  trackColor,
  height,
  borderRadius,
  showLabel,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Fill animates over the first 3 seconds, then holds.
  const percent = interpolate(frame, [0, 3 * fps], [fromPercent, toPercent], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{width: '75%'}}>
        {showLabel ? (
          <div
            style={{
              fontSize: height,
              color: barColor,
              fontFamily: DEFAULT_FONT,
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              marginBottom: height / 2,
              textAlign: 'right',
            }}
          >
            {Math.round(percent)}%
          </div>
        ) : null}
        <div
          style={{
            height,
            borderRadius,
            backgroundColor: trackColor,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: '100%',
              borderRadius,
              backgroundColor: barColor,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
