import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";


class Informe extends Component{
    render(){
        return(
            <View style={styles.item}>
                <Text style={styles.title}>
                    {this.props.data.txt_informe}
                </Text>
            </View>
        )
    }
}

export default Informe;

const styles = StyleSheet.create({
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
  });