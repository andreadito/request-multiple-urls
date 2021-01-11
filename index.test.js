const {
  validateUrl,
  checkStatus,
  requestMultipleUrls,
  getJSON,
} = require("./index");

describe("requestMultipleUrls", () => {
  it("should return an empty array if no urls are passed", async () => {
    const result = await requestMultipleUrls();
    expect(result).toStrictEqual([]);
  });
  it("should return an array of results if urls are valid", async () => {
    const urls = [
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
    ];

    const results = await requestMultipleUrls(urls);
    expect(results).toHaveLength(3);
  });
});

describe("getJSON", () => {
  it("should return null if url is undefined or null", () => {
    const result = getJSON();
    expect(result).toStrictEqual(null);
  });
  it("should return a Promise if url is passed", () => {
    const result = getJSON(
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json"
    );
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("checkStatus", () => {
  it("should throw an error if res is KO", () => {
    const statusText = "status error";
    const url =
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json";
    const res = {
      ok: false,
      statusText,
      url,
    };
    try {
      checkStatus(res);
    } catch (e) {
      expect(e.message).toStrictEqual(`${statusText} - ${url}`);
    }
  });
  it("should return the full response if the res is OK", () => {
    const statusText = "";
    const url =
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json";
    const res = {
      ok: true,
      statusText,
      url,
    };
    const result = checkStatus(res);
    expect(result).toStrictEqual(res);
  });
});

describe("validateUrl", () => {
  it("should return the url if the url has the right format", () => {
    const url =
      "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json";
    const result = validateUrl(url);
    expect(result.url).toStrictEqual(url);
    expect(result.error).toBeNull();
  });
  it("should return an error if the url is invalid", () => {
    const url = "hmple.s3-eu-w-WRONG-URL/gbp-usd.json";
    const result = validateUrl(url);
    expect(result.error).toBeDefined();
    expect(result.url).toBeNull();
  });
});
