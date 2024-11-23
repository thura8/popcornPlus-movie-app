import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import SearchScreen from "./screens/SearchScreen";
import SeeAllScreen from "./screens/SeeAllScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AccountProfileScreen from "./screens/AccountProfileScreen";

import { FontProvider } from "./context/FontProvider";
import useAuth from "./hooks/useAuth";

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          backgroundColor: '#0d1321', 
          borderTopWidth: 0, 
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      <Tab.Screen name="Account" options={{headerShown:false}}>
        {(route) => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountProfileDetails" component={AccountProfileScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        )}
  </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user } = useAuth();
  console.log('Current user : ', user);

  if (user) {
    return (
      <FontProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" options={{ headerShown: false }} component={TabNavigator} />
            <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
            <Stack.Screen name="SeeAll" options={{ headerShown: false }} component={SeeAllScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontProvider>
    );
  } else {
    return (
      <FontProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontProvider>
    );
  }
}