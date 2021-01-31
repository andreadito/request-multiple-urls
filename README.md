# request-multiple-urls

### Requirements:

- npm
- Node > 12 (Tested with Node 15)

### Deps:

- node-fetch
- abort-controller

### Dev deps:

- jest

### Usage Example

```js
const { requestMultipleUrls } = require("request-multiple-urls");

const requests = requestMultipleUrls([
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://veryslooooooooooooooooowapi.com",
  "hmple.s3-eu-w-WRONG-URL/gbp-usd.json",
]);

requests.then((results) => {
  console.log(results);
});
```

### Result Example

```
hmple.s3-eu-w-WRONG-URL/gbp-usd.json is an invalid URL

 [
  {
    status: 'fulfilled',
    value: { data: [Object], timeGenerated: '2019-11-15T11:07:37' }
  },
  {
    status: 'fulfilled',
    value: { data: [Object], timeGenerated: '2019-11-15T11:07:58' }
  },
  {
    status: 'rejected',
    reason: 'The user aborted a request. - https://veryslooooooooooooooooowapi.com/'
  }
]

```

### Notes:

- I've used an Abort Controller to cancel the request if the API responds after 500ms.
- In case the API fails or receive a bad status, the result will be:

```
  {
    status: 'rejected',
    reason: 'REASON OF THE FAILURE'
  }
```

- The URL will not be considered and skipped in the final array if invalid.

### Available Scripts

`npm run test` - test your code
