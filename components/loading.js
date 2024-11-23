import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={[styles.absoluteCenter, { height, width }]}>
      <Progress.CircleSnail thickness={12} size={160} color="#f0ebd8" />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteCenter: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#0d1321'
  },
});