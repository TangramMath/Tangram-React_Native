import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../pages/Welcome';
import Reset from '../pages/Reset';
import Home from '../pages/Home';
import Extrato from '../pages/Extrato';
import SignUp from '../pages/SignUp';
import Change from '../pages/ValidToken';
import Login from '../pages/Login';

const Stack = createStackNavigator();

const Routes = () =>{
 return(
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Token" component={Reset} options={{headerShown: false}}/>
        <Stack.Screen name="ValidToken" component={Change} options={{headerShown: false}}/>
        <Stack.Screen name="Início" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Extrato" component={Extrato} options={{headerShown: false}}/>
    </Stack.Navigator>
 );
}

export default Routes;