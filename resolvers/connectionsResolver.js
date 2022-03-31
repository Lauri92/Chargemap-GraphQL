import connections from '../models/connections.js';

export default {
  Station: {
    async Connections(parent, args) {
      //console.log('parent: ', parent);
      console.log(parent.Connections[0]);
      return connections.findById(parent.Connections[0]);
    },
  },
};