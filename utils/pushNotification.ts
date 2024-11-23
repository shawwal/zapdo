// // import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { Platform } from 'react-native';
// import { supabase } from '@/lib/supabase';

// // Set notification handler for background notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// // Define the type for Expo Push Token
// type ExpoPushToken = string;

// export async function sendPushNotificationSample(expoPushToken: ExpoPushToken): Promise<void> {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   try {
//     const response = await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-Encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });

//     if (!response.ok) {
//       console.error('Failed to send push notification:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error sending push notification:', error);
//   }
// }

// export async function registerForPushNotificationsAsync(): Promise<string | null> {
//   let token: string | null = null;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

// //   if (Device.isDevice) {
// //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
// //     let finalStatus = existingStatus;

// //     if (existingStatus !== 'granted') {
// //       const { status } = await Notifications.requestPermissionsAsync();
// //       finalStatus = status;
// //     }

// //     if (finalStatus !== 'granted') {
// //       console.error('Failed to get push token for push notification!');
// //       return null;
// //     }

// //     try {
// //       const { data: pushToken } = await Notifications.getExpoPushTokenAsync({
// //         projectId: Constants.extra?.eas?.projectId, // Ensure this is available in your `app.json` or `eas.json`
// //       });
// //       token = pushToken;
// //     } catch (error) {
// //       console.error('Error getting push token:', error);
// //     }
// //   } else {
// //     console.error('Must use a physical device for push notifications');
// //   }

//   return token;
// }

// export async function schedulePushNotification(timeToSchedule: number, notificationTitle: string, notificationMessage: string): Promise<void> {
//   try {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: notificationTitle,
//         body: notificationMessage,
//       },
//       // @ts-ignore
//       trigger: { seconds: timeToSchedule },
//     });
//   } catch (error) {
//     console.error('Error scheduling push notification:', error);
//   }
// }

// // Save the push token to the user's profile
// export const savePushToken = async (userId: string): Promise<void> => {
//   try {
//     const pushToken = await registerForPushNotificationsAsync();
//     if (pushToken) {
//       const { error } = await supabase
//         .from('profiles')
//         .update({ expo_push_token: pushToken })
//         .eq('id', userId);

//       if (error) {
//         console.error('Error updating push token:', error);
//       }
//     } else {
//       console.error('Failed to retrieve push token');
//     }
//   } catch (error) {
//     console.error('Error in savePushToken:', error);
//   }
// };
