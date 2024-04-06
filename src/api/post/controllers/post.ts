/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    // Solution 1: fetched all posts and filtered them afterwards
    // async find(ctx) {
    //   // fetch all posts (including premium ones)
    //   const { data, meta } = await super.find(ctx);
    //   if (ctx.state.user) return { data, meta };
    //   // not authenticated
    //   const filteredData = data.filter((post) => !post.attributes.premium);
    //   return {
    //     data: filteredData,
    //     meta,
    //   };
    // },

    // Solution 2: override the find function to filter the posts before fetching them
    // async find(ctx) {
    //   // if the request is authenticated
    //   const isRequestingNonPremium =
    //     ctx.query.filters && ctx.query.filters.premium["$eq"] == false;
    //   if (ctx.state.user || isRequestingNonPremium)
    //     return await super.find(ctx);
    //   // if the request is public...
    //   const { query } = ctx;
    //   const filteredPosts = await strapi.service("api::post.post").find({
    //     ...query,
    //     filters: { ...query.filters, premium: false },
    //   });
    //   const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx);
    //   return this.transformResponse(sanitizedPosts);
    // },

    async find(ctx) {
      // if the request is authenticated
      const isRequestingNonPremium =
        ctx.query.filters && ctx.query.filters.premium["$eq"] == false;
      if (ctx.state.user || isRequestingNonPremium)
        return await super.find(ctx);
      // if the request is public...
      const publicPosts = await strapi
        .service("api::post.post")
        .findPublic(ctx.query);
      const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx);
      return this.transformResponse(sanitizedPosts);
    },

    /**
     * Example 2: Replacing a Strapi controller function
     */
    // async find(ctx) {
    //   await this.validateQuery(ctx);
    //   const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    //   // Perform whatever custom actions are needed
    //   const { results, pagination } = await strapi
    //     .service("api::post.post")
    //     .find(sanitizedQueryParams);

    //   // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
    //   const sanitizedResults = await this.sanitizeOutput(results, ctx);

    //   // transformResponse correctly formats the data and meta fields of your results to return to the API
    //   return this.transformResponse(sanitizedResults, { pagination });
    // },

    /*
     * Example 3: Writing your own new controller function
     */
    async exampleAction(ctx) {
      await strapi
        .service("api::post.post")
        .exampleService({ myParam: "example" });
      try {
        ctx.body = "ok";
      } catch (err) {
        ctx.body = err;
      }
    },

    async findOne(ctx) {
      if (ctx.state.user) return await super.findOne(ctx);
      const { id } = ctx.params;
      const { query } = ctx;
      const postIfPublic = await strapi
        .service("api::post.post")
        .findOneIfPublic({ id, query });
      const sanitizedEntity = await this.sanitizeOutput(postIfPublic, ctx);
      return this.transformResponse(sanitizedEntity);
    },

    async likePost(ctx) {
      // ctx.state.user
      const user = ctx.state.user; // user trying to like the post
      const postId = ctx.params.id; // post id
      const { query } = ctx; // query params
      const updatedPost = await strapi.service("api::post.post").likePost({
        postId,
        userId: user.id,
        query,
      });
      const sanitizedEntity = await this.sanitizeOutput(updatedPost, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
