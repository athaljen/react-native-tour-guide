import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  TourGuideProvider,
  TourGuideStep,
  useTourGuide,
} from 'react-native-tour-guide';

const HomeScreen: React.FC = () => {
  const { start, isActive, currentStep } = useTourGuide();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Tour Guide Example</Text>
          <Text style={styles.subtitle}>
            Tap the button below to start the guided tour
          </Text>
        </View>

        <TourGuideStep
          order={1}
          text="Welcome! This is your first tour step. Tap 'Next' to continue."
          title="Welcome to the App"
        >
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => !isActive && start()}
            disabled={isActive}
          >
            <Text style={styles.buttonText}>Start Tour</Text>
          </TouchableOpacity>
        </TourGuideStep>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Features</Text>

          <TourGuideStep
            order={2}
            text="This is the dashboard where you can view all your statistics and insights."
            title="Dashboard"
            shape="rectangle"
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📊 Dashboard</Text>
              <Text style={styles.cardDescription}>
                View your analytics and insights
              </Text>
            </View>
          </TourGuideStep>

          <TourGuideStep
            order={3}
            text="Access your profile and personal settings from here."
            title="Profile"
            shape="circle"
          >
            <View style={styles.circleCard}>
              <Text style={styles.circleEmoji}>👤</Text>
              <Text style={styles.cardTitle}>Profile</Text>
            </View>
          </TourGuideStep>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.row}>
            <TourGuideStep
              order={4}
              text="Create new items with this button."
              title="Create"
              tooltipPosition="bottom"
            >
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionEmoji}>➕</Text>
                <Text style={styles.actionText}>Create</Text>
              </TouchableOpacity>
            </TourGuideStep>

            <TourGuideStep
              order={5}
              text="Search through your content easily."
              title="Search"
              tooltipPosition="bottom"
            >
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionEmoji}>🔍</Text>
                <Text style={styles.actionText}>Search</Text>
              </TouchableOpacity>
            </TourGuideStep>

            <TourGuideStep
              order={6}
              text="Access all app settings and preferences here."
              title="Settings"
              tooltipPosition="top"
            >
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionEmoji}>⚙️</Text>
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
            </TourGuideStep>
          </View>
        </View>

        {isActive && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              Tour Active - Step {currentStep}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <TourGuideProvider
      onStepChange={(step) => console.log('Step changed to:', step)}
      onComplete={() => console.log('Tour completed!')}
      onSkip={() => console.log('Tour skipped')}
    >
      <HomeScreen />
    </TourGuideProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 80,
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  statusBar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default App;
