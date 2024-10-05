import { useEffect, useState } from "react";

const gql = `
query ExampleQuery {
    getAtheteActivities {
      name
      distance
      moving_time
      calories
      type
      start_date_local
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

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const metersToKilometers = (meters) => {
  const km = meters / 1000;
  return km.toFixed(2);
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
    <div>
      {activities.map((activity) => (
        <div key={activity.id}>
          <h1>{activity.name}</h1>
          <h2>
            Moving Time: {secondsToMinutesAndSeconds(activity.moving_time)}
            {", "}
            Distance: {metersToKilometers(activity.distance)}km
          </h2>
          <div>
            {activity.splits_metric.map((metric) => (
              <div key={metric.split}>
                Split: {metric.split}, Distance: {metric.distance}, Time:{" "}
                {secondsToMinutesAndSeconds(metric.elapsed_time)}/km
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activities;
