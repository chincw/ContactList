import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import contactList from './contactList';
import addContact from './addContact';

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="contactList" headerMode="none">
        <Stack.Screen name="contactList" component={contactList} />
        <Stack.Screen name="addContact" component={addContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
