import React from 'react';
import {Composition, Folder} from 'remotion';
import {FPS, LANDSCAPE, VERTICAL} from './constants';
import {
  BigStatReveal,
  bigStatRevealSchema,
} from './templates/BigStatReveal';
import {
  calculateCounterMetadata,
  Counter,
  counterSchema,
} from './templates/Counter';
import {
  calculateCountdownTimerMetadata,
  CountdownTimer,
  countdownTimerSchema,
} from './templates/CountdownTimer';
import {
  LowerThird,
  lowerThirdSchema,
} from './templates/LowerThird';
import {
  ProgressBar,
  progressBarSchema,
} from './templates/ProgressBar';
import {
  SpinningText,
  spinningTextSchema,
} from './templates/SpinningText';
import {
  StatementCard,
  statementCardSchema,
} from './templates/StatementCard';

// Each template is registered twice: a 1920x1080 landscape version under its
// plain id, and a 1080x1920 vertical version under "<id>-Vertical".
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Landscape">
        <Composition
          id="Counter"
          component={Counter}
          schema={counterSchema}
          defaultProps={{
            from: 0,
            to: 100,
            durationInSeconds: 3,
            suffix: '%',
            fontSize: 320,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            easing: 'easeOut',
            backgroundColor: 'transparent',
          }}
          calculateMetadata={calculateCounterMetadata}
          durationInFrames={3 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="CountdownTimer"
          component={CountdownTimer}
          schema={countdownTimerSchema}
          defaultProps={{
            totalSeconds: 60,
            color: '#ffffff',
            fontSize: 280,
            backgroundColor: 'transparent',
          }}
          calculateMetadata={calculateCountdownTimerMetadata}
          durationInFrames={60 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="ProgressBar"
          component={ProgressBar}
          schema={progressBarSchema}
          defaultProps={{
            fromPercent: 0,
            toPercent: 75,
            barColor: '#3b82f6',
            trackColor: '#33ffffff',
            height: 64,
            borderRadius: 32,
            showLabel: true,
            backgroundColor: 'transparent',
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="BigStatReveal"
          component={BigStatReveal}
          schema={bigStatRevealSchema}
          defaultProps={{
            value: '4.2M',
            label: 'monthly listeners',
            color: '#ffffff',
            accentColor: '#f59e0b',
            backgroundColor: 'transparent',
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="LowerThird"
          component={LowerThird}
          schema={lowerThirdSchema}
          defaultProps={{
            name: 'Jane Doe',
            title: 'Podcast Host',
            accentColor: '#3b82f6',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
          }}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="SpinningText"
          component={SpinningText}
          schema={spinningTextSchema}
          defaultProps={{
            text: 'SCOTT MCFALL',
            fontSize: 120,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            backgroundColor: 'transparent',
          }}
          durationInFrames={6 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
        <Composition
          id="StatementCard"
          component={StatementCard}
          schema={statementCardSchema}
          defaultProps={{
            line1: 'WE ARE LIVING IN A',
            line2: 'VERY WEIRD DYSTOPIAN FUTURE',
            textColor: '#ffffff',
            accentColor: '#f59e0b',
            backgroundColor: 'transparent',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSizePercent: 100,
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
        />
      </Folder>
      <Folder name="Vertical">
        <Composition
          id="Counter-Vertical"
          component={Counter}
          schema={counterSchema}
          defaultProps={{
            from: 0,
            to: 100,
            durationInSeconds: 3,
            suffix: '%',
            fontSize: 320,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            easing: 'easeOut',
            backgroundColor: 'transparent',
          }}
          calculateMetadata={calculateCounterMetadata}
          durationInFrames={3 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="CountdownTimer-Vertical"
          component={CountdownTimer}
          schema={countdownTimerSchema}
          defaultProps={{
            totalSeconds: 60,
            color: '#ffffff',
            fontSize: 280,
            backgroundColor: 'transparent',
          }}
          calculateMetadata={calculateCountdownTimerMetadata}
          durationInFrames={60 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="ProgressBar-Vertical"
          component={ProgressBar}
          schema={progressBarSchema}
          defaultProps={{
            fromPercent: 0,
            toPercent: 75,
            barColor: '#3b82f6',
            trackColor: '#33ffffff',
            height: 64,
            borderRadius: 32,
            showLabel: true,
            backgroundColor: 'transparent',
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="BigStatReveal-Vertical"
          component={BigStatReveal}
          schema={bigStatRevealSchema}
          defaultProps={{
            value: '4.2M',
            label: 'monthly listeners',
            color: '#ffffff',
            accentColor: '#f59e0b',
            backgroundColor: 'transparent',
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="LowerThird-Vertical"
          component={LowerThird}
          schema={lowerThirdSchema}
          defaultProps={{
            name: 'Jane Doe',
            title: 'Podcast Host',
            accentColor: '#3b82f6',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
          }}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="SpinningText-Vertical"
          component={SpinningText}
          schema={spinningTextSchema}
          defaultProps={{
            text: 'SCOTT MCFALL',
            fontSize: 120,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            backgroundColor: 'transparent',
          }}
          durationInFrames={6 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
        <Composition
          id="StatementCard-Vertical"
          component={StatementCard}
          schema={statementCardSchema}
          defaultProps={{
            line1: 'WE ARE LIVING IN A',
            line2: 'VERY WEIRD DYSTOPIAN FUTURE',
            textColor: '#ffffff',
            accentColor: '#f59e0b',
            backgroundColor: 'transparent',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSizePercent: 100,
          }}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...VERTICAL}
        />
      </Folder>
    </>
  );
};
