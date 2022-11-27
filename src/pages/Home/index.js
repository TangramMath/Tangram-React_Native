import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import Balance from '../components/Balance';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';

export default function Home({route}) {
  const cde = route.params.cde;
  const name = route.params.name;
  const [data, setData] = useState();
  const navigation = useNavigation();

  const day = () => {
    var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return date + '/' + month + '/' + year;
    }
    let dado = [];
    const initDay= day()
  const [initMoney, setInitMoney] = useState();
  useEffect(() => {
    fetch(`https://api-googlesheets-cde.herokuapp.com/${cde}`).then(data => data.json().then(data =>{
      setInitMoney(data[0][3]);
      dado = data;
      dado.shift();
      setData(dado);
    })).catch(console.err);
  }, [])

if (typeof initMoney === 'undefined'){
  return(
    <>
    <Loading/>
    </>
  );
} else {
  return (
    <View style={styles.container}>
      <Header name ={name} />
      <Balance day = {initDay} money = {initMoney} />
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Extrato', {ope:data})}}>
        <AntDesign size={60} name='creditcard' color={'white'}/>
        <Text style={{color:'white', fontSize:16}}>Extrato</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadadf',
  },button:{
    backgroundColor:'#661bb8',
    height:150,
    width:100,
    margin:20,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  }
});
