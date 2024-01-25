import axios from "axios";
import api from "@/api/classes/collection";
// import { useLoginStore } from "../login";
// described user fields
const defaultCollectionNames = ["Music", "Books", "Games", "Movies"];

const defaultCollection = { main: [] };
export default {
  // request create user and saving userId and sesssionToken for commit SET_NEW_USER
  async createCollection(name, userId, newCollection = defaultCollection) {
    const resp = await axios.post(api.collection, {
      name,
      userId,
      collection: newCollection,
    });
    return resp;
  },
  createDefaultCollections(userId) {
    const requestCollection = defaultCollectionNames.map((name) =>
      this.createCollection(name, userId, defaultCollection)
    );
    Promise.all(requestCollection);
  },
  async getAllCollections(userId) {
    try {
      const resp = await axios.get(api.collection, {
        params: {
          where: { userId },
        },
      });
      this.SET_ALL_COLLECTIONS(resp);
    } catch (error) {
      console.error(error);
    }
  },
  async saveChangesToCollection(collectionId) {
    try {
      const resp = await axios.put(api.collectionElement(collectionId), {
        collection: this.activeCollection.collection,
      });
      return resp;
    } catch (error) {
      console.error(error);
    }
  },
};
