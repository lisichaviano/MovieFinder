import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/main';
import DetailsScreen from '../screens/details';

const { Navigator, Screen } = createStackNavigator();

const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Main" component={MainScreen}/>
                <Screen name="Details" component={DetailsScreen}/>
            </Navigator>
        </NavigationContainer>
    )
};

export default Navigation;