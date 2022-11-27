import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, Text, ListRenderItemInfo } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import { Container } from './styles';

const Extrato = ({ route }) => {
    const renderItem = ({ item }) => {

        let operations = item.slice(1, (item.length - 1));
        let day = item[0];
        let money = item[item.length - 1];
        return (
            <View style={styles.content}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, }}>
                        {day}
                    </Text>
                </View>
                <View style={styles.operation}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 18, }}>
                            Saldo do dia:{'                                '}
                        </Text>
                        <Text style={{ fontSize: 18, }}>
                            R${money}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ alignSelf: 'baseline', fontSize: 14, color: 'gray' }}>
                            Valores de operações:{'                        '}
                        </Text>
                        <View style={{ flexDirection: 'column' }}>
                            {operations.map(value =>
                                <Text style={value < 0 ? { color: '#e74e3c', fontSize: 14, } :
                                    { color: '#2ecc72', fontSize: 14, }}>
                                    R${value}
                                </Text>
                                ,)}
                        </View>
                    </View>
                </View>
            </View>);

    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Image animation='flipInY' source={require('../../../assets/tang_logo_wh.png')} style={{ width: '20%' }} resizeMode='contain' />
                </View>
                <FlatList style={styles.list} data={route.params.ope} keyExtractor={(item, index) => String(index)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem} />
            </View>
        </>
    );
}

export default Extrato;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dadadf'

    }, header: {
        backgroundColor: '#611bb8',
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: 99

    }, list: {
        flex: 1,
        marginTop: -15
    }, content: {
        paddingTop: 20,
        marginTop: 10,
    }, operation: {
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: '#f0f0f0'
        , borderBottomWidth: 5,
        borderBottomColor: '#d0d0d0',
    }
})