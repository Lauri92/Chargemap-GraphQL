import levelType from '../models/level.js';

export default {
  Query: {
    leveltypes: async (parent, args) => await levelType.find(),
  },
  Connection: {
    LevelID: async (parent, args) => {
      //console.log('LevelID', parent.LevelID);
      return levelType.findById(parent.LevelID);
    },
  },
};
