import { act, useEffect, useState } from "react";
import "./Activities.css";

const gql = `
query ExampleQuery {
    getAtheteActivities {
      name
      distance
      moving_time
      calories
      type
      start_date_local
      description
      athlete {
        id
        resource_state
      }
      splits_metric {
        distance
        elapsed_time
        split
      }
      resource_state
    }
  }
`;

const secondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${lpadString(remainingSeconds.toString(), 2, "0")}`;
};

const metersToKilometers = (meters) => {
  const km = meters / 1000;
  return km.toFixed(2);
};

const lpadString = (str, padCount, padChar = " ") => {
  return str.padStart(padCount, padChar);
};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: '{"query":"\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args(includeDeprecated: true) {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args(includeDeprecated: true) {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields(includeDeprecated: true) {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      isDeprecated\n      deprecationReason\n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ","operationName":"IntrospectionQuery"}',
    body: JSON.stringify({ query: gql }),
  };

  useEffect(() => {
    fetch("//localhost:4000/", requestOptions)
      .then((response) => response.json())
      .then((data) => setActivities(data.data.getAtheteActivities));
  }, []);

  return (
    <div className="activity">
      {activities.map((activity) => (
        <div key={activity.name}>
          <h2>
            {activity.name} on {activity.start_date_local}
          </h2>
          <h3>{activity.description}</h3>
          <h3>
            Moving Time: {secondsToMinutesAndSeconds(activity.moving_time)}
            {", "}
            Distance: {metersToKilometers(activity.distance)}km
          </h3>
          <div>
            {activity.splits_metric.map((metric) => (
              <div key={metric.split}>
                Km #{lpadString(metric.split.toString(), 2)}, Distance:{" "}
                {lpadString(metric.distance.toString(), 10, "_")}, Time:{" "}
                {secondsToMinutesAndSeconds(metric.elapsed_time)}/km, Pace Zone:{" "}
                {metric.pace_zone ?? "n/a"}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activities;
