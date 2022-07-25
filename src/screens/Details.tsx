import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Text, VStack, Heading, HStack, useTheme, ScrollView } from "native-base";
import { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { OrderProps } from '../components/Order';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDto } from '../DTOs/OrderDTO';
import { dateFormat } from '../utils/fireStoreDateFormat';
import { Loading } from '../components/Loading'
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails';
import { Alert } from 'react-native';

type RoutParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string,
  solution: string,
  closed: string,
}


export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState("")
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const { colors } = useTheme()
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as RoutParams

  function handleOrderClosed() {
    if (!solution) {
      return Alert.alert("Erro", "Por favor inserir solução")
    }
    setIsLoading(true)
    firestore()
      .collection<OrderFirestoreDto>('orders')
      .doc(order.id)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Sucesso", "Solicitação atualizada com sucesso")
        navigation.goBack()
      }).catch((error) => {
        console.error(error)
        Alert.alert("Erro", "Não foi possivel atualizar")
      })
    setIsLoading(false)
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDto>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : null
        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="solição" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }
        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="Descrição"
          description={`${order.description}`}
          icon={Clipboard}
          footer={order.when}
        />
        <CardDetails
          title="Solução"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status == 'open' &&
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          }
        </CardDetails>
      </ScrollView>
      {
        !order.closed &&
        <Button title="Finalizar"
          m={5}
          onPress={handleOrderClosed}
        />
      }
    </VStack>
  );
}

