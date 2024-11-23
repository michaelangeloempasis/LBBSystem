import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, Icon } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    try {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (role === 'admin') {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (adminError || !adminData) {
          throw new Error('Access denied. You do not have admin privileges.');
        }

        navigation.navigate('AdminDashboard');
      } else {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (userError || !userData) throw userError;

        if (userData.role !== 'student') {
          throw new Error('Access denied. Please select the correct role.');
        }

        navigation.navigate('StudentDashboard');
      }
      
    } catch (error) {
      console.error('Error:', error);
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
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BF7E5E"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#BF7E5E"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
              dropdownIconColor="#E8976B"
              mode="dropdown"
              itemStyle={{
                backgroundColor: 'rgba(44, 36, 32, 0.7)',
                color: '#E8976B',
                textShadowColor: '#E8976B',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 10,
                shadowColor: '#E8976B',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
              }}
            >
              <Picker.Item label="Student" value="student" color="#E8976B" />
              <Picker.Item label="Admin" value="admin" color="#E8976B" />
            </Picker>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
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
  },
  formContainer: {
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    color: '#E8976B',
    textShadowColor: '#E8976B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    shadowColor: '#E8976B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BF7E5E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(44, 36, 32, 0.7)',
    borderWidth: 1,
    borderColor: '#E8976B',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#E8976B',
  },
  button: {
    backgroundColor: 'rgba(232, 151, 107, 0.9)',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#1A1512',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#BF7E5E',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  pickerContainer: {
    backgroundColor: 'rgba(44, 36, 32, 0.7)',
    borderWidth: 1,
    borderColor: '#E8976B',
    borderRadius: 8,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
      },
    }),
  },
  picker: {
    color: '#E8976B',
    height: Platform.OS === 'ios' ? 150 : 50,
    textShadowColor: '#E8976B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  pickerItem: {
    color: '#E8976B',
    textShadowColor: '#E8976B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    shadowColor: '#E8976B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  showPasswordText: {
    color: '#E8976B',
    marginLeft: 10,
    fontSize: 16,
  },
}); 