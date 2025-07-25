import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatInput() {
  const [showPinMenu, setShowPinMenu] = useState(false);

  return (
    <View style={styles.wrapper}>
      {showPinMenu && (
        <View style={styles.pinMenu}>
          <View style={styles.greenBubble}>
            <Feather name="camera" size={22} color="#fff" style={styles.pinIcon} />
            <Feather name="video" size={22} color="#fff" style={styles.pinIcon} />
            <Feather name="file" size={22} color="#fff" style={styles.pinIcon} />
          </View>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Reply to @Rohit Yadav"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TouchableOpacity style={styles.iconPin} onPress={() => setShowPinMenu(!showPinMenu)}>
          <Feather name="paperclip" size={22} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconSend}>
          <Feather name="send" size={22} color="#7D5DF6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1C1C1E',
  },
  iconPin: { marginLeft: 8 },
  iconSend: { marginLeft: 8 },
  pinMenu: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  greenBubble: {
    flexDirection: 'row',
    backgroundColor: '#128C21',
    padding: 10,
    borderRadius: 30,
    elevation: 4,
  },
  pinIcon: {
    marginHorizontal: 8,
  },
});
