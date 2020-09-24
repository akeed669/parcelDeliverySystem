import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  destination: Yup.string().required().min(1).label("Destination"),
  address: Yup.string().required().label("Address"),
  weight: Yup.number().required().min(1).max(100).label("Parcel weight"),
  description: Yup.string().label("Description"),
  id: Yup.string(),
  owner:Yup.string(),
  state:Yup.number(),
  deliveryAgent:Yup.string(),
});


function ListingEditScreen({ navigation,route }) {
  const { user } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {listing,isNewRequest} = route.params;

  const oldParcel={...listing};

  let buttonLabel = "";

  buttonLabel=isNewRequest===true?"Post":"Update Parcel";

  const handleSubmit = async (listing, { resetForm }) => {

    let result={};

    setProgress(0);
    setUploadVisible(true);

    if(isNewRequest){
      listing.owner=user.email;
      listing.state=0;
      listing.deliveryAgent="Unassigned";

      result = await listingsApi.addListing(
        { ...listing},
        (progress) => setProgress(progress)
      );

    }

    else{
      console.log(listing);
      oldParcel.address=listing.address;
      oldParcel.description=listing.description;
      oldParcel.destination=listing.destination;
      oldParcel.weight=listing.weight;

      result = await listingsApi.updateParcelStatus(
        { ...oldParcel},
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();

    if(!isNewRequest){navigation.navigate(routes.LISTINGS)}
    else{navigation.navigate(routes.LISTING_DETAILS)}

  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          destination: "",
          address: "",
          weight: "",
          description: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >

        <FormField
          maxLength={100}
          name="destination"
          placeholder="Destination"
        />

        <FormField
          maxLength={255}
          name="address"
          placeholder="Address"
        />

        <FormField
          keyboardType="numeric"
          maxLength={3}
          name="weight"
          placeholder="Weight"
          width={120}
        />

        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />

        <SubmitButton title={buttonLabel} />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
