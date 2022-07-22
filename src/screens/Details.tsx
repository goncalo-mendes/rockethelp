import { VStack, Heading } from "native-base";
import { Header } from '../components/Header'

type Props = {
  title
}

export function Details({ title, ...rest }: Props) {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solição" />
    </VStack>
  );
}

