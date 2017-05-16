'use strict';

module.exports = function checkVoteUniqueHook() {
  return async (hook) => {
    const creator = hook.data.creator;
    const ip      = hook.data.ip;
    const pollId  = hook.data.pollId;
    const table   = hook.service.table.getAll(pollId, { index: 'pollId' });
    let query   = table.filter({ ip }).count().ge(1);
    if (creator) {
      query = query.or(table.filter({ creator }).count().ge(1));
    }
    const res = await query.run();
    if (res) {
      throw new Error('You already voted');
    }
    return hook;
  };
};
