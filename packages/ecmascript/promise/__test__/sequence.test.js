

function pairwise(array) {
  return {
    [Symbol.iterator]: function* (i = 1) {
      while (i < array.length) {
        yield [array[i - 1], array[i++]];
      }
    }
  }
}

describe("Sequence of Promise", () => {

  test('Simple promise', done => {
    let count = 6;
    const tasks = Array(count).fill(undefined).map(() => jest.fn(() => cb()));
    const cb = () => {
      if (--count === 0) {
        for (let [previous, current] of pairwise(tasks)) {
          expect(previous).toHaveBeenCalledBefore(current);
        }
        done();
      }
    }

    function log_seq(p, q) {
      p.then(() => {
        q.then(tasks[4]);
        tasks[0]();
      });

      q.then(() => {
        p.then(tasks[5]);
        tasks[1]();
      });

      q.then(tasks[2]);
      p.then(tasks[3]);
    }

    log_seq(Promise.resolve("p"), Promise.resolve("q"));
  });

  test("Higher order promise", done => {
    const first = jest.fn();
    const second = jest.fn();

    function log_seq(a, b) {
      // @warning
      // not
      // ```js
      // Promise.resolve(...)
      // ````
      return [
        new Promise(resolve => resolve(b)).then(second),
        a.then(first),
      ];
    }

    Promise.all(log_seq(Promise.resolve("A"), Promise.resolve("B"))).then(() => {
        expect(first).toHaveBeenCalledBefore(second);
        done();
    });

  });

});
