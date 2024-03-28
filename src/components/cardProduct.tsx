import { forwardRef } from "react";
import { Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";


type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
}

type CardProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
}

export const CardProduct = forwardRef<TouchableOpacity, CardProductProps>(({ data, ...rest }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      className="w-full flex-row items-center pb-4"
      {...rest}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

      <View className="flex-1 ml-3 ">
        <View className="flex-row items-center ">
          <Text className="text-slate-100 text-base font-bold flex-1" >
            {data.title}
          </Text>
          {data.quantity && (
            <Text className="text-slate-400 text-sm">
              x {data.quantity}
            </Text>
          )}
        </View>


        <Text className="text-left text-slate-400 text-sm">
          {data.description}
        </Text>
      </View>


    </TouchableOpacity>

  )

})