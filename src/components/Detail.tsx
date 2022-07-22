import { VStack, Heading } from "native-base";

type Props = {
  title
}


export function Detail({ title, ...rest }: Props) {
  return (
    <VStack>
      <Heading color="white" fontSize="sm"> {title} </Heading>
    </VStack>
  );
}

