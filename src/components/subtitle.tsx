import { Text, View } from "react-native";

type SubtitleProps = {
    title: string
}

export function Subtitle({ title }: SubtitleProps) {
    return (
        <View className="flex-row mt-9 mb-4 px-4">
            <Text className="text-white text-2xl font-bold">{title}</Text>
        </View>
    )
}