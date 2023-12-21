"use client";
import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app, process.env.NEXT_PUBLIC_DATABASE_URL);

export const dbPath = {
  tags: process.env.NEXT_PUBLIC_ENV + "/tags",
  organizations: process.env.NEXT_PUBLIC_ENV + "/organizations",
  content: process.env.NEXT_PUBLIC_ENV + "/content",
  pendingContent: process.env.NEXT_PUBLIC_ENV + "/pendingContent",
  validateContent: process.env.NEXT_PUBLIC_ENV + "/validateContent",
  therapist: process.env.NEXT_PUBLIC_ENV + "/therapist",
};

export const storagePath = {
  files: process.env.NEXT_PUBLIC_ENV + "/files",
};

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const storage = getStorage(app);
