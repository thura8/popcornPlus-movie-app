import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import SearchScreen from "./screens/SearchScreen";
import SeeAllScreen from "./screens/SeeAllScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AccountProfileScreen from "./screens/AccountProfileScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import GenreScreen from "./screens/GenreScreen";

import { FontProvider } from "./context/FontProvider";
import useAuth from "./hooks/useAuth";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Home,HeartIcon } from "lucide-react-native";

import DrawerHeader from "./components/DrawerHeader";
import TermsAndConditionsScreen from "./screens/TermsAndConditionsScreen";

import { useTranslation } from "react-i18next";
import { ImageProvider } from "./context/ImageProvider";

function DrawerNavigator(){

  const {theme} = useTheme()
  const {t} = useTranslation()

  return(

      <Drawer.Navigator

        drawerContent={(props) => <DrawerHeader {...props}/>}
        screenOptions={{
          drawerStyle: {
            width: 360,
            backgroundColor: theme.drawerBackgroundColor, 
          },
          drawerActiveTintColor: theme.activeItemColor, 
          drawerInactiveTintColor: theme.activeItemColor, 
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "600",

          },
          headerShown: false,
        }}
      >
        <Drawer.Screen 
          name="HomeDrawer" 
          component={TabNavigator} 
          options={{
            title:t('home'),
            drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
          }} 
        />
        <Drawer.Screen 
          name="Favorites" 
          component={FavoriteScreen} 
          options={{
            title:t('Favorites'),
            drawerIcon: ({color,size}) => <HeartIcon color={color} size={size} />
          }} 
        />
        <Drawer.Screen
          name="Genres"
          component={GenreScreen}
          options={{
            title:t('genres'),
            drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          }}
        />
      </Drawer.Navigator>
    
  )
}
function SettingStackNavigator(){
  const {theme} = useTheme()
  return(
    <Stack.Navigator>
      <Stack.Screen name="AccountProfile" component={AccountProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} 
        options={{
           headerShown:false 
        }} 
      />
    </Stack.Navigator>
  )
}


export function TabNavigator() {
  const { theme } = useTheme();
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline';
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
      <Tab.Screen 
        name="HomeTab" 
        options={{title:t('home'), headerShown: false }} 
        component={HomeScreen} 
      />

      <Tab.Screen 
        name="Search" 
        options={{title:t('search'), headerShown: false }} 
        component={SearchScreen}
      />

      <Tab.Screen 
        name="Setting"
        options={{title:t('settings'), headerShown: false  }} 
        component={SettingStackNavigator} 
      />

    </Tab.Navigator>
  );
}


export default function Navigation() {
  const { user } = useAuth(); 
  console.log('Current user : ', user);

  if (user) {
    return (
      <ImageProvider>
        <ThemeProvider>
          <FontProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main" screenOptions={{ animation: "fade" }}>
                <Stack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigator} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
                <Stack.Screen name="SeeAll" component={SeeAllScreen} options={{ animation: 'fade' , headerShown:false}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_right',headerShown:false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </FontProvider>
        </ThemeProvider>
      </ImageProvider>
    );   
  } else {
    return (
      <ImageProvider>
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
      </ImageProvider>
    );
  }
}
