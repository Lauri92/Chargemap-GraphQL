import stationModel from '../models/stationModel.js';

export default {
  Query: {
    stations: async (parent, args) => {
      return stationModel.find();
    },
  },
};