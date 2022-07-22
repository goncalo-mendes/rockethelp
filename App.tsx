import React from 'react';
import { THEME } from './src/styles/theme'
import { NativeBaseProvider, Box } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Home } from './src/screens/Home'
import { Register } from './src/screens/Register'
import { Loading } from './src/components/Loading'
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Register /> : <Loading />}
    </NativeBaseProvider>
  );
}
