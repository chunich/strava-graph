# strava-graph

## Pulling Strava data

### `server` node.js

- `npm i @apollo/server graphql graphql-tag`
- https://www.apollographql.com/tutorials/lift-off-part1

### `client` React.js

- `npm create vite@latest`

## Docs

https://developers.google.com/maps/documentation/utilities/polylineutility
https://www.markhneedham.com/blog/2020/12/15/strava-authorization-error-missing-read-permission/

https://www.strava.com/settings/api
https://developers.strava.com/docs/reference/#api-Streams
https://www.strava.com/clubs/72363/recent_activity

## References

https://github.com/OGladfelter/strava_heatmap/blob/main/heatmap/js/strava_api.js
https://komanizer.com/
https://www.reddit.com/r/Strava/comments/1dbxaxw/komqom_discovery_app/

## Obtaining Auth for Dev

1/ Obtain token via URL for `clientId` (found in Strava API Settings)
https://www.strava.com/oauth/authorize?client_id={{ \_.clientId }}&redirect_uri=http://localhost&approval_prompt=force&response_type=code&scope=activity:read_all,profile:read_all

2/ POST to token API

```
curl --request POST \
  --url https://www.strava.com/api/v3/oauth/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data client_id={API} \
  --data client_secret={API} \
  --data code={CODE_FROM_ABOVE} \
  --data grant_type=authorization_code
```
