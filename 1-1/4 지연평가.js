// generator를 통해 지연평가가 가능
// 데이터 평가시점을 최대한 미룸
// 평가 순서가 횡단이였다면 순서가 종단으로 (배열을 한번만 돌린것처럼 보임)

const curry =
  (func) =>
  (a, ...args) =>
    args.length > 0
      ? func(a, ...args)
      : (...args) => func(a, ...args);

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

// const arr = [1, 2, 3, 4, 5, ...100000000];

// #########################################################

/**
 * generator
 * reference:
 * ex) range
 */
// generator를 통해 지연평가가 가능
// 데이터 평가시점을 최대한 미룸
// 평가 순서가 횡단이였다면 순서가 종단으로 (배열을 한번만 돌린것처럼 보임)

const range = function* (limit) {
  let i = -1
  while (++i < limit) {
    yield i;
  }
}

for (const el of range(5)) {
  console.log(el);  // 0 1 2 3 4
}

/**
 * 지연평가
 * Lazy map
 */
// 순회는 하나 조건에 부합하지 않는건 로그를 출력하지 않음!
const Lmap = curry(function* (func, iter) {
  for (const el of iter) {
    console.log(`Lazy Map: ${el}`);
    yield func(el);
  }
});

/**
 * Lazy Map: 1
 * Lazy Map: 3
 * Lazy Map: 5
 */

/**
 * 지연평가
 * Lazy filter
 */
const Lfilter = curry(function* (func, iter) {
  for (const el of iter) {
    console.log(`Lazy Filter: ${el}`);
    if (func(el)) {
      yield el;
    }
  }
});

/**
 * Lazy Filter: 1
 * Lazy Filter: 2
 * Lazy Filter: 3
 * Lazy Filter: 4
 * Lazy Filter: 5
 */


const arr = [1, 2, 3, 4, 5];

pipe(
  arr,
  filter((el) => el % 2 === 1),
  map((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,  // 18
);

pipe(
  arr,
  Lfilter((el) => el % 2 === 1),
  Lmap((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,  // 18
);