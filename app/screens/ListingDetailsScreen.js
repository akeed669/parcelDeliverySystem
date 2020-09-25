import React, { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import UploadScreen from "../screens/UploadScreen";
import Button from "../components/Button";
import colors from "../config/colors";

import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

function ListingDetailsScreen({navigation, route }) {

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const listing = route.params;

  let submitButtonLabel="";
  let successMessage="";

  if(listing.status===0){
    submitButtonLabel="Accept Order";
  }
  else if(listing.status===1){
    submitButtonLabel="Confirm Delivery";
  }

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    let myOrder={...listing};

    if(myOrder.status===0){
      myOrder.status=1;
      myOrder.deliveryAgent=user.email;
      successMessage="You have successfully accepted the order!"

    }
    else if (myOrder.status===1){
      myOrder.status=2;
      successMessage="You have marked the parcel as delivered!"
    }

    setProgress(0);
    setUploadVisible(true);

    // const originalOrders = this.state.orders;
    // const orders = originalOrders.filter((o) => o.id !== order.id);
    // this.setState({ orders });

    const result = await listingsApi.updateParcelStatus(myOrder,
    (progress) => setProgress(progress)
  );

    if (!result.ok) {
      setUploadVisible(false);
      return Alert.alert("Error", "Could not update the listing.");
    }

    setUploadVisible(true);
    Alert.alert("Success", successMessage);
    navigation.navigate(routes.USER_LISTINGS);

    //resetForm();

  };

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
        {user.userType==="Customer" &&(<Button title="Edit Parcel Details" onPress={() => navigation.navigate(routes.LISTING_EDIT, {listing,isNewRequest:false})} />)}
        {user.userType==="Driver" &&(
          <Form
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
          <SubmitButton title={submitButtonLabel} color="secondary" />

          </Form>
        )}
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

const validationSchema = Yup.object().shape({
  //message: Yup.string().required().min(1).label("Message"),
});

export default ListingDetailsScreen;
