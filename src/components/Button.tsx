import { Button as NativeBaseButton, IButtonProps, Heading } from "native-base";

type Props = IButtonProps & {
  title
}


export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      size="md"
      fontSize="sd"
      rounded="sm"
      _pressed={{
        bg: "green.500"
      }}
      fontFamily="body"
      color="white"
      {...rest}
    >
      <Heading color="white" fontSize="sm"> {title} </Heading>
    </NativeBaseButton>
  );
}

