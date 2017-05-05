'use strict';

const logger = require('winston');

module.exports = function () {
  return function (hook) {
    logger.info('IP: ' + hook.params.ip, `${hook.path}::${hook.method}`);
  };
};
