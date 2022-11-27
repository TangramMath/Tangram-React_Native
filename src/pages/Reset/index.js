import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import request from '../../Services';
// import { Container } from './styles';

const Reset = () => {
    const [cde, setCde] = useState();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.header}>
                <Text style={styles.msg}>{'Bem vindo(a)'}</Text>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.forms}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontSize: 20, marginTop: 20, }}>CDE:      </Text>
                    <TextInput placeholder='Digite aqui' value={cde} onChangeText={text => { setCde(text) }} keyboardType='numeric' style={styles.input} />
                </View>
                <TouchableOpacity style={styles.button} onPress={async () => {
                    request.post('/auth/reset/psswrd', {
                        cde: Number(cde)
                    }, {
                        'Content-type': 'application/json',
                    })
                        .then(({ data }) => {
                            if (data.status === 200) {
                                Alert.alert('Vamos trocar de senha!')
                                navigation.navigate('ValidToken')
                            } else {
                                Alert.alert('CDE invalido')
                            }
                        })
                        .catch(err => {
                            Alert.alert('Opa, aconteceu algum erro...')
                        }
                        )
                }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Enviar token ao seu número</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

export default Reset;

const styles = StyleSheet.create({
    input: {
        marginTop: 22,
        width: "50%",
        fontSize: 16,
        borderBottomWidth: 1
    }
    , container: {
        flex: 1,
        backgroundColor: '#611bb8'
    }, header: {
        marginTop: "14%",
        marginBottom: '5%',
        paddingHorizontal: '5%',

    }, forms: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: '5%',
    }, msg: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    }, button: {
        backgroundColor: '#611bb8',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    }
})