import React, { Component } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import api from '../services/api';
import { format } from "date-fns";

class Informes extends Component{
  constructor(props){
    super(props)
    this.state = { 
      informes: [],
      spinner: false
    }
  }
  
  async componentDidMount(){
    this.setState({
      spinner: true
    })
    try{
      const response = await api.get('informes/'+this.props.route.params?.projeto)
      this.setState({
        informes: response.data,
        spinner: false
      })
    }catch(e){
      Alert.alert('Não foi possível carregar os avisos deste projeto.')
      this.props.navigation.goBack()
    }finally{
      this.setState({
        spinner: false
      })
    }
  }

  render(){
    
    return(
      <SafeAreaView style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={'Carregando...'}
            textStyle={styles.spinnerTextStyle}
        />
          <FlatList style={styles.list}
            data={this.state.informes}
            keyExtractor={item => item.id.toString()}
            renderItem={
              ({item}) => 
                <View style={styles.item}>
                      <Text style={styles.itemDate}>
                          {item.created_at.substring(8,10)+"/"+item.created_at.substring(5,7)+"/"+item.created_at.substring(0,4)}
                      </Text>
                      <Text style={styles.title}>
                          {item.txt_informe}
                      </Text>
                  </View>
            }
          />
      </SafeAreaView>
    )
  }


}

export default Informes;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
    elevation: 3
  },
  title: {
    fontSize: 16,
    color: 'black'
  },
  itemDate: {
    textAlign: 'right',
    fontSize: 12,
    color: 'gray'
  },
  list:{
    margin: 15
  }
});
