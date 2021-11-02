import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';
import { Dimensions } from "react-native";
import { useTheme } from '@react-navigation/native';
import ActivityRings from "react-native-activity-rings";  



const screenWidth = Dimensions.get("window").width;


const colors = [
    '#d73056', 
    '#f05443', 
    '#fe7c2b',  
    '#13175c', 
    '#b21563', 
    '#ffa600',
    '#531668', 
    '#86106a', 
]
  const activityConfig = {
    width: screenWidth,
    height: screenWidth,
    radius: screenWidth * 0.1,
    ringSize: screenWidth * 0.07,
  }
  

class Andamento extends Component{
  constructor(props){
    super(props)
    this.state = { 
      etapas: []
    }
  }
  
  async componentDidMount(){
    const response = await api.get('etapas/'+this.props.route.params?.projeto)
    this.setState({
      etapas: response.data
    })
  }

  render(){
    
    this.state.etapas.sort(function (a, b) {return b.andamento - a.andamento})
    var colorsPop = colors.map((x) => x)
    const etapas = this.state.etapas.map(etapa => {
        return {
            id: etapa.id,
            label: etapa.titulo,
            value: etapa.andamento/100,
            color: colorsPop.pop(),
        }
    })

    return(
      <SafeAreaView style={styles.container}>
          <View>
            <ActivityRings style={styles.chart} theme={"light"} data={etapas} config={activityConfig} />
            <FlatList style={styles.list}
            data={etapas}
            keyExtractor={item => item.id.toString()}
            renderItem={
              ({item}) => 
                <View style={{ 
                    backgroundColor: item.color,
                    padding: 15,
                    marginVertical: 3,
                    marginHorizontal: 10,
                    flexDirection: 'row'
                }}>
                      <Text style={styles.title}>
                            {item.label}
                      </Text>
                      <Text style={styles.percent}>
                            {Math.round(item.value*100)} %
                      </Text>
                  </View>
            }
          />
          </View>
      </SafeAreaView>
    )
  }


}

export default Andamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chart: {
      flexDirection: 'column'
  },
  item: {
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: 18,
    color: '#fff',
    flex: 5
  },
  percent: {
    fontSize: 18,
    color: '#fff',
    flex:1
  },
  list:{
    margin: 15
  }
});
