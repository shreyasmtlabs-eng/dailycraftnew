
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../../screens/home';
import Recommend from '../../../screens/recommended';
import Download from '../../../screens/download';
import Profile from '../../../screens/profile';
import styles from '../../../screens/home/styles';

const Tab = createBottomTabNavigator();

const icons: Record<string, any> = {
  Home: require('../../../assets/images/Homeicon.png'),
  Recommended: require('../../../assets/images/recommendicon.png'),
  Downloads: require('../../../assets/images/DownLoad.png'),
  Profile: require('../../../assets/images/Profileicon.png'),
};

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.navItem}
          >
            <View style={[styles.navIconWrapper, isFocused && styles.activeNavCircle]}>
              <Image
                source={icons[route.name]}
                style={[styles.navIcon, isFocused && styles.navIconFocused]}
                resizeMode="contain"
              />
            </View>

            <Text style={isFocused ? styles.labelFocused : styles.labelUnfocused}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recommended" component={Recommend} />
      <Tab.Screen name="Downloads" component={Download} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
