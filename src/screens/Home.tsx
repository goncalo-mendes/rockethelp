import { Text, HStack, IconButton, useTheme, VStack, Heading, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/Icon.svg';
import { SignOut } from 'phosphor-react-native';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { dateFormat } from '../utils/fireStoreDateFormat';

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDeatils(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleLogOut() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert('Erro', 'Não foi possivel sair');
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, descriptions, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            descriptions,
            status,
            when: dateFormat(created_at),
          };
        });
        setOrders(data);
        setIsLoading(false);
      });
    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack w="full" justifyContent="space-between" bg="gray.600" pt={12} pb={5} px={6}>
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} onPress={handleLogOut} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">Meus Chamados</Heading>
          <Text color="gray.200">3</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDeatils(item.id)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Nao tem {'\n'}
                  solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
