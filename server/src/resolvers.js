const resolvers = {
  Query: {
    activities: (_, __, { dataSources }) => {
      dataSources.activitiesAPI.getActivities();
    },
  },
};

export default resolvers;
