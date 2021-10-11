import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../HomeScreen';
import Informes from '../Informes';
import Morador from '../Morador'
import Proposta from '../Proposta';
import Consentimento from '../Consentimento';


const Stack = createStackNavigator();

export default function PsiuStack() {
  return (
    <Stack.Navigator initialRouteName="Consentimento">
      <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'PSIU' }}/>
      <Stack.Screen name="Consentimento" component={Consentimento} options={{ title: 'Termo de consentimento' }}/>
      <Stack.Screen name="Cadastro" component={Morador} />
      <Stack.Screen name="Proposta" component={Proposta} />
      <Stack.Screen name="Informes" component={Informes} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}