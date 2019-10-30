
// once resolved or reject
// it will never change

describe('Once resolved, promises will be immutable.', () => {

  test('resolves once only', done => {
    const success = jest.fn();
    const test_end = () => {
      expect(success).toHaveBeenCalledTimes(1);
    }

    const TIMES = 4;
    const p = new Promise((resolve) => {
      for (let i = 1; i <= TIMES; i++) {
        setTimeout(() => {
          resolve(i);
          if (i === TIMES) {
            test_end();
            done();
          }
        }, i * 1000);
      }
    });

    p.then(success);
  });

  test('either resolves or rejects', done => {
    const success = jest.fn();
    const failed = jest.fn();

    const p = new Promise((resolve, reject) => {
      resolve('success');
      reject('failed');
      done();
    });

    p.then(success, failed).then(() => {
      expect(success).toHaveBeenCalled();
      expect(failed).not.toHaveBeenCalled();
    });
  });

});
