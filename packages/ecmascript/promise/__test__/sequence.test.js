

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
    let count = 2;
    const cb = () => {
      if (--count === 0) {
        expect(snd).toHaveBeenCalledAfter(fst);
        done();
      }
    }
    const fst = jest.fn(() => cb(1));
    const snd = jest.fn(() => cb(2));

    function log_seq(first, second) {
      // @warning
      // not
      // ```js
      // Promise.resolve(...)
      // ````
      new Promise(resolve => { resolve(second); }).then(snd);
      first.then(fst);
    }

    log_seq(Promise.resolve("A"), Promise.resolve("B"));

  });

});
