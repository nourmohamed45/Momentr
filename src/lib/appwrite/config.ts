import {Client, Account, Databases, Storage, Avatars} from "appwrite";

// Default values to prevent errors when environment variables are not set
const defaultAppwriteUrl = "https://cloud.appwrite.io/v1";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL || defaultAppwriteUrl,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "momentr",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "momentr-db",
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || "momentr-storage",
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || "users",
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID || "posts",
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID || "saves",
}

export const client = new Client();

// Only set project and endpoint if projectId and url are defined
if (appwriteConfig.projectId) {
  client.setProject(appwriteConfig.projectId);
}
if (appwriteConfig.url) {
  client.setEndpoint(appwriteConfig.url);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);