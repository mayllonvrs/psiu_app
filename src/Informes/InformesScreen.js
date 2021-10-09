import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Informe from '.';
import api from '../services/api';

class InformesScreen extends Component{
  constructor(props){
    super(props)
    this.state = { 
      informes: []
    }
  }
  
  async componentDidMount(){
    const response = await api.get('informes/6')
    this.setState({
      informes: response.data
    })
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
          <FlatList style={styles.item}
            data={this.state.informes}
            keyExtractor={item => item.id.toString()}
            renderItem={ ({item}) => <Informe data={item} /> }
          />
      </SafeAreaView>
    )
  }


}

export default InformesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item:{
    margin: 15
  }
});
