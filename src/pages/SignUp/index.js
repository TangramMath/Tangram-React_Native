import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import request from '../../Services/index'
// import { Container } from './styles';

const SignUp = () => {
    const [cde, setCde] = useState();
    const [psswrd, setPsswrd] = useState();
    const [number, setNumber] = useState();
    const [name, setName] = useState();

    const navigation = useNavigation()
    const [view, setView] = useState(true)
    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.header}>
                <Text style={styles.msg}>{'Cadastre-se'}</Text>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.forms}>
                <View style={styles.logBox}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TextInput placeholderTextColor={'#8c8c8c'} paddingHorizontal={'10%'} placeholder='Digite seu CDE aqui' value={cde} onChangeText={text => { setCde(text) }} keyboardType='numeric' style={styles.input} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput placeholderTextColor={'#8c8c8c'} paddingHorizontal={'10%'} placeholder='Digite seu nome aqui' value={name} onChangeText={text => { setName(text) }} style={styles.input} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput placeholderTextColor={'#8c8c8c'} paddingHorizontal={'10%'} placeholder='Digite seu número aqui' value={number} keyboardType={'numeric'} onChangeText={text => { setNumber(text) }} style={styles.input} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput placeholderTextColor={'#8c8c8c'} paddingHorizontal={'10%'} secureTextEntry={view} placeholder='Digite sua senha aqui' value={psswrd} onChangeText={text => { setPsswrd(text) }} style={styles.inputBot} />
                    </View>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.button} onPress={async () => {
                        request.post('/auth/signup', {
                            cde: Number(cde),
                            number: Number(number),
                            name: name,
                            psswrd: psswrd
                        }, {
                            'Content-type': 'application/json',
                        }).then(({data}) => {
                            if (data.status === 200){
                                AsyncStorage.setItem('access_token', data.content.token)
                                navigation.navigate('Início', { cde: cde, name: name })
                            } else {
                                Alert.alert('CDE já cadastrado!')
                            }
                        }).catch(err => Alert.alert('Opa, algum erro no sistema...'))
                    }}>
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View >
    );
}

export default SignUp;

const styles = StyleSheet.create({
    input: {
        marginTop: 22,
        width: "50%",
        fontSize: 16,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        height: 65,
        width: "100%",
        borderRadius: 40,
        backgroundColor: '#efefef'
    }, buttonBox: {
        marginTop: '5%',
        width: '80%',
        height: '40%',
        marginHorizontal: '8.5%'
    }, container: {
        flex: 1,
        backgroundColor: '#611bb8'
    }, header: {
        marginTop: "14%",
        marginBottom: '5%',
        paddingHorizontal: '5%',

    }, forms: {
        backgroundColor: '#f0f0f0',
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
        height: '21%'
    }, logBox: {
        backgroundColor: '#fff',
        marginTop: '12%',
        borderColor: 'black',
        borderWidth: 0.0,
        borderRadius: 40
    }, inputBot: {
        marginVertical: 22,
        width: "50%",
        fontSize: 16,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        height: 65,
        width: "100%",
        borderRadius: 40,
        backgroundColor: '#efefef'
    },
})