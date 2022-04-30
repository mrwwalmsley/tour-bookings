import { initializeApp } from 'firebase/app'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import type { Events } from '~/types'

initializeApp({
  apiKey: 'AIzaSyA8zgCLHrV_rziJIfGgYPfRaeui-5BQzyE',
  authDomain: 'hamilton-temple.firebaseapp.com',
  projectId: 'hamilton-temple',
  appId: '1:1048629926369:web:74dca50f666a840c6a1aa0',
  measurementId: 'G-DLTZY463YP',
})

const firestore = getFirestore()

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

const eventsCol = createCollection<Events>('events')

export const useEvent = async(id: string) => {
  const userRef = doc(eventsCol, id)
  return (await getDoc(userRef)).data()
}
