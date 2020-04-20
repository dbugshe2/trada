import wretch from 'wretch';

/*
 * Fetcher - wrapppers and helpers
 * for making call to Trada backend API
 */

const baseUrl = 'https://thrive-commerce-api.herokuapp.com/thr/v1';

// experimental
const logMiddleware = () => (next) => (url, opts) => {
  console.log(`${opts.method}@${url}`);
  return next(url, opts);
};

export const apiGet = (url, query = {}, token = '', auth = false) =>
  wretch(baseUrl)
    .accept('application/json')
    .middlewares([logMiddleware()])
    .url(url)
    .errorType('json')
    .defer((w, url, options) => {
      if (auth) {
        // get token, validate, and handle validity
        return w.headers({ access_token: `Bearer ${token}` });
      }
      return w;
    })
    .query(query)
    .get();

export const apiPost = (url, data, token = '', auth = false) =>
  wretch(baseUrl)
    .content('application/json')
    .middlewares([logMiddleware()])
    .url(url)
    .errorType('json')
    .defer((w, url, options) => {
      if (auth) {
        // get token, validate, and handle validity
        return w.headers({ access_token: `Bearer ${token}` });
      }
      return w;
    })
    .json(data)
    .post();

export const apiPut = (url, data, token = '', auth = false) =>
  wretch(baseUrl)
    .content('application/json')
    .middlewares([logMiddleware()])
    .url(url)
    .errorType('json')
    .defer((w, url, options) => {
      if (auth) {
        // get token, validate, and handle validity
        return w.headers({ access_token: `Bearer ${token}` });
      }
      return w;
    })
    .json(data)
    .put();

export const apiDel = (url, data, token = '', auth = false) =>
  wretch(baseUrl)
    .content('application/json')
    .middlewares([logMiddleware()])
    .url(url)
    .defer((w, url, options) => {
      if (auth) {
        // get token, validate, and handle validity
        return w.headers({ access_token: `Bearer ${token}` });
      }
      return w;
    })
    .json(data)
    .delete();
