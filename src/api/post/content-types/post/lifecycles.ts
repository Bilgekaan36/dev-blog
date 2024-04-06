module.exports = {
  beforeCreate: async ({ params }) => {
    const adminUserId = params.data.createdBy;
    const author = (
      await strapi.entityService.findMany("api::author.author", {
        filters: { admin_user: adminUserId },
      })
    )[0];

    // update the data payload
    params.data.authors.connect = [...params.data.authors.connect, author.id];
  },
  beforeUpdate: async ({ params }) => {
    const adminUserId = params.data.createdBy;

    const author = (
      await strapi.entityService.findMany("api::author.author", {
        filters: { admin_user: adminUserId },
      })
    )[0];

    // update the data payload
    params.data.authors.connect = [...params.data.authors.connect, author.id];
  },
};
