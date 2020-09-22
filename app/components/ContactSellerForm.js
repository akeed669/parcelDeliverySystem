import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import UploadScreen from "../screens/UploadScreen";
import listingsApi from "../api/listings";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";

function ContactSellerForm({ listing }) {
  //console.log(listing);
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
      return Alert.alert("Error", "Could not update the listing.");
    }

    resetForm();

    return Alert.alert("Success", "You have successfully accepted the order!");

    // Notifications.presentLocalNotificationAsync({
    //   title: "Awesome!",
    //   body: "Your balls are so big.",
    // });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Hi Seller..."
      />
      <SubmitButton title="Send Message" />
      <SubmitButton title="Accept Order" color="secondary" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  //message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
