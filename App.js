import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import weathers from "./weather";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREENWIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("...Loading");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    const json = await response.json();
    console.log("weather-Data", json);

    setCity(location[0].city);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {weathers.map((weather, index) => {
          return (
            <View key={index} style={styles.day}>
              <View style={styles.dayInfo}>
                <Text style={styles.temp}>{weather.temp}</Text>
                <Text style={styles.description}>{weather.sky}</Text>
              </View>
              <Ionicons
                style={styles.dayIcon}
                name="partly-sunny"
                size={24}
                color="black"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREENWIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dayInfo: {
    alignItems: "center",
  },
  dayIcon: {
    alignItems: "center",
    fontSize: 100,
    marginLeft: 30,
  },
  temp: {
    fontSize: 160,
  },
  description: {
    fontSize: 60,
  },
});
