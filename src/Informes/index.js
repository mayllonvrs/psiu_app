import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

class Informes extends Component{
  constructor(props){
    super(props)
    this.state = { 
      informes: []
    }
  }
  
  async componentDidMount(){
    const response = await api.get('informes/'+this.props.route.params?.projeto)
    this.setState({
      informes: response.data
    })
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
          <FlatList style={styles.list}
            data={this.state.informes}
            keyExtractor={item => item.id.toString()}
            renderItem={
              ({item}) => 
                <View style={styles.item}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff'
  },
  list:{
    margin: 15
  }
});
