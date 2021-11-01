import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase.config';
