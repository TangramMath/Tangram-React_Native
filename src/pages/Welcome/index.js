import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../Services';
// import { Container } from './styles';

const Welcome = () => {
    const navigation = useNavigation()
    const [token, setToken] = useState();
    useEffect(() => {
        AsyncStorage.getItem('access_token', async (err, value) => {
            if (!err) {
                if (value !== null) {
                    setToken(await JSON.parse(value));
                } else { setToken(undefined) }
            } else { setToken(undefined) }
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animatable.Image animation='flipInY' source={require('../../../assets/tang_logo_wh.png')} style={{ width: '100%', marginLeft: '5%' }} resizeMode='contain' />
            </View>
            <Animatable.View animation='fadeInUp' delay={600} style={styles.forms}>
                <Text style={styles.title}>
                    Monitore seus tangrans a qualquer momento!
                </Text>
                <Text style={styles.label}>
                    Digite o CDE para continuar
                </Text>
                <TouchableOpacity style={styles.button} onPress={async () => {
                    if (token === undefined) {
                        navigation.navigate('Login')
                    } else {
                        request.get('/auth/login/token', {
                            "Authorization": token
                        }).then(({data}) => {
                            if (data.status === 200) {
                                navigation.navigate('Início', { cde: Number(data.content.user.cde), name: data.content.user.name })
                            } else {
                                navigation.navigate('Login')
                                AsyncStorage.removeItem('access_token')
                            }
                        }).catch(err => {
                            navigation.navigate('Login')
                            AsyncStorage.removeItem('access_token')
                        })
                    }
                }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#611bb8',
    }, content: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }, forms: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    }, title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    }, label: { color: '#a1a1a1' },
    button: {
        position: 'absolute',
        backgroundColor: '#661bb8',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        height: '18%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})