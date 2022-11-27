import React from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Loading = () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#611bb8'}}>
        <Animatable.Image animation='flipInY' source={require('../../../../assets/tang_logo_wh.png')} style={{width:'20%', marginLeft:'5%'}} resizeMode='contain' />
    </View>
  );
}

export default Loading;