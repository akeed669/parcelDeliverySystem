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

  let allOrders=getListingsApi.data;

  let ordersCopy=[...allOrders];


  if(user.userType==="Driver"){

    //filtering only those orders that have been already accepted by the logged in driver
    ordersCopy = ordersCopy.filter((o) => o.deliveryAgent === user.email && o.status===1);

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
          data={ordersCopy}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              destination={"Destination: "+ item.destination}
              weight={"Weight: "+ item.weight + " kg"}
              agent={"Driver: "+ item.deliveryAgent}
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
