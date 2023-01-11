// 실행 방법 : node 1.js

const arr = [1, 2, 3, 4, 5];

// 1. 홀수만 걸러주세요
// 2. 걸러진 원소에 곱하기 2를 해주세요
// 3. 모두 다 더해주세요

let sum = 0;
for (const el of arr) {
  if (el % 2 === 1) {
    const newElement = el * 2;
    sum += newElement;
  }
};

console.log(sum); // 18

const sum2 = arr
  .filter((el) => el % 2 === 1)
  .map((el) => el * 2)
  .reduce((prev, curr) => prev + curr);

console.log(sum2) // 18

/**
 * map : 배열을 순회하면서 func를 적용해서 새로운 결과 값을 담은 배열을 리턴한다.
 * func : (el) => value
 */
const map = (func, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(func(el))
  }

  return result;
};

console.log(map((el) => el * 2, arr));  // [2, 4, 6, 8, 10]

/**
 * filter : 배열을 순회하면서 func의 truthy 값(조건에 맞는 값)만 배열에 담아 리턴한다.
 * func : (el) => truthy | falsy
 */

const filter = (func, iter) => {
  const result = [];

  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
};

console.log(filter((el) => el % 2 === 1, arr)); // [1, 3, 5]


/**
 * reduce : 배열을 순회하면서 func 을 반복 적용해서 새로운 결과 값을 얻어낸다. (쪼개는 함수)
 * func : (acc, el) => acc
 * func : (prev, curr) => acc
 */

const reduce = (func, acc, iter) => {
  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
}

// 위의 경우 초기값을 넣어줘야함
console.log(reduce((prev, curr) => prev + curr, 0, arr)); // 15

// 고차함수 구현
const reduce2 = (func, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();  // 추가
    acc = iter.next().value;        // 추가
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
}

console.log(reduce2((prev, curr) => prev + curr, arr));  // 15

/**
 * iterable protocol : 약속
 * 순회 가능한 자료형은 해당 프로토콜을 따라야 한다.
 * for...of 문으로 순회 가능한 객체를 의미함.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * https://helloworldjavascript.net/pages/260-iteration.html
 * 1. [Symbol.iterator]() => iterator
 * 2. iterator.next()
 */