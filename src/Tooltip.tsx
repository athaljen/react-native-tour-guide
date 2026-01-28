import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TooltipProps } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  text,
  position,
  tooltipPosition,
  onNext,
  onPrev,
  onSkip,
  currentStep,
  totalSteps,
  nextText = 'Next',
  prevText = 'Previous',
  skipText = 'Skip',
}) => {
  // Calculate tooltip position
  const calculateTooltipPosition = () => {
    const { x, y, width, height } = position;
    const tooltipWidth = SCREEN_WIDTH * 0.8;
    const tooltipHeight = 150;
    const padding = 20;

    let top = 0;
    let left = (SCREEN_WIDTH - tooltipWidth) / 2;

    // Determine position based on tooltipPosition or auto-calculate
    const preferredPosition = tooltipPosition || 'bottom';

    switch (preferredPosition) {
      case 'top':
        top = y - tooltipHeight - padding;
        if (top < 0) {
          top = y + height + padding;
        }
        break;
      case 'bottom':
        top = y + height + padding;
        if (top + tooltipHeight > SCREEN_HEIGHT) {
          top = y - tooltipHeight - padding;
        }
        break;
      case 'left':
        top = y + (height - tooltipHeight) / 2;
        left = x - tooltipWidth - padding;
        if (left < 0) {
          left = x + width + padding;
        }
        break;
      case 'right':
        top = y + (height - tooltipHeight) / 2;
        left = x + width + padding;
        if (left + tooltipWidth > SCREEN_WIDTH) {
          left = x - tooltipWidth - padding;
        }
        break;
      default:
        top = y + height + padding;
    }

    // Ensure tooltip stays within screen bounds
    top = Math.max(padding, Math.min(top, SCREEN_HEIGHT - tooltipHeight - padding));
    left = Math.max(padding, Math.min(left, SCREEN_WIDTH - tooltipWidth - padding));

    return { top, left, width: tooltipWidth };
  };

  const tooltipStyle = calculateTooltipPosition();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <View style={[styles.tooltip, tooltipStyle]} pointerEvents="box-none">
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {text && <Text style={styles.text}>{text}</Text>}
        
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>
            Step {currentStep} of {totalSteps}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>{skipText}</Text>
          </TouchableOpacity>

          <View style={styles.navigationButtons}>
            {!isFirstStep && (
              <TouchableOpacity onPress={onPrev} style={styles.button}>
                <Text style={styles.buttonText}>{prevText}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              onPress={onNext} 
              style={[styles.button, styles.nextButton]}
            >
              <Text style={[styles.buttonText, styles.nextButtonText]}>
                {isLastStep ? 'Done' : nextText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  stepIndicator: {
    alignItems: 'center',
    marginBottom: 12,
  },
  stepText: {
    fontSize: 12,
    color: '#999',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  nextButtonText: {
    color: 'white',
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#999',
  },
});
