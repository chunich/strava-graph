import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getAtheteActivities: [Activity!]!
  }

  "Athlete object"
  type Athlete {
    id: ID!
    resource_state: Int
  }

  "Activities object"
  type Activity {
    resource_state: Int
    name: String
    distance: Float
    type: String
    start_date_local: String
    calories: Float
    splits_metric: [Split]
    athlete: Athlete
  }

  "Split object"
  type Split {
    split: Int
    distance: Float
    elapsed_time: Int
  }
`;

export default typeDefs;
