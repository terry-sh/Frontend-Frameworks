
describe('Iterator Object', () => {

  test('With `for-of`', () => {
    function pairwise(array) {
      return {
        [Symbol.iterator]: function* (i = 1) {
          while (i < array.length) {
            yield [array[i - 1], array[i++]];
          }
        }
      }
    }

    const list = [];
    for (let pair of pairwise([1, 2, 3, 4, 5, 6])) {
      list.push(pair);
    }
    expect(list).toStrictEqual([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]);
  });

});

describe('Iterator is Lazy', () => {

  test('Lazy', done => {
    jest.setTimeout(30000);

    let i = 0;
    const list = Array(5).fill(0).map((_, index) => index + 1);
    function run(n) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();

          expect(i).toBe(n);
          if (i === list.length) {
            done();
          }
        }, 500);
      });
    }

    function iterate(array) {
      return {
        [Symbol.iterator]: function* () {
          while (i < array.length) {
            yield array[i++];
          }
        }
      }
    }

    async function test() {
      for (let n of iterate(list)) {
        await run(n);
      }
    }

    test();
    expect(i).not.toBe(list.length);
  });

});
