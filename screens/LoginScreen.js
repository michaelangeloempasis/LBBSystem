import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { supabase } from '../supabaseClient'; // Import the Supabase client

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Check if the user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_credentials')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (adminError) throw adminError;

      if (adminData) {
        // If admin credentials are valid, navigate to Admin Dashboard
        navigation.replace('AdminDashboard');
      } else {
        // Proceed with normal login for other users
        const { user, error } = await supabase.auth.signIn({
          email,
          password,
        });

        if (error) throw error;

        // Fetch user role from the appropriate table
        const { data: userData, error: fetchError } = await supabase
          .from(user.email.includes('@admin.com') ? 'admin_users' : 'student_users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;

        // Navigate to the appropriate dashboard based on user role
        if (userData.role === 'admin') {
          navigation.replace('AdminDashboard');
        } else {
          navigation.replace('StudentDashboard');
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#BF7E5E"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#BF7E5E"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1A1512" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerText}>Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E8976B',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#1A1512',
    color: '#E8976B',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#BF7E5E',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#E8976B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1512',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#BF7E5E',
    fontSize: 14,
    marginTop: 10,
  },
});
