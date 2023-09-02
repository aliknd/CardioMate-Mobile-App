import React from "react";
import { Image, StyleSheet, Linking } from "react-native";
import AppButton from "../components/AppButton";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import useAuth from "../auth/useAuth";

function DownloadScreen(props) {
  const { user } = useAuth();
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/sync.png")} />
      <AppText style={styles.explanation}>
        To synchronize data between the EMA application and FitBit data, please
        click on the provided link. This link will guide you to the server for
        configuring data integration with the FitBit server.
      </AppText>
      <AppButton
        title="FitBit Connection"
        onPress={() =>
          Linking.openURL(
            "https://fitbitcollector.slades.dev?study_id=" + user.userId
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 20,
  },
  explanation: {
    backgroundColor: colors.secondary,
    color: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: "justify",
  },
});

export default DownloadScreen;
