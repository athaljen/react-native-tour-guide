# Contributing to react-native-tour-guide

Thank you for your interest in contributing to react-native-tour-guide! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/react-native-tour-guide.git`
3. Install dependencies: `npm install --legacy-peer-deps`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

### Project Structure

```
react-native-tour-guide/
├── src/                      # Source code
│   ├── TourGuideContext.tsx  # Context provider and hook
│   ├── TourGuideStep.tsx     # Step wrapper component
│   ├── Overlay.tsx           # Overlay component
│   ├── Tooltip.tsx           # Tooltip component
│   ├── types.ts              # TypeScript type definitions
│   └── index.ts              # Main export file
├── example/                  # Example application
├── dist/                     # Built files (generated)
└── README.md                 # Documentation
```

### Building

To build the TypeScript source:

```bash
npm run build
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Making Changes

1. Make your changes in the `src` directory
2. Ensure your code follows the existing style
3. Run `npm run lint` to check for linting errors
4. Run `npm run build` to ensure TypeScript compiles
5. Test your changes in a React Native project
6. Update documentation if necessary

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md following the existing format
3. Ensure all linting and build steps pass
4. Submit a pull request with a clear description of the changes

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add comments for complex logic
- Use meaningful variable and function names
- Keep functions focused and modular

## Reporting Issues

When reporting issues, please include:

- React Native version
- Device/Emulator information
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Code examples if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
