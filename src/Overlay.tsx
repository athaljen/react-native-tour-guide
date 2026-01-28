import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { OverlayProps } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Overlay: React.FC<OverlayProps> = ({
  position,
  shape = 'rectangle',
  color = 'rgba(0, 0, 0, 0.7)',
  opacity = 0.7,
}) => {
  const { x, y, width, height } = position;
  
  // Calculate border radius for circle shape
  const borderRadius = shape === 'circle' 
    ? Math.max(width, height) / 2 
    : 8;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Top overlay */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: color,
            opacity,
            top: 0,
            left: 0,
            right: 0,
            height: y,
          },
        ]}
      />
      
      {/* Middle row with left, highlight, and right sections */}
      <View style={[styles.row, { top: y, height }]}>
        {/* Left overlay */}
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: color,
              opacity,
              width: x,
            },
          ]}
        />
        
        {/* Highlight area (transparent) */}
        <View
          style={[
            styles.highlight,
            {
              width,
              height,
              borderRadius,
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.8)',
            },
          ]}
        />
        
        {/* Right overlay */}
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: color,
              opacity,
              flex: 1,
            },
          ]}
        />
      </View>
      
      {/* Bottom overlay */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: color,
            opacity,
            top: y + height,
            left: 0,
            right: 0,
            bottom: 0,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  overlay: {
    position: 'absolute',
  },
  row: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  highlight: {
    backgroundColor: 'transparent',
  },
});
