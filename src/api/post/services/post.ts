import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely custom service
  async exampleService(...args) {
    let response = { okay: true };

    if (response.okay === false) {
      return { response, error: true };
    }

    return response;
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach((result) => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne(
      "api::post.post",
      entityId,
      //@ts-ignore
      this.getFetchParams(params)
    );
  },

  async findPublic(args) {
    const newQuery = {
      ...args,
      filters: { ...args.filters, premium: false },
    };
    const publicPosts = await strapi.entityService.findMany(
      "api::post.post",
      //@ts-ignore
      this.getFetchParams(newQuery)
    );
    return publicPosts;
  },

  async findOneIfPublic(args) {
    const { id, query } = args;
    const post = await strapi.entityService.findOne(
      "api::post.post",
      id,
      //@ts-ignore
      this.getFetchParams(query)
    );
    return post.premium ? null : post;
  },

  async likePost(args) {
    const { postId, userId, query } = args;
    const postToLike = await strapi.entityService.findOne(
      "api::post.post",
      postId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedPost = await strapi.entityService.update(
      "api::post.post",
      postId,
      {
        data: {
          likedBy: [...postToLike.likedBy, userId],
        },
        ...query,
      }
    );
    return updatedPost;
  },
}));
