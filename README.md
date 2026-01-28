# react-native-tour-guide

A simple and customizable tour guide library for React Native applications. Create interactive walkthroughs and onboarding experiences with ease.

## Features

- 🎯 Easy to use with minimal setup
- 📱 Works on iOS and Android
- 🎨 Customizable tooltips and overlays
- ⚡ TypeScript support
- 🔄 Sequential step navigation
- 🎭 Circle and rectangle highlight shapes
- 📍 Auto-positioning tooltips to avoid screen edges

## Installation

```bash
npm install react-native-tour-guide
# or
yarn add react-native-tour-guide
```

## Usage

### Basic Setup

1. Wrap your app with `TourGuideProvider`:

```tsx
import { TourGuideProvider } from 'react-native-tour-guide';

export default function App() {
  return (
    <TourGuideProvider>
      <YourApp />
    </TourGuideProvider>
  );
}
```

2. Mark elements you want to highlight with `TourGuideStep`:

```tsx
import { TourGuideStep, useTourGuide } from 'react-native-tour-guide';
import { View, Button, Text } from 'react-native';

function MyScreen() {
  const { start } = useTourGuide();

  return (
    <View>
      <TourGuideStep
        order={1}
        text="Welcome! Tap here to get started."
        title="Getting Started"
      >
        <Button title="Start" onPress={() => start()} />
      </TourGuideStep>

      <TourGuideStep
        order={2}
        text="This is where you'll find your main features."
        shape="circle"
      >
        <View style={styles.featureButton}>
          <Text>Main Feature</Text>
        </View>
      </TourGuideStep>

      <TourGuideStep
        order={3}
        text="Access your settings here."
        tooltipPosition="top"
      >
        <Button title="Settings" onPress={() => {}} />
      </TourGuideStep>
    </View>
  );
}
```

### Starting the Tour

Use the `useTourGuide` hook to control the tour:

```tsx
import { useTourGuide } from 'react-native-tour-guide';

function MyComponent() {
  const { start, stop, next, prev, currentStep, isActive } = useTourGuide();

  return (
    <View>
      <Button title="Start Tour" onPress={() => start()} />
      <Button title="Stop Tour" onPress={() => stop()} />
    </View>
  );
}
```

## API

### `TourGuideProvider`

Props:
- `children`: React.ReactNode - Your app components
- `onStepChange?: (step: number) => void` - Callback when step changes
- `onComplete?: () => void` - Callback when tour completes
- `onSkip?: () => void` - Callback when user skips the tour
- `animationDuration?: number` - Animation duration in ms (default: 300)
- `overlayColor?: string` - Color of the overlay (default: 'rgba(0, 0, 0, 0.7)')
- `overlayOpacity?: number` - Opacity of the overlay (default: 0.7)

### `TourGuideStep`

Props:
- `order: number` - Step order (required)
- `text?: string` - Description text to show in tooltip
- `title?: string` - Title text to show in tooltip
- `shape?: 'circle' | 'rectangle'` - Shape of the highlight (default: 'rectangle')
- `tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'` - Preferred tooltip position
- `children: React.ReactElement` - The component to highlight (required)

### `useTourGuide` Hook

Returns:
- `currentStep: number | null` - Current active step
- `isActive: boolean` - Whether tour is currently active
- `totalSteps: number` - Total number of registered steps
- `start: (startFromStep?: number) => void` - Start the tour
- `stop: () => void` - Stop/end the tour
- `next: () => void` - Go to next step
- `prev: () => void` - Go to previous step
- `goToStep: (step: number) => void` - Jump to specific step

## Examples

### Custom Event Handlers

```tsx
<TourGuideProvider
  onStepChange={(step) => console.log('Current step:', step)}
  onComplete={() => console.log('Tour completed!')}
  onSkip={() => console.log('Tour skipped')}
>
  <App />
</TourGuideProvider>
```

### Circle Highlight

```tsx
<TourGuideStep
  order={1}
  text="This button uses a circular highlight"
  shape="circle"
>
  <TouchableOpacity style={styles.roundButton}>
    <Icon name="add" />
  </TouchableOpacity>
</TourGuideStep>
```

### Programmatic Control

```tsx
function TourController() {
  const { start, stop, goToStep, currentStep } = useTourGuide();

  return (
    <View>
      <Button title="Start from Step 1" onPress={() => start(1)} />
      <Button title="Start from Step 3" onPress={() => start(3)} />
      <Button title="Go to Step 2" onPress={() => goToStep(2)} />
      <Button title="End Tour" onPress={stop} />
      {currentStep && <Text>Current Step: {currentStep}</Text>}
    </View>
  );
}
```

## TypeScript Support

This library is written in TypeScript and includes type definitions out of the box.

```tsx
import type { TourGuideContextValue, TourGuideStepProps } from 'react-native-tour-guide';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
