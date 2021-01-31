const fetch = require("node-fetch");
const AbortController = require("abort-controller");

function validateUrl(url) {
  try {
    return {
      url: new URL(url).toString(),
      error: null,
    };
  } catch (e) {
    return {
      url: null,
      error: `${e.input} is an invalid URL`,
    };
  }
}

function checkStatus(res) {
  // res.status >= 200 && res.status < 300
  if (res.ok) {
    return res;
  } else {
    throw new Error(`${res.statusText} - ${res.url}`);
  }
}

function getJSON(url) {
  if (url) {
    const executeToJson = (resolve, reject) => {
      const options = {
        timeout: 500,
      };

      const timeout = setTimeout(() => {
        controller.abort();
      }, options.timeout);

      const controller = new AbortController();

      const operation = fetch(url, { signal: controller.signal });

      operation
        .then(checkStatus)
        .then((body) => {
          const json = body.json();
          return resolve(json);
        })
        .catch((e) => {
          return reject(`${e.message} - ${url}`);
        })
        .finally(() => {
          clearTimeout(timeout);
        });
    };

    return new Promise(executeToJson);
  }
  return null;
}

function requestMultipleUrls(urls) {
  const result = [];
  if (Array.isArray(urls)) {
    for (const url of urls) {
      const { url: validUrl, error } = validateUrl(url);
      if (validUrl) {
        const json = getJSON(validUrl);
        result.push(json);
      } else {
        console.log(error);
      }
    }
  }

  return Promise.allSettled(result);
}

module.exports = {
  getJSON,
  checkStatus,
  validateUrl,
  requestMultipleUrls,
};
