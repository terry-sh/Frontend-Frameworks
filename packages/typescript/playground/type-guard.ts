
type Id = number | string;

function getId() {
  return 0 as Id;
}

function testAssert() {
  let i = getId();
  console.assert(typeof i === 'string');
  // const len = i.length;
}
