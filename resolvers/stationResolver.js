import Station from '../models/stationModel.js';
import Connection from '../models/connection.js';
import {rectangleBounds} from '../utils/rectangleBounds.js';

export default {
  Query: {
    stations: async (parent, args) => {
      const start = args.start || 0;
      const limit = args.limit || 10;
      const stations = Station.find().skip(start).limit(limit);

      return args.bounds
          ? stations.find().where('Location').within(
              rectangleBounds(args.bounds._northEast, args.bounds._southWest),
          )
          : stations;
    },
    station: async (parent, args) => {
      return Station.findById(args.id);
    },
  },
  Mutation: {
    addStation: async (parent, args) => {
      // save the connections first
      const conns = await Promise.all(
          args.Connections.map(async (conn) => {
            const newConnection = await Connection.create(conn);
            return newConnection._id;
          }),
      );
      return await Station.create({...args, Connections: conns});
    },

    modifyStation: async (parent, args) => {
      // First modify the connections
      for (const connection of args.Connections) {
        await Connection.findOneAndUpdate({_id: connection.id},
            {
              ConnectionTypeID: connection.ConnectionTypeID,
              LevelID: connection.LevelID,
              CurrentTypeID: connection.CurrentTypeID,
            });
      }

      //Modify the station
      console.log(args);
      return Station.findOneAndUpdate({_id: args.id},
          {
            Title: args.Title,
            AddressLine1: args.AddressLine1,
            Town: args.Town,
            StateOrProvince: args.StateOrProvince,
            Postcode: args.Postcode,
          }, {new: true});
    },
  },
};

/*
mutation {
  addStation(
    Connections: [{ConnectionTypeID:"5e39eecac5598269fdad81c0",LevelID:"5e39edf7bb7ae768f05cf2be",CurrentTypeID:"5e39ef4a6921476aaf62404c",Quantity:2},{ConnectionTypeID:"5e39eecac5598269fdad81a1",LevelID:"5e39edf7bb7ae768f05cf2bc",CurrentTypeID:"5e39ef4a6921476aaf62404a",Quantity:2}],
    Postcode: "02730",
    Title: "",
    AddressLine1: "Tammipääntie 55",
    StateOrProvince: "Uusimaa",
    Town: "Espoo",
    Location: {
      coordinates: [24.770991504192356, 60.25421352204379]
    }
  )
  {
    AddressLine1
    Town
  }
}
*/
