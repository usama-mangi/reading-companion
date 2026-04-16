import { IUserBook } from "@/types";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "./ProgressBar";

export default function BookCard({ item }: { item: IUserBook }) {
  function handlePress() {
    router.push(`/(main)/bookDetails?bookId=${item.$id}`);
  }

  const progress = Math.round((item.currentPage / item.totalPages) * 100);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View className="card mb-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="card-title mb-1">{item.title}</Text>
            <Text className="text-sm text-gray-500">
              Page {item.currentPage} of {item.totalPages}
            </Text>
          </View>
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-blue-600 font-bold text-sm">{progress}%</Text>
          </View>
        </View>
        <ProgressBar current={item.currentPage} total={item.totalPages} />
        <Text className="text-blue-500 capitalize mt-3 font-semibold text-sm">
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
