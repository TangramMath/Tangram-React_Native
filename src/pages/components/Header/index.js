import React from "react";
import {View, StyleSheet, Text, StatusBar, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AntDesign} from "@expo/vector-icons";

export default function Header(props){
    return(
        <Animatable.View animation='fadeInDown' delay={500} style={styles.container}>
            <View style={styles.content}>
                <Text style= {{color:'#fff', fontSize:20}}>{props.name}</Text>
                <TouchableOpacity style={{width:60, height: 60, backgroundColor:'#dddddd', justifyContent:'center', alignItems:"center",borderRadius: 30 }} >
                    <AntDesign name="user" size={40} color='#fff' />
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );
}

const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 50: 70;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#611bb8',
        flexDirection: 'row',
        paddingStart:16,
        paddingEnd:16,
        paddingBottom:60,
        paddingTop: barHeight,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',

    }
}
)
