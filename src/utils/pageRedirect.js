import router from "@/router";

export function redirectItemPage(collectionTitle, id, query = {}) {
  router.push({ path: `/item/${collectionTitle}/${id}`, query });
}
