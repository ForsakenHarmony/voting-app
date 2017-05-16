'use strict';

module.exports = function insertHasVotedHook(voteService) {
  return async (hook) => {
    const creator = hook.params.user && hook.params.user.id;
    const ip      = hook.params.ip;
    const pollId  = hook.id;
    const service = hook.app.service(voteService);
    const table   = service.table.getAll(pollId, { index: 'pollId' });
    let query   = table.filter({ ip }).count().ge(1);
    if (creator) {
      query = query.or(table.filter({ creator }).count().ge(1));
    }
    hook.result.hasVoted = await query.run();
    return hook;
  };
};
