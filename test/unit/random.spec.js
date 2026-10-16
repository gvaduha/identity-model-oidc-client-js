import random, { secureUuid } from '../../src/random'
import { webcrypto } from 'crypto';
import chai from 'chai';
chai.should();

const pattern = /^[0-9a-f]{8}[0-9a-f]{4}4[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/

describe('random', function() {
  it('should return a valid RFC4122 v4 guid (sans dashes)', function(){
    random().should.match(pattern)
  })

  it('should not repeat', function(){
    const seen = new Set();
    for (let i = 0; i < 1000; i++) {
      seen.add(random());
    }
    seen.size.should.equal(1000);
  })

  it('should use crypto.getRandomValues', function(){
    let calls = 0;
    const spy = { getRandomValues(a) { calls++; return webcrypto.getRandomValues(a); } };
    secureUuid(spy).should.match(pattern);
    calls.should.be.above(0);
  })

  it('should throw instead of falling back to Math.random', function(){
    (() => secureUuid(null)).should.throw(/getRandomValues is not available/);
    (() => secureUuid({})).should.throw(/getRandomValues is not available/);
  })
})
