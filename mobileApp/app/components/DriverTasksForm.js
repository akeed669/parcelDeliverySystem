import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import UploadScreen from "../screens/UploadScreen";
import listingsApi from "../api/listings";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

function DriverTasksForm({ navigation, listing }) {

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    let myOrder={...listing};

    myOrder.status=1;
    myOrder.deliveryAgent=user.email;

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

    Alert.alert("Success", "You have successfully accepted the order!");
    //navigation.navigate(routes.USER_LISTINGS);

    //resetForm();

  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >

    <SubmitButton title="Accept Order" color="secondary" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  //message: Yup.string().required().min(1).label("Message"),
});

export default DriverTasksForm;
