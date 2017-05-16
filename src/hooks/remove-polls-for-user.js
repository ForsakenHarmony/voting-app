'use strict';

module.exports = function checkVoteUniqueHook(pollService) {
  return async (hook) => {
    await hook.app.service(pollService).remove(null, { query: { creator: hook.id } });
    return hook;
  };
};
