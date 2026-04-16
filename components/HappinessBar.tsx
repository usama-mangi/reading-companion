import { View, Text } from "react-native";

export default function HappinessBar({ value }: { value: number }) {
  const width = Math.max(0, Math.min(100, value));
  
  // Determine color based on happiness level
  let barColor = "bg-red-500";
  if (value >= 70) {
    barColor = "bg-green-500";
  } else if (value >= 40) {
    barColor = "bg-yellow-500";
  }

  return (
    <View className="w-full">
      <View className="flex-row justify-between mb-1">
        <Text className="text-xs font-semibold text-gray-600">Happiness</Text>
        <Text className="text-xs font-bold text-gray-800">{value}%</Text>
      </View>
      <View className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <View
          style={{ width: `${width}%` }}
          className={`${barColor} h-full rounded-full transition-all duration-500`}
        />
      </View>
    </View>
  );
}
