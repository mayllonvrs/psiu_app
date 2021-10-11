import React, { Component } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default class Consentimento extends Component{

    constructor(props){
        super(props)
        this.state = { 
          navigation: this.props.navigation
        }
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>
                
                Etiam varius blandit lectus lacinia lobortis. Nunc a mauris consectetur, placerat tellus non, sagittis tellus. Nunc magna mauris, venenatis id egestas in, pretium non ex. Praesent vitae justo ligula. Suspendisse tincidunt dapibus mi at rhoncus. Ut maximus risus eget sapien ultrices consequat. Curabitur nec efficitur mi. Fusce cursus eu magna in elementum. Duis porta, turpis vehicula volutpat lobortis, augue sem faucibus risus, vitae molestie urna enim a mi. Sed molestie, quam ut tristique congue, massa nibh finibus mi, quis dapibus tortor velit ultricies diam. Suspendisse odio erat, varius id tincidunt quis, lobortis non sem.
               
                {"\n"}{"\n"}Fusce quis turpis eu ex pharetra imperdiet vitae ut risus. Morbi vitae lectus erat. Donec non nisi in est suscipit eleifend id ullamcorper nulla. Maecenas lobortis viverra sapien. In in urna quis nisl aliquam egestas. Mauris ullamcorper dolor odio, quis iaculis diam porta a. Vestibulum vitae tincidunt purus. Nulla vulputate dapibus nisi, ac sodales mi tempor ut. Aenean elementum sapien eget ex pellentesque euismod. Ut at leo mi. Donec eget massa et erat malesuada auctor.
                {"\n"}{"\n"}Etiam varius blandit lectus lacinia lobortis. Nunc a mauris consectetur, placerat tellus non, sagittis tellus. Nunc magna mauris, venenatis id egestas in, pretium non ex. Praesent vitae justo ligula. Suspendisse tincidunt dapibus mi at rhoncus. Ut maximus risus eget sapien ultrices consequat. Curabitur nec efficitur mi. Fusce cursus eu magna in elementum. Duis porta, turpis vehicula volutpat lobortis, augue sem faucibus risus, vitae molestie urna enim a mi. Sed molestie, quam ut tristique congue, massa nibh finibus mi, quis dapibus tortor velit ultricies diam. Suspendisse odio erat, varius id tincidunt quis, lobortis non sem.

               
                </Text>
                <Pressable 
                    style={styles.button} 
                    onPress={() => this.state.navigation.navigate('Cadastro')}
                    >
                    <Text style={styles.textButton}>Aceito o termo</Text>
                </Pressable>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 50,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        width: 350,
        marginTop: 10,
        height: 40,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    text: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 30
      },
      container:{
          padding: 20,
      }
  });