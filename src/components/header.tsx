import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";


type HeaderProps = {
  title: string,
  counterProduct?: number
}

export function Header({ title, counterProduct = 0 }: HeaderProps) {
  return (
    <View className="flex-row border-b border-slate-700 items-center pb-5 mx-4">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-xl text-slate-100">{title}</Text>
      </View>

      {
        counterProduct > 0 && (
          <Link href={'/cart'} asChild>
            <TouchableOpacity className="relative">
              <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                <Text className="">{counterProduct}</Text>
              </View>
              <Feather name="shopping-bag" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        )
      }
    </View >

  )
}   