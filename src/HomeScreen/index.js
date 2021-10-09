import * as React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Informes')}
        >
          <Text style={styles.text}>Cadastrar minha proposta</Text>
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Informes')}
        >
          <Text style={styles.text}>Consultar tabuleiro médio</Text>
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Informes')}
        >
          <Text style={styles.text}>Consultar andamento das obras</Text>
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Informes')}
        >
          <Text style={styles.text}>Informes</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      width: 350,
      marginTop: 10,
      height: 80,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });