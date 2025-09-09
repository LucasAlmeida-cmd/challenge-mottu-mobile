import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../src/screens/ProfileScreen';
import EditPatioScreen from '../src/screens/EditPatioScreen'; 
import UserManagementScreen from '../src/screens/UserManagementScreen'; 

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="EditPatio" component={EditPatioScreen} />
    </Stack.Navigator>
  );
}