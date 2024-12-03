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
import { ThemeProvider,useTheme } from "./context/ThemeContext";
import FavoriteScreen from "./screens/FavoriteScreen";


function TabNavigator() {

  const {theme} = useTheme()

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
        tabBarActiveTintColor: theme.activeTabColor, 
        tabBarInactiveTintColor: theme.inactiveTabColor, 
        tabBarStyle: {
         backgroundColor: theme.tabBackgroundColor, 
         borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      <Tab.Screen name="Account" options={{headerShown:false}}>
        {(route) => (
          <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="AccountProfileDetails" component={AccountProfileScreen} />
            <Stack.Screen name="Favorites" component={FavoriteScreen} options={{animation:'fade_from_bottom'}} />
            <Stack.Screen name="Profile" component={ProfileScreen}  options={{animation:'slide_from_bottom' }}/>
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
      <ThemeProvider>
        <FontProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{animation:"fade"}}>
              <Stack.Screen name="Main" options={{ headerShown: false }} component={TabNavigator} />
              <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
              <Stack.Screen name="SeeAll" options={{ headerShown: false }} component={SeeAllScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </FontProvider>
      </ThemeProvider>
      
    );
  } else {
    return (
      <ThemeProvider>
        <FontProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
              <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </FontProvider>
      </ThemeProvider>
    );
  }
}