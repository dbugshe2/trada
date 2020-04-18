import React from 'react';
import wretch from 'wretch';
import { errorMessage } from './toast';

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
    .defer((w, url, options) => {
      if (auth) {
        // get token, validate, and handle validity
        return w.headers({ access_token: `Bearer ${token}` });
      }
      return w;
    })
    .json(data)
    .post()
    .badRequest((err) => errorMessage(err.message))
    .unauthorized((err) => errorMessage(err.message))
    .forbidden((err) => errorMessage(err.message))
    .notFound((err) => errorMessage(err.message))
    .timeout((err) => errorMessage(err.message))
    .internalError((err) => errorMessage(err.message))
    .fetchError((err) => errorMessage(err.message));

export const apiPut = (url, data, token = '', auth = false) =>
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
    .put()
    .badRequest((err) => errorMessage(err.message))
    .unauthorized((err) => errorMessage(err.message))
    .forbidden((err) => errorMessage(err.message))
    .notFound((err) => errorMessage(err.message))
    .timeout((err) => errorMessage(err.message))
    .internalError((err) => errorMessage(err.message))
    .fetchError((err) => errorMessage(err.message));

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
    .delete()
    .badRequest((err) => errorMessage(err.message))
    .unauthorized((err) => errorMessage(err.message))
    .forbidden((err) => errorMessage(err.message))
    .notFound((err) => errorMessage(err.message))
    .timeout((err) => errorMessage(err.message))
    .internalError((err) => errorMessage(err.message))
    .fetchError((err) => errorMessage(err.message));
