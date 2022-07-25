import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type OrderFirestoreDto = {
  patrimony: string;
  descriptions: string;
  status: 'open' | 'closed';
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;

}
