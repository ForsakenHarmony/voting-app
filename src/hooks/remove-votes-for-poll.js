'use strict';

module.exports = function checkVoteUniqueHook(voteService) {
  return async (hook) => {
    await hook.app.service(voteService).remove(null, { query: { pollId: hook.id } });
    return hook;
  };
};
