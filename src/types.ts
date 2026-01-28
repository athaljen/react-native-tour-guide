export interface TourGuideStep {
  order: number;
  text?: string;
  title?: string;
  shape?: 'circle' | 'rectangle';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourGuideContextValue {
  currentStep: number | null;
  isActive: boolean;
  totalSteps: number;
  currentStepIndex: number;
  overlayColor?: string;
  overlayOpacity?: number;
  start: (startFromStep?: number) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;
  registerStep: (order: number, measure: () => Promise<StepMeasurement>) => void;
  unregisterStep: (order: number) => void;
}

export interface StepMeasurement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TourGuideProviderProps {
  children: React.ReactNode;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  animationDuration?: number;
  overlayColor?: string;
  overlayOpacity?: number;
}

export interface TourGuideStepProps {
  order: number;
  text?: string;
  title?: string;
  shape?: 'circle' | 'rectangle';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
}

export interface TooltipProps {
  title?: string;
  text?: string;
  position: { x: number; y: number; width: number; height: number };
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  currentStep: number;
  totalSteps: number;
  stepIndex: number;
  nextText?: string;
  prevText?: string;
  skipText?: string;
}

export interface OverlayProps {
  position: { x: number; y: number; width: number; height: number };
  shape?: 'circle' | 'rectangle';
  color?: string;
  opacity?: number;
}
