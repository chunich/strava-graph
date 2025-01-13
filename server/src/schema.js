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
    moving_time: Int
    elapsed_time: Int
    total_elevation_gain: Float
    type: String
    start_date_local: String
    description: String
    calories: Float
    splits_metric: [SplitsMetric]
    athlete: Athlete
  }

  "Splits Metric object"
  type SplitsMetric {
    split: Int
    distance: Float
    elapsed_time: Int
    elevation_difference: Float
    moving_time: Int
    average_speed: Float
    average_grade_adjusted_speed: Float
    average_heartrate: Float
    pace_zone: Int
  }
`;

export default typeDefs;
