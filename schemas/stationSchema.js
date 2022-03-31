import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    stations: [Station]
  }
  
  type Station {
    id: ID
    Title: String
  }
`;