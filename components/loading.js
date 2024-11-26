import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { useTheme } from "../context/ThemeContext";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  
  const{theme} = useTheme()

  return (
    <View style={[styles.absoluteCenter, { height, width },theme.contentBackground]}>
      <Progress.CircleSnail thickness={12} size={160} color={theme.iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteCenter: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor:'#0d1321'
  },
});