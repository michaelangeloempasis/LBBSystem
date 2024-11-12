import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/AdminDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import { supabase } from '../lib/supabase';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check user role when auth state changes
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUserRole(data.role);
        }
      }
    };
    
    checkUserRole();
  }, [user]);

  // In your navigation logic
  return userRole === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
} 