import { Heading, VStack, Icon, useTheme } from 'native-base';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/Icon.svg';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Entar', 'Informe email e senha');
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Erro', 'Email invalido');
        }
        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Erro', 'Password invalida');
        }
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Erro', 'User não existe');
        }
        return Alert.alert('Erro', 'Não foi possivel aceder');
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="Email"
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" w="full" onPress={handleSignIn} isLoading={loading} />
    </VStack>
  );
}
