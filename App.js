import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import PsiuStack from './src/PsiuStack'


class App extends Component{

  render(){
    return(
      <NavigationContainer>
        <PsiuStack />
      </NavigationContainer>
    )
  }


}

export default App;