
describe('Order of new Promise v.s Proise.resolve', () => {

  test('new Promise creates new tick', done => {
    const np1 = jest.fn();
    const np2 = jest.fn();
    const np3 = jest.fn();
    const ps1 = jest.fn();
    const ps2 = jest.fn();
    const ps3 = jest.fn();

    function new_promise(p) {
      return [
        new Promise(resolve => resolve(p)).then(np3),
        p.then(np1).then(np2)
      ];
    }

    function promise_resolve(p) {
      return [
        Promise.resolve(p).then(ps3),
        p.then(ps1).then(ps2)
      ];
    }

    const task = Promise.resolve();
    Promise.all([...new_promise(task), ...promise_resolve(task)]).then(() => {
        expect(np1).toHaveBeenCalledBefore(np2);
        expect(np2).toHaveBeenCalledBefore(np3);

        expect(ps3).toHaveBeenCalledBefore(ps1);
        expect(ps1).toHaveBeenCalledBefore(ps2);

        done();
    });

  });

});

