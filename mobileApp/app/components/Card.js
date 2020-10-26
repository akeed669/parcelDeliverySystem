import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function Card({ destination, weight, agent , deliveryStatus, onPress, }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.parcelDetails} numberOfLines={1}>
            {destination}
          </Text>
          <Text style={styles.parcelDetails} numberOfLines={1}>
            {agent}
          </Text>
          <Text style={styles.parcelDetails} numberOfLines={2}>
            {deliveryStatus}
          </Text>
          <Text style={styles.weight} numberOfLines={2}>
            {weight}
          </Text>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  weight: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  parcelDetails: {
    marginBottom: 7,
  },
});

export default Card;
