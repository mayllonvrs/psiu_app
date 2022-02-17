import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../HomeScreen';
import Informes from '../Informes';
import Morador from '../Morador'
import Proposta from '../Proposta';
import Consentimento from '../Consentimento';
import Andamento from '../Andamento';
import TabuleiroMedio from '../TabuleiroMedio'
import BemVindo from '../BemVindo';
import Projetos from '../Projetos';
import TipoCadastro from '../TipoCadastro';

const Stack = createStackNavigator();

export default function PsiuStack() {
  return (
    <Stack.Navigator initialRouteName="Consentimento">
      <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'PSIU', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Consentimento" component={Consentimento} options={{ title: 'Termo de consentimento', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Cadastro" component={Morador} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}} />
      <Stack.Screen name="Proposta" component={Proposta} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Informes" component={Informes} options={{headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Andamento" component={Andamento} options={{ title: 'Andamento do Projeto', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="TabuleiroMedio" component={TabuleiroMedio} options={{ title: 'Escolhas da Comunidade', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="BemVindo" component={BemVindo} options={{ title: 'Bem Vindo', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="Projetos" component={Projetos} options={{ title: 'Ambientes', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
      <Stack.Screen name="TipoCadastro" component={TipoCadastro} options={{ title: 'Cadastro', headerStyle: {backgroundColor: '#4B615B',}, headerTintColor: "#FFFFFF"}}/>
    </Stack.Navigator>
  );
}