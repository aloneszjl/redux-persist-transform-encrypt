'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDecryptor = exports.makeEncryptor = exports.handleError = undefined;

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleError = exports.handleError = function handleError(handler, err) {
  if (typeof handler === 'function') {
    handler(err);
  }
};

var makeEncryptor = exports.makeEncryptor = function makeEncryptor(transform) {
  return function (state, key) {
    state = (0, _jsonStringifySafe2.default)(state);
    return transform(state);
  };
};

var makeDecryptor = exports.makeDecryptor = function makeDecryptor(transform, onError) {
  return function (state, key) {
    if (typeof state !== 'string') {
      handleError(onError, new Error('redux-persist-transform-encrypt: expected outbound state to be a string'));
      return state;
    }
    try {
      return transform(state);
    } catch (err) {
      handleError(onError, err);
      return null;
    }
  };
};