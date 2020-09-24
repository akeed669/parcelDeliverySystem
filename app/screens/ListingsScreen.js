import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

function ListingsScreen({ navigation }) {
  const { user } = useAuth();
  const getListingsApi = useApi(listingsApi.getListings);
  //console.log(getListingsApi.data)
  let allOrders=getListingsApi.data;


  let ordersCopy=[...allOrders];

  //if the user is a customer, he is only allowed to see his own orders
  if(user.userType==="Customer"){
    allOrders = allOrders.filter((o) => o.owner === user.email);
  }


  if(user.userType==="Driver"){

    //filtering only the orders which are not yet assigned to any driver
    allOrders = allOrders.filter((o) => o.deliveryAgent === "Unassigned");

   }

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={allOrders}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              destination={"Destination: "+ item.destination}
              weight={"Weight: "+ item.weight + " kg"}
              agent={"Driver: "+ item.deliveryAgent}
              deliveryStatus={"Delivery Status: "+ item.status}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
