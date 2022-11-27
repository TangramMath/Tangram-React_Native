import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import request from '../../Services';
import { Ionicons } from '@expo/vector-icons'
// import { Container } from './styles';

const Login = () => {
    const [cde, setCde] = useState();
    const [psswrd, setPsswrd] = useState();
    const [viewPsswrd, setViewPsswrd] = useState(true);
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.header}>
                <View style={{ height: 1 }}>
                    <Animatable.Image animation='flipInY' source={require('../../../assets/tang_logo_wh.png')} style={{ width: '35%', marginTop: '-165%', marginHorizontal: '33%' }} resizeMode='contain' />
                </View>
                <Text style={styles.msg}>{'Bem vindo(a)'}</Text>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.forms}>
                <View style={styles.logBox}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TextInput placeholderTextColor={'#8c8c8c'} paddingHorizontal={'10%'} placeholder='Digite seu CDE aqui' value={cde} onChangeText={text => { setCde(text) }} keyboardType='numeric' style={styles.input} />
                    </View>
                    <TouchableOpacity onPress={() => setViewPsswrd(!viewPsswrd)}>
                        <Text>ver a senha</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput secureTextEntry={viewPsswrd} paddingHorizontal={'10%'} placeholderTextColor={'#8c8c8c'} placeholder='Digite sua senha aqui' value={psswrd} onChangeText={text => { setPsswrd(text) }} style={styles.input} />
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            request.get('/auth/login/notToken', {
                                login:cde,
                                psswrd:psswrd,
                            }).then(({data}) => {
                                if (data.status === 200) {
                                    AsyncStorage.setItem('access_token', JSON.stringify(data.content.token))
                                    navigation.navigate('Início', { cde: Number(data.content.user.cde), name: data.content.user.name });
                                } else {
                                    Alert.alert('Login inválido')
                                }
                            }).catch(err => {
                                Alert.alert('Opa, houve algum erro no sistema...')
                            })
                        }}>
                            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Se cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Token')}>
                            <Text style={{ color: 'blue' }}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
}

export default Login;

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
        marginHorizontal: '8.5%'
    }
    , container: {
        flex: 1,
        backgroundColor: '#611bb8'
    }, header: {
        marginTop: "45%",
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
        height: '21%'
    }, logBox: {
        paddingTop: '5%',
    }
})