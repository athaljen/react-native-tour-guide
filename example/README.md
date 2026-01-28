# Example App

This is a simple example application demonstrating the `react-native-tour-guide` library.

## Features Demonstrated

1. **Welcome Step** - A basic tour step with title and text
2. **Dashboard Card** - Rectangle highlight shape
3. **Profile Card** - Circle highlight shape
4. **Quick Actions** - Multiple steps with different tooltip positions

## Running the Example

This example is provided as a reference implementation. To use it in your own React Native project:

1. Install the dependencies:
```bash
npm install react-native-tour-guide
```

2. Copy the `App.tsx` code into your project

3. Run your React Native app:
```bash
npx react-native run-ios
# or
npx react-native run-android
```

## Key Concepts Shown

- **TourGuideProvider**: Wraps the entire app to provide tour context
- **TourGuideStep**: Marks components for the guided tour
- **useTourGuide hook**: Controls tour state and navigation
- **Different shapes**: Both `rectangle` and `circle` highlights
- **Tooltip positioning**: Various positions (top, bottom, etc.)
- **Event callbacks**: onStepChange, onComplete, onSkip
