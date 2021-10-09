import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../HomeScreen';
import InformesScreen from '../Informes/InformesScreen';
import Morador from '../Morador'


const Stack = createStackNavigator();

export default function PsiuStack() {
  return (
    <Stack.Navigator initialRouteName="Cadastro">
      <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'PSIU' }}/>
      <Stack.Screen name="Cadastro" component={Morador} />
      <Stack.Screen name="Informes" component={InformesScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}