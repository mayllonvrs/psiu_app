import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default class Proposta extends Component{
    render(){
        return(
            <SafeAreaView style={styles.tabuleiro}>
                <Text>Oi</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    tabuleiro: {
        backgroundColor: 'darkseagreen',
        flex: 2
    },
})