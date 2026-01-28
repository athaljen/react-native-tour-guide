import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { TourGuideContextValue, TourGuideProviderProps, StepMeasurement } from './types';

const TourGuideContext = createContext<TourGuideContextValue | undefined>(undefined);

export const TourGuideProvider: React.FC<TourGuideProviderProps> = ({
  children,
  onStepChange,
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const stepsRef = useRef<Map<number, () => Promise<StepMeasurement>>>(new Map());

  const registerStep = useCallback((order: number, measure: () => Promise<StepMeasurement>) => {
    stepsRef.current.set(order, measure);
  }, []);

  const unregisterStep = useCallback((order: number) => {
    stepsRef.current.delete(order);
  }, []);

  const start = useCallback((startFromStep = 1) => {
    const sortedSteps = Array.from(stepsRef.current.keys()).sort((a, b) => a - b);
    if (sortedSteps.length > 0) {
      const firstStep = startFromStep || sortedSteps[0];
      setCurrentStep(firstStep);
      setIsActive(true);
      onStepChange?.(firstStep);
    }
  }, [onStepChange]);

  const stop = useCallback(() => {
    setIsActive(false);
    setCurrentStep(null);
    onSkip?.();
  }, [onSkip]);

  const next = useCallback(() => {
    const sortedSteps = Array.from(stepsRef.current.keys()).sort((a, b) => a - b);
    const currentIndex = sortedSteps.indexOf(currentStep as number);
    
    if (currentIndex < sortedSteps.length - 1) {
      const nextStep = sortedSteps[currentIndex + 1];
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      setIsActive(false);
      setCurrentStep(null);
      onComplete?.();
    }
  }, [currentStep, onStepChange, onComplete]);

  const prev = useCallback(() => {
    const sortedSteps = Array.from(stepsRef.current.keys()).sort((a, b) => a - b);
    const currentIndex = sortedSteps.indexOf(currentStep as number);
    
    if (currentIndex > 0) {
      const prevStep = sortedSteps[currentIndex - 1];
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  }, [currentStep, onStepChange]);

  const goToStep = useCallback((step: number) => {
    if (stepsRef.current.has(step)) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  }, [onStepChange]);

  const value: TourGuideContextValue = {
    currentStep,
    isActive,
    totalSteps: stepsRef.current.size,
    start,
    stop,
    next,
    prev,
    goToStep,
    registerStep,
    unregisterStep,
  };

  return (
    <TourGuideContext.Provider value={value}>
      {children}
    </TourGuideContext.Provider>
  );
};

export const useTourGuide = (): TourGuideContextValue => {
  const context = useContext(TourGuideContext);
  if (!context) {
    throw new Error('useTourGuide must be used within a TourGuideProvider');
  }
  return context;
};
