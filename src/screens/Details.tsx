import { useRoute } from '@react-navigation/native'
import { Text, VStack, Heading } from "native-base";
import { Header } from '../components/Header'

type RoutParams = {
  orderId: string
}

export function Details() {
  const route = useRoute();
  const { orderId } = route.params as RoutParams
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solição" />
      <Text> {orderId} </Text>
    </VStack>
  );
}

