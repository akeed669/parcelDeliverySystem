import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import UserListingsScreen from "../screens/UserListingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />  
    <Stack.Screen name="UserListings" component={UserListingsScreen} options={{title:"My Jobs"}}/>
  </Stack.Navigator>
);

export default AccountNavigator;
