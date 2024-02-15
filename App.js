import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

// Default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // State for the list of items
  const [itemList, setItemList] = useState([]);

  // Set up notification listener on component mount
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      alert("Notification Received: " + notification.request.content.body);
    });
    // Remove listener on unmount
    return () => subscription.remove();
  }, []);

  // Add new item and notify
  const addItemToList = () => {
    const newItem = `Item ${itemList.length + 1}`;
    setItemList([...itemList, newItem]); // Update list with new item

    // Schedule immediate notification
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New Item Added 📬",
        body: newItem,
      },
      trigger: null,
    });
  };

  // UI of the app
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List has {itemList.length} items.</Text>
      <Button title="Add Item" onPress={addItemToList} />
    </View>
  );
}
