import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { COLORS, ROUTES } from '../constants';
import { Home, Wallet, Notifications, Settings } from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={COLORS.primary}
      inactiveColor={COLORS.danger}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        options={{
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="home" color={COLORS.black} size={30} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuStyle}>
                <MaterialCommunityIcons name="menu" color={COLORS.black} size={30} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.NOTIFICATIONS}
        component={Notifications}
        options={{
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="bell" color={COLORS.black} size={30} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuStyle}>
                <MaterialCommunityIcons name="menu" color={COLORS.black} size={30} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={Settings}
        options={{
          tabBarIcon: ({ }) => (
            <MaterialCommunityIcons name="cog" color={COLORS.black} size={30} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuStyle}>
                <MaterialCommunityIcons name="menu" color={COLORS.black} size={30} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
  menuStyle: {
    margin: 10,
  }
});
