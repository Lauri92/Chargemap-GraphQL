import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    stations: [Station]
    station(id:ID!): Station
  }
  
  type Station {
    id: ID
    Title: String
    AddressLine1: String
    StateOrProvince: String
    Postcode: String
  }
`;