const task = Promise.resolve();

describe('Order of new Promise v.s Proise.resolve', () => {

  test('new Promise creates new tick', done => {
    let times = 6;
    const test_end = (id) => {
      if (--times === 0) {
        expect(np1).toHaveBeenCalledBefore(np2);
        expect(np2).toHaveBeenCalledBefore(np3);

        expect(ps3).toHaveBeenCalledBefore(ps1);
        expect(ps1).toHaveBeenCalledBefore(ps2);

        done();
      }
    }

    const np1 = jest.fn(() => test_end());
    const np2 = jest.fn(() => test_end());
    const np3 = jest.fn(() => test_end());
    const ps1 = jest.fn(() => test_end());
    const ps2 = jest.fn(() => test_end());
    const ps3 = jest.fn(() => test_end());

    function new_promise(p) {
      new Promise(resolve => resolve(p)).then(np3);
      p.then(np1).then(np2);
    }

    function promise_resolve(p) {
      Promise.resolve(p).then(ps3);
      p.then(ps1).then(ps2);
    }

    new_promise(task);
    promise_resolve(task);
  });

});

