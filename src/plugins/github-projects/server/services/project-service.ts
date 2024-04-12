export default ({ strapi }) => ({
  create: async (repo, userId) => {
    const newProject = await strapi.entityService.create(
      'plugin::github-projects.project',
      {
        data: {
          repositoryId: `${repo.id}`,
          title: repo.name,
          shortDescription: repo.shortDescription,
          repositoryUrl: repo.url,
          longDescription: repo.longDescription,
          createdBy: userId,
          updatedBy: userId,
        },
      }
    );
    return newProject;
  },
  delete: async (projectId: string) => {
    const deletedProject = await strapi.entityService.delete(
      'plugin::github-projects.project',
      projectId
    );
    return deletedProject;
  },
});
