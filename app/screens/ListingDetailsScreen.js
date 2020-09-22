import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import colors from "../config/colors";
import DriverTasksForm from "../components/DriverTasksForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";

function ListingDetailsScreen({ route }) {
  const { user } = useAuth();

  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.destination}</Text>
        <Text style={styles.price}>{listing.weight}kg</Text>
        <View style={styles.userContainer}>
          <ListItem
            title={listing.deliveryAgent}
            subTitle={listing.deliveryAgent}
          />
        </View>
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
  price: {
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
