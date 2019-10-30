
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

  test('Lazy', async (done) => {
    jest.setTimeout(30000);

    let count = 0;
    function run(i) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          expect(count).toBe(i);
          if (i === 6) {
            done();
          }
        }, 500);
      });
    }

    function iterate(array) {
      return {
        [Symbol.iterator]: function* (i = 0) {
          while (i < array.length) {
            count++;
            yield array[i++];
          }
        }
      }
    }

    async function test() {
      const list = [1, 2, 3, 4, 5, 6];
      for (let i of iterate(list)) {
        await run(i);
      }
    }

    await test();
  });

});
