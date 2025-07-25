import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ChatBubble = ({ message }) => {
  const isSelf = message.sender.self;

  return (
    <View style={[styles.row, isSelf ? styles.rowReverse : styles.rowNormal]}>
      {!isSelf && <Image source={{ uri: message.sender.image }} style={styles.avatar} />}
      <View style={[styles.bubble, isSelf ? styles.selfBubble : styles.otherBubble]}>
        <Text style={[styles.text, isSelf ? styles.selfText : styles.otherText]}>
          {message.message.replace(/<br>/g, '\n')}
        </Text>
      </View>
      {isSelf && <Image source={{ uri: message.sender.image }} style={styles.avatar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 6,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  rowNormal: {
    justifyContent: 'flex-start',
  },
  rowReverse: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginHorizontal: 6,
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
  },
  selfBubble: {
    backgroundColor: '#007AFF', // blue
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF', // pure white for receiver
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 15,
  },
  selfText: {
    color: '#FFFFFF', // white text for sender
  },
  otherText: {
    color: '#000000', // black text for receiver
  },
});

export default ChatBubble;
