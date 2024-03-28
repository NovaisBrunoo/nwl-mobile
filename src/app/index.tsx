import { CardProduct } from "@/components/cardProduct"
import { CategoryButton } from "@/components/categoryButton"
import { Header } from "@/components/header"
import { useCartStore } from "@/stores/cart-store"
import { CATEGORIES, MENU } from "@/utils/data/products"
import { Link } from "expo-router"
import { useRef, useState } from "react"
import { FlatList, SectionList, Text, View } from "react-native"


export default function App() {
  const cartStore = useCartStore()
  const cartQuantity = cartStore.products.reduce((total, product) => total + product.quantity, 0)
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  function handelselectCategory(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      }
      )
    }
  }


  return (
    <View className="flex-1 pt-8">
      <Header title='Faça seu pedido' counterProduct={cartQuantity} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handelselectCategory(item)}
            isSelected={item === category}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild >
            <CardProduct data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white font-bold text-xl mt-4 mb-3" >{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}