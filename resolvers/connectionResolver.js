import connection from '../models/connection.js';

export default {
  Station: {
    Connections: async (parent, args) => {
      //console.log('parent', parent);
      return connection.find({_id: {$in: parent.Connections}});
    },
  },
};
