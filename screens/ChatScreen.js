import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dateShown = useRef(new Set());

  const fetchMessages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://qa.corider.in/assignment/chat?page=${page}`);
      const newMsgs = res.data.chats || [];
      if (newMsgs.length) {
        setMessages(prev => [...prev, ...newMsgs]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    dateShown.current = new Set();
  }, [messages]);

  const formatDate = ts => new Date(ts).toDateString();

  const renderSeparator = date => (
    <View style={styles.separator}>
      <Text style={styles.separatorText}>{date}</Text>
    </View>
  );

  const renderItem = ({ item, index }) => {
    const dt = formatDate(item.time);
    const prev = index < messages.length - 1 ? formatDate(messages[index + 1].time) : null;
    const show = dt !== prev && !dateShown.current.has(dt);
    if (show) dateShown.current.add(dt);

    return (
      <>
        {show && renderSeparator(dt)}
        <ChatBubble message={item} />
      </>
    );
  };

  const renderHeaderDate = () => renderSeparator(formatDate(Date.now()));

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <Header messages={messages} />

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          inverted
          onEndReached={fetchMessages}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.chatContainer}
          ListHeaderComponent={renderHeaderDate}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007AFF" /> : null}
        />

        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F4' },
  container: { flex: 1 },
  chatContainer: { padding: 12, paddingBottom: 80 },
  separator: { alignItems: 'center', marginVertical: 10 },
  separatorText: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
});

export default ChatScreen;
