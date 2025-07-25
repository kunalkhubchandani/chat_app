import { Entypo, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ messages }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const usersMap = new Map();
  messages.forEach(msg => {
    const id = msg.sender.user_id;
    if (!usersMap.has(id)) {
      usersMap.set(id, {
        id,
        name: msg.sender.name || '',
        image: msg.sender.image,
      });
    }
  });
  const users = Array.from(usersMap.values()).slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Trip 1</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Feather name="edit-3" size={22} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginTop: 6 }}>
            <Entypo name="dots-three-vertical" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.option}>
              <Feather name="users" size={18} color="#222" />
              <Text style={styles.optionText}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Feather name="phone" size={18} color="#222" />
              <Text style={styles.optionText}>Share Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Feather name="flag" size={18} color="#222" />
              <Text style={styles.optionText}>Report</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.bottomRow}>
        <View style={styles.collageWrapper}>
          {users.map((u, i) => (
            <Image
              key={i}
              source={{ uri: u.image }}
              style={[
                styles.collageImage,
                {
                  transform: [
                    { translateX: (i % 2 === 0 ? 0 : COLLAGE_SIZE / 2) },
                    { translateY: (i < 2 ? 0 : COLLAGE_SIZE / 2) },
                  ],
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>IGI Airport, T3</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>Sector 28</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const COLLAGE_SIZE = 64;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FAF9F4', // ✅ updated
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
  icons: { flexDirection: 'column', alignItems: 'flex-end' },
  bottomRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  collageWrapper: {
    width: COLLAGE_SIZE,
    height: COLLAGE_SIZE,
    borderRadius: COLLAGE_SIZE / 2,
    overflow: 'hidden',
    marginRight: 12,
  },
  collageImage: {
    position: 'absolute',
    width: COLLAGE_SIZE / 2,
    height: COLLAGE_SIZE / 2,
    resizeMode: 'cover',
  },
  routeContainer: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  label: { fontSize: 12, color: '#555', marginRight: 6 },
  value: { fontSize: 14, fontWeight: 'bold', color: '#1C1C1E' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start', alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 6, marginTop: 60, marginRight: 16,
    elevation: 5, paddingVertical: 8,
  },
  option: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  optionText: { marginLeft: 8, fontSize: 14, color: '#1C1C1E' },
});

export default Header;
