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
import { Home,HeartIcon, Settings } from "lucide-react-native";

import DrawerHeader from "./components/DrawerHeader";

function DrawerNavigator(){

  const {theme} = useTheme()

  return(

      <Drawer.Navigator

        drawerContent={(props) => <DrawerHeader {...props}/>}
        screenOptions={{
          drawerStyle: {
            width: 360,
            backgroundColor: theme.drawerBackgroundColor, 
          },
          drawerActiveTintColor: theme.activeItemColor, 
          drawerInactiveTintColor: theme.inactiveItemColor, 
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
            title:"Home",
            drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
          }} 
        />
        <Drawer.Screen 
          name="Favorites" 
          component={FavoriteScreen} 
          options={{
            drawerIcon: ({color,size}) => <HeartIcon color={color} size={size} />
          }} 
        />
        <Drawer.Screen
          name="Genres"
          component={GenreScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          }}
        />
        <Drawer.Screen 
          name="Setting" 
          component={AccountProfileScreen}
          options={{
            drawerIcon : ({color,size})=> <Settings color={color} size={size} />
          }} 
        />
      </Drawer.Navigator>
    
  )
}


export function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
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
        options={{title:'Home', headerShown: false }} 
        component={HomeScreen} 
      />

      <Tab.Screen 
        name="Search" 
        options={{ headerShown: false }} 
        component={SearchScreen}
      />

      <Tab.Screen 
        name="Favorites" 
        options={{ headerShown: false  }} 
        component={FavoriteScreen} 
      />

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
            <Stack.Navigator initialRouteName="Main" screenOptions={{ animation: "fade" }}>
              <Stack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigator} />
              <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
              <Stack.Screen name="SeeAll" component={SeeAllScreen} options={{ animation: 'fade' , headerShown:false}} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_right',headerShown:false }} />
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
