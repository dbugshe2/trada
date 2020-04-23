import wretch from 'wretch';
import ObjectID from 'bson-objectid';
import { captureException } from 'sentry-expo';
import { Alert } from 'react-native';
import { successMessage } from './toast';
/*
 * Fetcher - wrapppers and helpers
 * for making call to Trada backend API
 */

const baseUrl = 'https://thrive-commerce-api.herokuapp.com/thr/v1';
const cloudinaryName = 'standesu';
const imageUploadBaseUrl =
  'https://api.cloudinary.com/v1_1/standesu/image/upload';

const UPLOAD_PRESET = 'eelox8jn';

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

export const apiImageUplpoad = (
  name,
  data,
  onLoad,
  onError,
  onProgress = () => {}
) => {
  try {
    const fileName = name;

    const formData = new FormData();
    formData.append('file', {
      uri: data.uri,
      type: 'image/jpg',
      name: fileName,
    });
    formData.append('cloud_name', 'standesu');
    formData.append('upload_preset', UPLOAD_PRESET);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', imageUploadBaseUrl);
    xhr.onload = () => {
      // console.log({ ...xhr });
      onLoad(JSON.parse(xhr._response));
    };

    xhr.onerror = () => {
      // console.log(xhr);
      onError(JSON.parse(xhr._response));
    };
    console.log(fileName);
    xhr.send(formData);
    if (xhr.upload) {
      xhr.upload.onprogress = ({ total, loaded }) => {
        const uploadProgress = loaded / total;
        onProgress(uploadProgress);
        // console.log(uploadProgress);
      };
    }
  } catch (error) {
    console.log(error);
    // captureException(error);
  }
};
