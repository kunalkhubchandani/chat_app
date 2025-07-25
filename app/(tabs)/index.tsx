import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatScreen from '../../screens/ChatScreen';

export default function Home() {
  return (
    <View style={styles.container}>
      <ChatScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
