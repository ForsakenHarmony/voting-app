import 'unfetch/polyfill';

export const fetch = (method, path, body) => {
  return window.fetch(path, {
    method,
    body       : body ? JSON.stringify(body) : null,
    credentials: 'include',
    headers    : {
      'x-requested-with': 'XMLHttpRequest',
      'content-type'    : 'application/json',
      accept            : 'application/json',
    },
  });
};

export const get = (path) => {
  return fetch('GET', path);
};
