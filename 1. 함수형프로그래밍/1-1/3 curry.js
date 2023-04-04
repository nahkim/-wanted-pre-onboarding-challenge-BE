/**
 * 함수의 평가 시점 미루기, curry
 */
// 인자를 받도록 기다리고 새로운 함수를 리턴
// 필수 조건이 들어오지 않으면 실행하지 않고 기다린다.

const curry =
  (func) =>
  (a, ...args) =>
    args.length > 0
    ? func(a, ...args)
    : (...args) => func(a, ...args);

const arr = [1, 2, 3, 4, 5];


// curry 안붙일 경우
const add1 = ((a, b) => a + b);

console.log(add1(1, 3)); // 4
console.log(add1(1));    // 값이 안들어왔는데 출력을 시켜서 NaN이 발생
// console.log(add1(1)(3)); // error

// curry 붙일 경우
const add2 = curry((a, b) => a + b);

console.log(add2(1, 3)); // 4
console.log(add2(1));    // [Function (anonymous)] add에 1이 들어왔을때 b가 들어올때까지 기다리는거
console.log(add2(1)(3)); // 18

/**
 * 로직을 더 간단하게 나타내기
 */

// 2.js 함수에서 curry 추가

const map = curry((func, iter) => {
  const result = [];
  for (const el of iter) {
    result.push(func(el));
  }

  return result;
});

const filter = curry((func, iter) => {
  const result = [];

  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
});

const reduce = curry((func, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
});

const pipe = (iter, ...functions) => 
  reduce((prev, func) => func(prev), iter, functions);


pipe(
  arr,
  (arr) => filter((el) => el % 2 === 1, arr),
  (arr) => map((el) => el * 2, arr),
  (arr) => reduce((prev, curr) => prev + curr, arr),
  (result) => console.log(result),  // 18
);

pipe(
  arr,
  (arr) => filter((el) => el % 2 === 1)(arr),
  (arr) => map((el) => el * 2)(arr),
  (arr) => reduce((prev, curr) => prev + curr)(arr),
  (result) => console.log(result),  // 18
);

// 1. 홀수만 걸러주세요
// 2. 걸러진 원소에 곱하기 2를 해주세요
// 3. 모두 다 더해주세요

const people = [
  {
    name: 'jenny',
    age: 30,
    city: 'seoul',
  },
  {
    name: 'jenifer',
    age: 20,
    city: 'seoul',
  },
  {
    name: 'chris',
    age: 15,
    city: 'tokyo',
  },
  {
    name: 'dave',
    age: 40,
    city: 'london',
  },
];

const add = (a, b) => a + b;

// result를 안넘겨줘도됨 function은 값으로 나오기 때문에
// console.log 자체가 값이기 때문에 이전에 머금고 있는 값을 func(prev)에서 던저줌
pipe(
  people,
  filter((person) => person.city === 'seoul'),
  map((person) => person.age),
  // reduce((prev, curr) => prev + curr), 같은 뜻
  reduce(add),
  console.log,  // 50
)

pipe(
  people,
  filter((person) => person.name.startsWith("j")), // j로 시작하는 이름을 가진 사람들의
  filter((person) => person.age <= 20), // 나이가 20살 이하인 사람만 데이터를 뽑아주세요
  map((person) => person.city),
  console.log,  // ['seoul']
)

const select = 'SELECT * FROM people';