const assert = require('assert');
const app    = require('../../src/app');

describe('\'polls\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/polls');
    
    assert.ok(service, 'Registered the service');
  });
});
