import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from './components/Header';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ChatScreen />
    </SafeAreaView>
  );
}
