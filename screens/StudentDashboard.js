import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function StudentDashboard() {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');

  const renderContent = () => {
    switch(selectedScreen) {
      case 'BookList':
        return <Text style={styles.text}>List of Books Content</Text>;
      case 'BorrowedBooks':
        return <Text style={styles.text}>Borrowed Books Content</Text>;
      case 'StudentProfile':
        return <Text style={styles.text}>Student Profile Content</Text>;
      case 'ActivityLog':
        return <Text style={styles.text}>Activity Log Content</Text>;
      case 'Settings':
        return <Text style={styles.text}>Settings Content</Text>;
      default:
        return <Text style={styles.text}>Welcome to Student Dashboard</Text>;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.mainContainer}
      resizeMode="cover"
    >
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarHeader}>Student Dashboard</Text>
        
        <View style={styles.menuItems}>
          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedScreen === 'BookList' && styles.activeMenuItem
            ]}
            onPress={() => setSelectedScreen('BookList')}
          >
            <Text style={styles.menuItemText}>List of Books</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedScreen === 'BorrowedBooks' && styles.activeMenuItem
            ]}
            onPress={() => setSelectedScreen('BorrowedBooks')}
          >
            <Text style={styles.menuItemText}>View Borrowed Books</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedScreen === 'StudentProfile' && styles.activeMenuItem
            ]}
            onPress={() => setSelectedScreen('StudentProfile')}
          >
            <Text style={styles.menuItemText}>Student's Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedScreen === 'ActivityLog' && styles.activeMenuItem
            ]}
            onPress={() => setSelectedScreen('ActivityLog')}
          >
            <Text style={styles.menuItemText}>Activity Log</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedScreen === 'Settings' && styles.activeMenuItem
            ]}
            onPress={() => setSelectedScreen('Settings')}
          >
            <Text style={styles.menuItemText}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sidebar: {
    width: '20%',
    backgroundColor: 'rgba(42, 37, 32, 0.9)',
    padding: 20,
    paddingTop: 40,
  },
  sidebarHeader: {
    color: '#E8976B',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
  menuItems: {
    gap: 20, // Spacing between menu items
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(232, 151, 107, 0.1)',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(232, 151, 107, 0.3)', // Highlight active menu item
  },
  menuItemText: {
    color: '#E8976B',
    fontSize: 16,
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#E8976B',
    fontSize: 24,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
}); 