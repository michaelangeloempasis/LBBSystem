import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // TODO: Implement actual login authentication
    console.log('Logging in with:', { email, password });
    // On successful login, you might want to:
    // navigation.navigate('Home');
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

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
          
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
          />
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
            <Text style={styles.link}>Forgot password?</Text>
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
}); 