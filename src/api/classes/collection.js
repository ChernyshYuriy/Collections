const prefix = `/classes`;

export default {
  collection: `${prefix}/colections`,
  collectionElement: function (id) {
    return `${this.collection}/${id}`;
  },
};
