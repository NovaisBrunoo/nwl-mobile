import { Button } from "@/components/button";
import { CardProduct } from "@/components/cardProduct";
import { Header } from "@/components/header";
import Input from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formateCurrency } from "@/utils/Functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const PHONE_NUMBER = "5524998500426"


export default function Cart() {
  const navigation = useNavigation()
  const [addres, setAddres] = useState('')
  const cartStore = useCartStore()

  const total = formateCurrency(cartStore.products.reduceRight((total, product) => total + product.price * product.quantity, 0))

  function handelProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover o produto ${product.title} do carrinho?`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Remover',
          onPress: () => cartStore.remover(product.id)
        }
      ]
    )
  }

  function handelOrder() {
    if (addres.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega")
    }

    const products = cartStore.products.map((product) =>
      `\n ${product.quantity} ${product.title}`
    ).join('')

    const mensagem = `
    Novo pedido \n Entregar em : ${addres} 

    ${products}

    \n Valor Total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${mensagem}`)
    cartStore.clear()
    navigation.goBack()

  }


  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-400 py-4">
                {cartStore.products.map((product) => (
                  <CardProduct key={product.id} data={product} onPress={() => handelProductRemove(product)} />
                ))}
              </View>
            ) : (
              <Text className="text-slate-400 text-center">
                Seu carrinho está vazio
              </Text>
            )
            }

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl">
                Total:
              </Text>
              <Text className="text-lime-400 text-2xl font-bold">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço da entrega como rua , bairro , CEP  , número da casa ..."
              onChangeText={setAddres}
              onSubmitEditing={handelOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          </View>

        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5" >
        <Button onPress={handelOrder}>
          <Button.Text>
            Enviar pedido
          </Button.Text>
          <Button.Icon>
            <Feather name='arrow-right-circle' size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao Cardápio" href="/" />
      </View>
    </View>
  )

}