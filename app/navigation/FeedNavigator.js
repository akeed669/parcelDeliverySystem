import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} options={{title:"Pending Customer Orders"}} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{title:"Order Details"}} />
  </Stack.Navigator>
);

export default FeedNavigator;
