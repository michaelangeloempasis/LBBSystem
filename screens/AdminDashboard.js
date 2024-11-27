import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, TextInput, ScrollView, ImageBackground } from 'react-native';
import { supabase } from '../supabaseClient'; // Import the Supabase client
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

export default function AdminDashboard({ navigation }) {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [adminProfile, setAdminProfile] = useState({ name: '', email: '' });
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookYear, setNewBookYear] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [action, setAction] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState('books');

  useEffect(() => {
    fetchBooks();
    fetchStudents();
    fetchTransactions();
    fetchAdminProfile(); // Fetch admin profile on load
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*');
    if (error) {
      Alert.alert('Error fetching books', error.message);
    } else {
      setBooks(data);
    }
  };

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (error) {
      Alert.alert('Error fetching students', error.message);
    } else {
      setStudents(data);
    }
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select('*');
    if (error) {
      Alert.alert('Error fetching transactions', error.message);
    } else {
      setTransactions(data);
    }
  };

  const fetchAdminProfile = async () => {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('*')
        .eq('email', user.email)
        .single(); // Fetch the admin profile based on the logged-in user's email

      if (error) {
        Alert.alert('Error fetching admin profile', error.message);
      } else {
        setAdminProfile(data); // Set the admin profile state
      }
    }
  };

  const addBook = async () => {
    if (!newBookTitle || !newBookAuthor || !newBookYear) {
      Alert.alert('Error', 'Please enter title, author, and year published');
      return;
    }

    const { error } = await supabase.from('books').insert([{ title: newBookTitle, author: newBookAuthor, year_published: newBookYear }]);
    if (error) {
      Alert.alert('Error adding book', error.message);
    } else {
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookYear('');
      fetchBooks();
    }
  };

  const addStudent = async () => {
    if (!newStudentName || !newStudentEmail) {
      Alert.alert('Error', 'Please enter both name and email');
      return;
    }

    const { error } = await supabase.from('students').insert([{ name: newStudentName, email: newStudentEmail }]);
    if (error) {
      Alert.alert('Error adding student', error.message);
    } else {
      setNewStudentName('');
      setNewStudentEmail('');
      fetchStudents();
    }
  };

  const handleBorrowReturn = async (bookId) => {
    const { error } = await supabase.from('transactions').insert([{ book_id: bookId, action }]);
    if (error) {
      Alert.alert('Error processing transaction', error.message);
    } else {
      fetchTransactions();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Logout Error', error.message);
    } else {
      navigation.replace('Login');
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderContent = () => {
    switch (activeFeature) {
      case 'profile':
        return (
          <>
            <Text style={styles.subtitle}>Admin Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={adminProfile.name}
              editable={false} // Make name non-editable
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={adminProfile.email}
              editable={false} // Make email non-editable
            />
          </>
        );
      case 'books':
        return (
          <>
            <Text style={styles.subtitle}>Add New Book</Text>
            <TextInput
              style={styles.input}
              placeholder="Book Title"
              value={newBookTitle}
              onChangeText={setNewBookTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Book Author"
              value={newBookAuthor}
              onChangeText={setNewBookAuthor}
            />
            <TextInput
              style={styles.input}
              placeholder="Year Published"
              value={newBookYear}
              onChangeText={setNewBookYear}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={addBook}>
              <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Books</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Book Title</Text>
                <Text style={styles.tableHeaderText}>Author</Text>
                <Text style={styles.tableHeaderText}>Year Published</Text>
                <Text style={styles.tableHeaderText}>Actions</Text>
              </View>
              <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.title}</Text>
                    <Text style={styles.tableCell}>{item.author}</Text>
                    <Text style={styles.tableCell}>{item.year_published}</Text>
                    <View style={styles.actionCell}>
                      <TouchableOpacity onPress={() => { setSelectedBookId(item.id); setAction('borrow'); handleBorrowReturn(item.id); }}>
                        <Text style={styles.actionText}>Borrow</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setSelectedBookId(item.id); setAction('return'); handleBorrowReturn(item.id); }}>
                        <Text style={styles.actionText}>Return</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </>
        );
      case 'students':
        return (
          <>
            <Text style={styles.subtitle}>Add New Student</Text>
            <TextInput
              style={styles.input}
              placeholder="Student Name"
              value={newStudentName}
              onChangeText={setNewStudentName}
            />
            <TextInput
              style={styles.input}
              placeholder="Student Email"
              value={newStudentEmail}
              onChangeText={setNewStudentEmail}
            />
            <TouchableOpacity style={styles.button} onPress={addStudent}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Students</Text>
            <FlatList
              data={students}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.studentItem}>
                  <Text style={styles.studentText}>{item.name} - {item.email}</Text>
                </View>
              )}
            />
          </>
        );
      case 'transactions':
        return (
          <>
            <Text style={styles.subtitle}>Transactions</Text>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.transactionItem}>
                  <Text style={styles.transactionText}>{item.action} - Book ID: {item.book_id}</Text>
                </View>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'assets/background.jpg' }} // Replace with your image URL
      style={styles.container}
    >
      <TouchableOpacity style={styles.sidebarToggle} onPress={toggleSidebar}>
        <Icon name={sidebarVisible ? 'times' : 'bars'} size={24} color="#1A1512" />
      </TouchableOpacity>

      <View style={[styles.sidebar, sidebarVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
        <Text style={styles.sidebarTitle}>Admin Panel</Text>
        <Text style={styles.adminInfo}>Welcome, {adminProfile.name}</Text>
        <Text style={styles.adminInfo}>{adminProfile.email}</Text>
        <TouchableOpacity onPress={() => { setActiveFeature('profile'); setSidebarVisible(false); }}>
          <Text style={styles.sidebarItem}>Admin Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveFeature('books'); setSidebarVisible(false); }}>
          <Text style={styles.sidebarItem}>Manage Books</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveFeature('students'); setSidebarVisible(false); }}>
          <Text style={styles.sidebarItem}>Manage Students</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveFeature('transactions'); setSidebarVisible(false); }}>
          <Text style={styles.sidebarItem}>View Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.sidebarItem}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.content, sidebarVisible ? styles.contentShifted : null]}>
        <Text style={styles.title}>Admin Dashboard</Text>
        {renderContent()}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarToggle: {
    padding: 10,
    backgroundColor: '#E8976B',
    alignItems: 'center',
  },
  sidebar: {
    width: 200,
    backgroundColor: 'rgba(191, 126, 94, 0.9)', // Semi-transparent background for the sidebar
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: 1,
    borderRightWidth: 2, // Add a right border
    borderColor: '#BF7E5E', // Border color
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  sidebarVisible: {
    display: 'flex',
  },
  sidebarHidden: {
    display: 'none',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1512',
    marginBottom: 20,
  },
  adminInfo: {
    fontSize: 16,
    color: '#1A1512',
    marginBottom: 10,
  },
  sidebarItem: {
    fontSize: 18,
    color: '#1A1512',
    marginVertical: 10,
    padding: 10, // Add padding for better touch area
    borderRadius: 5, // Rounded corners for items
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent background for items
  },
  sidebarItemHover: {
    backgroundColor: '#E8976B', // Change background on hover
  },
  content: {
    flex: 1,
    padding: 20,
    marginLeft: 0,
    transition: 'margin-left 0.3s ease',
  },
  contentShifted: {
    marginLeft: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E8976B',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E8976B',
    marginTop: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1A1512',
    color: '#E8976B',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
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
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#BF7E5E',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#BF7E5E',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#1A1512',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BF7E5E',
  },
  tableCell: {
    flex: 1,
    color: '#E8976B',
    textAlign: 'center',
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionText: {
    color: '#BF7E5E',
  },
  studentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BF7E5E',
  },
  studentText: {
    color: '#E8976B',
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BF7E5E',
  },
  transactionText: {
    color: '#E8976B',
  },
}); 