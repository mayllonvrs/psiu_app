import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../HomeScreen';
import InformesScreen from '../Informes/InformesScreen';


const Stack = createStackNavigator();

export default function PsiuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PSIU" component={HomeScreen} />
      <Stack.Screen name="Informes" component={InformesScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}