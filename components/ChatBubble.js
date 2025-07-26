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
    backgroundColor: '#007AFF', 
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 15,
  },
  selfText: {
    color: '#FFFFFF', 
  },
  otherText: {
    color: '#000000', 
  },
});

export default ChatBubble;
