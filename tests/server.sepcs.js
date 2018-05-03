const assert = require('assert');
const { handlers, data } = require('../server');
const expect = require('chai').expect;
const stream = require('stream');

describe('Array', () => {
    describe('#indexOf', () => {
         it('should return -1 when the value is not present', () => {
              assert.equal(-1, [1, 2, 3].indexOf(4));
         });
    });
})

describe('Server routing', () => {
     it('should return the first result out of the array in /first call', (done) => {
         let req = {};
         let res = new stream.Writable({
              write: (chunk, encoding, next) => {
                  expect(chunk.toString()).to.be.eq(JSON.stringify(data[0]))
                  next();
                  done();
              } 
         });
         res.setHeader = (name, value) => {};
         handlers['/first'](req, res);
     });
})