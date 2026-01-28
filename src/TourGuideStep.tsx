import React, { useRef, useEffect, useCallback } from 'react';
import { View, findNodeHandle } from 'react-native';
import { useTourGuide } from './TourGuideContext';
import { TourGuideStepProps, StepMeasurement } from './types';
import { Overlay } from './Overlay';
import { Tooltip } from './Tooltip';

export const TourGuideStep: React.FC<TourGuideStepProps> = ({
  order,
  text,
  title,
  shape = 'rectangle',
  tooltipPosition,
  children,
}) => {
  const viewRef = useRef<View>(null);
  const { registerStep, unregisterStep, currentStep, isActive, totalSteps, next, prev, stop } = useTourGuide();
  const [measurement, setMeasurement] = React.useState<StepMeasurement | null>(null);

  const measureView = useCallback((): Promise<StepMeasurement> => {
    return new Promise((resolve) => {
      if (viewRef.current) {
        const handle = findNodeHandle(viewRef.current);
        if (handle) {
          viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            const measurement = {
              x: pageX,
              y: pageY,
              width,
              height,
            };
            setMeasurement(measurement);
            resolve(measurement);
          });
        } else {
          resolve({ x: 0, y: 0, width: 0, height: 0 });
        }
      } else {
        resolve({ x: 0, y: 0, width: 0, height: 0 });
      }
    });
  }, []);

  useEffect(() => {
    registerStep(order, measureView);
    return () => {
      unregisterStep(order);
    };
  }, [order, registerStep, unregisterStep, measureView]);

  // Re-measure when this step becomes active
  useEffect(() => {
    if (currentStep === order && isActive) {
      // Small delay to ensure layout is complete
      setTimeout(() => {
        measureView();
      }, 100);
    }
  }, [currentStep, order, isActive, measureView]);

  const isCurrentStep = currentStep === order && isActive;

  return (
    <>
      <View ref={viewRef} collapsable={false}>
        {children}
      </View>
      
      {isCurrentStep && measurement && (
        <>
          <Overlay
            position={measurement}
            shape={shape}
          />
          <Tooltip
            title={title}
            text={text}
            position={measurement}
            tooltipPosition={tooltipPosition}
            onNext={next}
            onPrev={prev}
            onSkip={stop}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </>
      )}
    </>
  );
};
