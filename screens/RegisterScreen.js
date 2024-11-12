import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import * as Picker from '@react-native-picker/picker';
import { supabase } from '../lib/supabase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !phone || !role) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Create profile record
      const { error: profileError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email,
          address,
          phone,
          role,
        });

      if (profileError) throw profileError;

      alert('Registration successful! Please check your email for verification.');
      navigation.navigate('Login');
      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const RoleSelector = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Role *</Text>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              backgroundColor: 'rgba(44, 36, 32, 0.7)',
              borderWidth: 1,
              borderColor: '#E8976B',
              padding: 15,
              borderRadius: 8,
              fontSize: 16,
              color: '#E8976B',
              width: '100%',
              height: 50,
              outline: 'none',
            }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </View>
      );
    }

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Role *</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
          dropdownIconColor="#E8976B"
        >
          <Picker.Item label="Student" value="student" color="#E8976B" />
          <Picker.Item label="Admin" value="admin" color="#E8976B" />
        </Picker>
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us today</Text>
          
          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="First Name *"
                placeholderTextColor="#BF7E5E"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Middle Name (Optional)"
                placeholderTextColor="#BF7E5E"
                value={middleName}
                onChangeText={setMiddleName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Last Name *"
                placeholderTextColor="#BF7E5E"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number *"
                placeholderTextColor="#BF7E5E"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Address *"
            placeholderTextColor="#BF7E5E"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Email *"
                placeholderTextColor="#BF7E5E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.column}>
              <RoleSelector />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Password *"
                placeholderTextColor="#BF7E5E"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password *"
                placeholderTextColor="#BF7E5E"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Sign in</Text>
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
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
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
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(44, 36, 32, 0.7)',
    borderWidth: 1,
    borderColor: '#E8976B',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#E8976B',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(232, 151, 107, 0.9)',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
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
  pickerContainer: {
    marginBottom: 15,
    width: '100%',
  },
  pickerLabel: {
    color: '#BF7E5E',
    marginBottom: 5,
    fontSize: 14,
  },
  picker: {
    backgroundColor: 'rgba(44, 36, 32, 0.7)',
    borderWidth: 1,
    borderColor: '#E8976B',
    borderRadius: 8,
    color: '#E8976B',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -7.5,
  },
  column: {
    flex: 1,
    paddingHorizontal: 7.5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
}); 