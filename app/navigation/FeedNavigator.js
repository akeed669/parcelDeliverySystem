import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import UserListingsScreen from "../screens/UserListingsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" initialRouteName="Listings" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Listings" component={ListingsScreen} options={{title:"Orders"}} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{title:"Order Details"}} />
    <Stack.Screen name="UserListings" component={UserListingsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
