import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#1A1512',
    },
    headerTintColor: '#E8976B',
    headerTitleStyle: {
      color: '#E8976B',
      textShadowColor: '#E8976B',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 4,
    },
  });

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>What would you like to do today?</Text>
          </View>

          <View style={styles.menuGrid}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>My Profile</Text>
              <Text style={styles.menuItemSubtitle}>View and edit your information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>Schedule</Text>
              <Text style={styles.menuItemSubtitle}>Check your appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>Messages</Text>
              <Text style={styles.menuItemSubtitle}>View your conversations</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>Settings</Text>
              <Text style={styles.menuItemSubtitle}>Manage your preferences</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 21, 18, 0.75)',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 25,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#E8976B',
    textShadowColor: '#E8976B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#BF7E5E',
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  menuItem: {
    backgroundColor: 'rgba(44, 36, 32, 0.7)',
    borderWidth: 1,
    borderColor: '#E8976B',
    borderRadius: 12,
    padding: 20,
    width: '47%',
    minHeight: 120,
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E8976B',
    marginBottom: 8,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#BF7E5E',
  },
}); 