import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";
import DriverTasksForm from "../components/DriverTasksForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

function ListingDetailsScreen({navigation,route }) {
  const { user } = useAuth();

  const listing = route.params.item;
  console.log(listing);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.destination}</Text>
        <Text style={styles.weight}>{listing.weight}kg</Text>
        <Text style={styles.weight}>{listing.description}kg</Text>
        <View style={styles.userContainer}>
          <ListItem
            title={listing.deliveryAgent}
            subTitle={listing.deliveryAgent}
          />
        </View>
        <Button title="Edit Parcel Details" onPress={() => navigation.navigate(routes.LISTING_EDIT, {listing,isNewRequest:false})} />
        {user.userType==="Driver" &&(<DriverTasksForm listing={listing} />)}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  weight: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
