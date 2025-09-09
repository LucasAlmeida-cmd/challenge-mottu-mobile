import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import RegisterScreen from '../screens/RegisterScreenPatio';
import EditPatioScreen from '../screens/EditPatioScreen'

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <>
                <Stack.Screen
                  name="AdminDashboard"
                  component={AdminDashboardScreen}
                  options={{ title: 'Painel Administrativo' }}
                />
                <Stack.Screen
                  name="UserManagement"
                  component={UserManagementScreen}
                  options={{ title: 'Gerenciamento de Pátios' }}
                />

                <Stack.Screen
                  name="RegisterPatio"
                  component={RegisterScreen}
                />
                <Stack.Screen
                  name="EditPatio"
                  component={EditPatioScreen}
                />
              </>
            )}

            {/* Rotas comuns para todos os usuários autenticados */}
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Perfil' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
