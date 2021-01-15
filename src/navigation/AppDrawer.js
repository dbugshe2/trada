import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import { SIZES, COLORS } from '../utils/theme';
import FarmersNavigator from './FarmersNavigator';
import CommissionsNavigator from './CommissionsNavigator';
import SettingsNavigator from './SettingsNavigator';
import AboutNavigator from './AboutNavigator';
import ImageIcon from '../components/primary/ImageIcon';
import Sidebar from '../components/Sidebar';
import HCSW from '../screens/HowCreditWorks/HCSW';
import Support from '../screens/Support/Support';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { width } = SIZES;
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
      drawerType={width > 900 ? 'permanent' : 'front'}
      drawerStyle={{
        borderTopRightRadius: SIZES.btnRadius,
        borderBottomRightRadius: SIZES.btnRadius,
      }}
      drawerContentOptions={{
        activeTintColor: COLORS.primary,
      }}
      hideStatusBar
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabs}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ focused }) => (
            <ImageIcon name={focused ? 'houseAlt' : 'house'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Farmers"
        options={{
          drawerLabel: 'Farmers activities',
          drawerIcon: () => <ImageIcon name="farmer" />,
        }}
        component={FarmersNavigator}
      />
      <Drawer.Screen
        name="Commission"
        options={{
          drawerLabel: 'Commission activities',
          drawerIcon: () => <ImageIcon name="commision" />,
        }}
        component={CommissionsNavigator}
      />
      <Drawer.Screen
        name="HowTo"
        options={{
          drawerLabel: 'How credit score works',
          drawerIcon: () => <ImageIcon name="hcsw" />,
        }}
        component={HCSW}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: () => <ImageIcon name="settings" />,
        }}
        component={SettingsNavigator}
      />
      <Drawer.Screen
        name="Support"
        options={{
          drawerLabel: 'Support',
          drawerIcon: () => <ImageIcon name="support" />,
        }}
        component={Support}
      />
      <Drawer.Screen
        name="About"
        options={{
          drawerLabel: 'About',
          drawerIcon: () => <ImageIcon name="about" />,
        }}
        component={AboutNavigator}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
