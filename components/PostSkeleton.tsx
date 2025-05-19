import { View } from "react-native";

export default function PostSkeleton() {
  return (
    <View style={{
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "row",
      gap: 8
    }}>
      <View style={{ backgroundColor: "#333", height: 32, width: 32, borderRadius: "50%" }} />
      <View style={{ flex: 1, display: "flex", gap: 4 }}>
        <View style={{ backgroundColor: "#444", height: 10, borderRadius: 4 }} />
        <View style={{ backgroundColor: "#444", height: 10, borderRadius: 4 }} />
        <View style={{ backgroundColor: "#444", height: 20, borderRadius: 4 }} />
        <View style={{ backgroundColor: "#444", height: 10, borderRadius: 4 }} />
      </View>
    </View>
  );
}
