import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../HomeScreen';
import Informes from '../Informes';
import Morador from '../Morador'
import Proposta from '../Proposta';
import Consentimento from '../Consentimento';
import Andamento from '../Andamento';
import TabuleiroMedio from '../TabuleiroMedio'


const Stack = createStackNavigator();

export default function PsiuStack() {
  return (
    <Stack.Navigator initialRouteName="Consentimento">
      <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'PSIU', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Consentimento" component={Consentimento} options={{ title: 'Termo de consentimento', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Cadastro" component={Morador} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}} />
      <Stack.Screen name="Proposta" component={Proposta} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Informes" component={Informes} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Andamento" component={Andamento} options={{ title: 'Andamento das obras', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="TabuleiroMedio" component={TabuleiroMedio} options={{ title: 'Tabuleiro Médio', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
    </Stack.Navigator>
  );
}