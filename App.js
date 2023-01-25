import { View, Text } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View
        style={{
          flex: 3,
          backgroundColor: "teal",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Hello RN Layout!</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}
