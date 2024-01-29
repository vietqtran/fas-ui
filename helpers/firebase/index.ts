import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
   apiKey: 'AIzaSyDrxOZqAI1d8t3RvoxBV7JbOgGIODObiaM',
   authDomain: 'swp391-ef989.firebaseapp.com',
   projectId: 'swp391-ef989',
   storageBucket: 'swp391-ef989.appspot.com',
   messagingSenderId: '857985337176',
   appId: '1:857985337176:web:4e3d77e3de90d6fde8472d'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
