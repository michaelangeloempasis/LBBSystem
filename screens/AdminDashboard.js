import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';

export default function AdminDashboard({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAppointments: 0,
  });

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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total number of students
      const { count: studentCount, error: studentError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'student');

      if (studentError) throw studentError;

      // Fetch total number of appointments
      const { count: appointmentCount, error: appointmentError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' });

      if (appointmentError) throw appointmentError;

      setStats({
        totalStudents: studentCount,
        totalAppointments: appointmentCount,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E8976B" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>System Overview</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalAppointments}</Text>
              <Text style={styles.statLabel}>Total Appointments</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('ManageStudents')}
            >
              <Text style={styles.menuItemTitle}>Manage Students</Text>
              <Text style={styles.menuItemSubtitle}>View and manage student accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('ManageAppointments')}
            >
              <Text style={styles.menuItemTitle}>Appointments</Text>
              <Text style={styles.menuItemSubtitle}>View and manage appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Reports')}
            >
              <Text style={styles.menuItemTitle}>Reports</Text>
              <Text style={styles.menuItemSubtitle}>View system analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.menuItemTitle}>Settings</Text>
              <Text style={styles.menuItemSubtitle}>System configuration</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1512',
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
    marginBottom: 30,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1512',
    borderRadius: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#E8976B',
  },
  statLabel: {
    fontSize: 16,
    color: '#BF7E5E',
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuItem: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1512',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  menuItemTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#E8976B',
  },
  menuItemSubtitle: {
    fontSize: 16,
    color: '#BF7E5E',
    textAlign: 'center',
  },
}); 