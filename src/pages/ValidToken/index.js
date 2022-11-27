import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import request from '../../Services';
// import { Container } from './styles';

const Change = () => {
    const [cde, setCde] = useState();
    const [psswrd, setPsswrd] = useState();
    const [token, setToken] = useState()
    const navigation = useNavigation()

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
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, marginTop: 20, }}>Nova senha:   </Text>
                    <TextInput placeholder='Digite aqui' value={psswrd} onChangeText={text => { setPsswrd(text) }} style={styles.input} />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, marginTop: 20, }}>Token:   </Text>
                    <TextInput placeholder='Digite aqui' value={token} onChangeText={text => { setToken(text) }} style={styles.input} />
                </View>
                <TouchableOpacity style={styles.button} onPress={async () => {
                    request.patch('/auth/update', {
                        cde: Number(cde)
                    }, {
                        'Content-type': 'application/json',
                        'newPsswrd': psswrd,
                        'token': token
                    })
                        .then(({data}) => {
                            if(data.status === 200){
                                Alert.alert('Senha alterada!\nFaça o login novamente')
                                navigation.navigate('Login')
                            } else {
                                Alert.alert('Token invalidado')
                            }
                        })
                        .catch(err => {
                            Alert.alert('Opa, algum erro aconteceu...')
                        })
                }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Trocar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

export default Change;

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