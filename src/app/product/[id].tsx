import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { formateCurrency } from "@/utils/Functions/format-currency";
import { PRODUCTS } from "@/utils/data/products";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";



export default function Product() {
  const cartStore = useCartStore();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function handelAddToCart() {
    cartStore.add(product)
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <Image source={product.cover} className="w-full h-52 " resizeMode="cover" />
      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-2xl font-bold leading-6">
          {product.title}
        </Text>
        <Text className="text-lime-400 text-2xl my-2 font-bold">
          {formateCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 text-base leading-6 mb-6">
          {product.description}
        </Text>

        {
          product.ingredients.map((ingredient) => (
            <Text key={ingredient} className="text-slate-400 text-base leading-6">
              {"\u2022"} {ingredient}
            </Text>
          ))
        }
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handelAddToCart}>
          <Button.Icon>
            <Feather name='plus-circle' size={20} color='black' />
          </Button.Icon>
          <Button.Text>
            Adicionar ao pedido
          </Button.Text>
        </Button>

        <LinkButton title="Voltar ao Cardápio" href="/" />

      </View>
    </View>
  );
}