import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Linking, Text } from "react-native";
import AppButton from "../components/AppButton";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import useAuth from "../auth/useAuth";

function DownloadScreen(props) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getFitBitUsers = async () => {
    try {
      const response = await fetch(
        "https://fitbitcollector.slades.dev/participants/apiindex?token=17bfba7f3a11578f344d1b00ee79e344"
      );
      const json = await response.json();
      //console.log("///////////");
      //console.log(user.userId);
      //console.log("///////////");
      const isUserIdInArray = json.ids.includes(user.userId.toString());
      setUserData(isUserIdInArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFitBitUsers();
  }, []);

  const { user } = useAuth();

  //console.log(userData);

  return (
    <Screen style={styles.container}>
      {isLoading || userData.length === 0 ? (
        <Image
          style={styles.loading}
          source={require("../assets/animations/loading_gif.gif")}
        />
      ) : userData ? (
        <>
          <Image style={styles.check} source={require("../assets/check.png")} />
          <Image
            style={styles.fitbit}
            source={require("../assets/fitbit_registered.png")}
          />
        </>
      ) : (
        <>
          <Image style={styles.logo} source={require("../assets/sync.png")} />
          <AppText style={styles.explanation}>
            To synchronize data between the EMA application and FitBit data,
            please click on the provided link. This link will guide you to the
            server for configuring data integration with the FitBit server.
          </AppText>
          <AppButton
            title="FitBit Connection"
            onPress={() =>
              Linking.openURL(
                "https://fitbitcollector.slades.dev?study_id=" + user.userId
              )
            }
          />
        </>
      )}
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
  fitbit: {
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 20,
    width: 350,
    height: 350,
  },
  check: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 20,
    width: 85,
    height: 85,
  },
  explanation: {
    backgroundColor: colors.secondary,
    color: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: "justify",
  },
  loading: {
    alignSelf: "center",
  },
});

export default DownloadScreen;
