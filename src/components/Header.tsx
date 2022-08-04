import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
  titlePaddingRight: string;
};

export function Header({ title, titlePaddingRight, ...rest }: Props) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleBack() {
    navigation.navigate('home');
  }

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center" bg="gray.600" pb={6} pt={12}>
      <IconButton icon={<CaretLeft color={colors.gray[200]} size={24} />} onPress={handleBack} />
      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} pr={titlePaddingRight}>
        {title}
      </Heading>
    </HStack>
  );
}
