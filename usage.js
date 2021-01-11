const { requestMultipleUrls } = require("./index");

const requests = requestMultipleUrls([
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://veryslooooooooooooooooowapi.com",
  "hmple.s3-eu-w-WRONG-URL/gbp-usd.json",
]);

requests.then((results) => {
  console.log(results);
});
