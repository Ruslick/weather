
const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const operator = process.argv[4];

const operatorsMap = {
  add: import('./operations/add.js'),
  sub: import('./operations/sub.js'),
  multiply: import('./operations/multiply.js'),
  devide: import('./operations/devide.js'),
};

// protection
if (isNaN(num1) || isNaN(num2)) {
  console.log('Invalid numbers');
  process.exit(1);
}
if (operatorsMap[operator] === undefined) {
  console.log('Invalid operator! Available operators:', Object.keys(operatorsMap));
  process.exit(1);
}


// main
(async () => {
  const { default: operation } = await operatorsMap[operator];
  console.log(operation(num1, num2));
})();