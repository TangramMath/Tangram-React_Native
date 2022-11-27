import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { Container } from './styles';

const Balance = (props) => {
    const money = `R$${props.money}`
    return (
  <Animatable.View animation='fadeInDown' delay={600} style={styles.container}>
    <View style={styles.item} >
        <Text style= {{color:"#C8C8C8", marginRight:5, fontSize:16}}>Data</Text>
            <View style={styles.currency} >
                <Text style={{fontSize:16}}> {props.day} </Text>            
            </View>
        </View>
        <View style={styles.item} >
        <Text style= {{color:"#C8C8C8", marginRight:5, fontSize:16}}>Saldo</Text>
            <View style={styles.currency} >
                <Text style={{color:'#2ecc71', fontSize:35}}>{money}</Text>            
            </View>
        </View>
  </Animatable.View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingStart:16,
        paddingEnd:16,
        marginTop:-27,
        marginStart:15,
        marginEnd:15,
        borderRadius:10,
        zIndex:99,
        height:140,
    }, item:{
        flexDirection:'row',
        alignItems:'center',
    }, currency:{

    }
})

export default Balance;