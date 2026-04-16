import { Text, View } from "react-native";

export default function StatCard({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<View className="stat-card items-center justify-center">
			<Text className="stat-value">{value}</Text>
			<Text className="stat-label uppercase tracking-wide">{label}</Text>
		</View>
	);
}
