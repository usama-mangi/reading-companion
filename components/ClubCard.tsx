import { IClub } from "@/types";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ClubCard({ item }: { item: IClub }) {
  const handlePress = () => {
    router.push({
      pathname: "/(main)/clubDetails",
      params: { clubId: item.$id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View className="card mb-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="card-title mb-1">{item.clubName}</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">Invite Code: </Text>
              <View className="bg-indigo-100 px-2 py-0.5 rounded ml-1">
                <Text className="text-indigo-600 font-bold text-sm">
                  {item.inviteCode}
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-full items-center justify-center">
            <Text className="text-white text-xl">→</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
