
// once resolved or reject
// it will never change

describe('Once resolved, promises will be immutable.', () => {

  test('resolves once only', done => {
    const success = jest.fn();

    const p = new Promise((resolve) => {
      const TIMES = 4;
      for (let i = 1; i <= TIMES; i++) {
        setTimeout(() => {
          resolve();

          if (i === TIMES) {
            expect(success).toHaveBeenCalledTimes(1);
            done();
          }
        }, i * 1000);
      }
    });

    p.then(success);
  });

});

describe('Either resolves or rejects', () => {

  test('Resolve first', done => {
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

  test('Reject first', done => {
    const success = jest.fn();
    const failed = jest.fn();

    const p = new Promise((resolve, reject) => {
      reject('failed');
      resolve('success');
      done();
    });

    p.then(success, failed).then(() => {
      expect(success).not.toHaveBeenCalled();
      expect(failed).toHaveBeenCalled();
    });
  });
});
