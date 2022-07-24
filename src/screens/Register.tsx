import { VStack } from "native-base";
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

export function Register() {
  const [loading, setLoading] = useState(false)
  const [patrimony, setPatrimony] = useState("")
  const [descriptions, setDescription] = useState("")
  const navigation = useNavigation()

  function handlNewOrderRegister() {
    if (!patrimony || !descriptions) {
      Alert.alert("Error", "Por favor inserir patrimonio ou descrição")
    }
    setLoading(true);
    firestore()
      .collection('orders')
      .add({
        patrimony,
        descriptions,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Registado", "Solicitação registada com sucesso")
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        Alert.alert("Erro", "Não foi possivel registar a solicitação")
      })
  }
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nove Solicitação" />
      <Input
        placeholder="Número do patrimonio"
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastar"
        mt={5}
        isLoading={loading}
        onPress={handlNewOrderRegister}
      />
    </VStack>
  )
}
