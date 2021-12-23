## 1. Basic

### 1-1. number

```tsx
const num: number = 1;
```

### 1-2. string

```tsx
const str: string = 'hello';
```

### 1-3. boolean

```tsx
const bool: boolean = false;
```

### 1-4. undefined

- 아래와 같은 `undefined` 타입 지정은 모순적이다.
- name이라는 변수에 데이터를 넣으려고 선언을 했는데. `undefined` 라는 것이 의미적으로 앞뒤가 맞지 않는다.
- `undefined` 로 선언된 변수에는 `undefined` 외에는 지정이 불가하다.

```tsx
let name: undefined; // 💩 not good -> useless
name = 'Hwibaski'; // error
```

> 타입이 `string`일 수도 있고, `undefined`일 수도 있다면 `union type`을 사용하자.

```tsx
let age: number | undefined;
age = undefined;
age = 1;

// find  함수는 number를 리턴할 수도 있고, undefined를 리턴할 수도 있다.
const find = function (): number | undefined {
  return 1 || undefined;
};
```

### 1-5. null

- `null` 은 `undefined` 와 비슷한 맥락으로 값이 없다는 것이지만 명시적으로(의도적으로) 값이 없음을 나타낸다.

```tsx
let person: null; // 💩 not good -> useless
let person2: string | null;
person = null;
person2 = 'hello';
```

### 1-6. unknown

- 어떠한 타입인지 알 수 없음을 의미 → 그러므로, 어떤 타입이든 지정이 된다.

```tsx
let notSure: unknown = 0;
notSure = 'he';
notSure = true;
```

### 1-7. any

- 어떠한 타입이든 사용이 가능 → 그러므로, 아무 타입이든 지정이 된다.

```tsx
let anything: any = 0;
anything = 'hello';
anything = 1;
```

> `unknown` 과 `any` 는 사실상 typescript를 사용하는 의미를 퇴색시킨다. 정말 필요한 곳 외에는 사용을 지양하자.

### 1-8. void

- 함수의 리턴 타입을 정의하는 데 주로 사용

```tsx
// void : 아무것도 리턴하지 않는다, 다만 리턴문은 한다.
function print(): void {
  console.log('hello');
  return;
}

// return 문이 없지만 내부적으로 return undefined가 생략되어 있으므로
// 아무것도 void 타입이다.
function print(): void {
  console.log('hello');
  // return undefined -> return문이 없을 시,
  // JavaScript 내부적으로 return undefined를 한다.
}
```

- 변수에서의 `void`
- 변수에서 `void` 타입을 지정하면 `undefined` 만 할당이 가능하기 때문에, 활용성이 떨어진다.

```tsx
let useless: void = undefined; // 💩
let useless = '123'; // error
```

### 1-9. never

- `void` 타입은 아무것도 리턴을 하지 않을 때 사용을 했다.
- `never` 타입은 return 자체를 하지 않을 때 사용을 한다.
- 주로 `throw new Error()` 와 같은 에러 핸들링에 사용된다.

```tsx
// never : return 자체를 하지 않는다.
function throwError(message: string): never {
  // message => server (log)

  // 1 : error 핸들링의 경우
  throw new Error(message);
  // 2 : 무한 루프 역시 아무것도 리턴하지 않으므로 never 타입이다.
  while (true) {
    // ...
  }
}

// 이런 식으로 사용하는 경우는 없다.
let neverEnding: never; // 💩
```

### 1-10. object

- 원시타입을 제외한 모든 `object` 타입을 지정할 수 있다.
- 함수의 매개변수로 `object` 타입을 지정할 경우, 너무 광범위한 값들이 올 수 있기 때문에 썩 좋은 타입은 아니다.

```tsx
let obj: object; // 💩
obj = [1, 2, 3];
obj = { test: 'test' };
function acceptSomeObject(obj: object) {} //
// 💩 -> 어떠한 객체(배열)이든 받아들을 수 있다. 너무 광범위 하다...
acceptSomeObject({ name: 'hwimin' });
acceptSomeObject({ animal: 'dog' });
```

## 2. Type in Function

### 2-1. 일반적인 사용 방법

```tsx
// JavaScript
function jsAdd(num1, num2) {
  return num1 + num2;
}

// TypeScript
function add(num1: number, num2: number): number {
  return num1 + num2;
}
```

### 2-2. promise 를 리턴할 경우

```tsx
// JavaScript
function jsFetchNum(id) {
  // code..
  // code..
  return new Promise((resolve, reject) => {
    resolve(100);
  });
}

// TypeScript
// string인 id를 받아서 Promise를 return 하는데,
// resolve 시 값이 number이다.
function fetchNum(id: string): Promise<number> {
  // code ...
  return new Promise((resolve, reject) => {
    resolve(100);
  });
}
```

### 2-3. optional parameter

- 함수의 매개변수에서 특정 매개변수가 없는 경우가 없는 경우가 있을 수 있다.
- 그럴 때는 `optional parameter`를 사용한다.
- 아래의 코드에서 `lastName` 매개변수는 `string` 일 수도 있고, `undefined`일 수도 있다.

> parameter?: type

```tsx
function printName(firstName: string, lastName?: string) {
  console.log(firstName);
  console.log(lastName);
}
printName('Steve', 'Jobs'); // 'Steve', 'Jobs'
printName('Hwimin'); // 'Hwimin', undefined
printName('Anna', undefined); // 'Anna', undefined
printName('Anna', 123); // error
```

### 2-3-1. union type으로 해결할 수 있는거 아니야?

- 똑같은 코드를 가지고 `lastName` 매개변수만 `union type`으로 지정해보자
- 컴파일 에러가 난다. → `optional parameter` 대신 `union 타입`을 사용 시, 무조건 특정한 값이 있어야 한다.
- 없는 값을 `undefined` 로 명시해줘야하므로, 유연하지 못하고 불필요한 코드도 생성된다.

```tsx
function printName(firstName: string, lastName: string | undefined) {
  console.log(firstName);
  console.log(lastName);
}
printName('Steve', 'Jobs'); // 'Steve', 'Jobs'
printName('Hwimin'); // error -> why? union type으로 지정 시 무조건 값이 있어야한다.
printName('Hwimin', undefined); // 'Hwimin', undefined
printName('Anna', undefined); // 'Anna', undefined
printName('Anna', 123); // error
```

### 2-4. default parameter

- JS에서도 `default parameter` 를 사용할 수 있다.
- TS 에서도 default parameter를 사용할 수 있다.

```tsx
function printMessage(message: string = 'default message') {
  console.log(message);
}

// 아무 인수도 넣지 않았지만, 'default message'가 출력된다.
printMessage(); // 'default message'
```

### 2-5. rest parameter

- rest parameter는 JS에서 기본적으로 사용가능하다.
- `...parameter` 의 형태로 매개변수를 지정하고, 인수로 여러 개의 값들을 입력할 시 parameter에 인수의 값들이 배열로 저장된다.

```jsx
const add = function (...numbers) {
  console.log(numbers);
};
add(2, 3); // [2, 3]
add(5, 3, 7, 2); // [5, 3, 7, 2]
add(8, 2, 5, 3, 2, 1, 4); // [8, 2, 5, 3, 2, 1, 4]
```

- typescript에서는 `...parameter`의 타입을 지정해 줄 수 있다. 즉, 매개변수로 들어올 배열들의 각 요소의 타입을 지정할 수 있다.

```tsx
// JavaScript
function addNumbers(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

// TypeScript
function addNumbers(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b);
}
console.log(addNumbers(1, 2)); // 3
console.log(addNumbers(1, 2, 3, 4)); // 10
console.log(addNumbers(1, 2, 3, 4, 5, 0)); // 15
console.log(addNumbers(1, '1')); // compile error
```

### 2-5-1. JavaScript 라면 어땠을까?

- 아래의 함수는 매개변수로 받는 모든 값들을 더한 값을 리턴하는 것이 목표이다.
- `addNumbers` 의 인수에 문자열을 넣어보자.
- 개발자의 의도와 전혀 다른 방향으로 실행되어버린다.

```tsx
// JavaScript
function addNumbers(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

console.log(addNumbers(1, '1')); // '11' -> 끔찍하다.
```

## 3. Type with Array

### 3-1. Array의 타입을 지정하는 방법

1.

```tsx
const alphabet: string[] = ['a', 'b'];
```

2.

```tsx
const alphabet: Array<string> = ['a', 'b'];
```

### 3-2. 두 방법의 차이점은?

- `readonly` 의 사용가능 여부가 다르다.
  - 1번 방법의 경우 `readonly` 사용가능
  - 2번 방법은 경우 `readonly` 사용불가
- `readonly` 란?

```tsx
// readonly를 추가할 경우 매개변수 alphabet의 값을 읽을 수만 있다.
// alphabet의 값을 수정할 수 없다.
// alphabet.push() 같은 메서드를 pirntArray 함수 내부에서
// 사용할 수가 없다는 뜻이다.
function printArray(alphabet: readonly string[]) {}
```

> 💡`readonly` 가 굉장히 많이 쓰이기 때문에 1번 방법을 사용하자!

### 3-3. Tuple

- `Tuple` 이란?
- 배열과 유사하지만 서로 다른 타입의 데이터를 담을 수 있는 타입이다.

```tsx
let student: [string, number];
student = ['name', 123];
student[0]; // name
student[1]; // 123
```

> `tuple` 의 사용은 권장되지 않는다. why?

- 인덱스에 따라 값을 찾는다. 이는 어떤 값이 있는지 파악하기가 어렵다.
- 게다가 각 요소의 타입도 통일되어 있지 않다.
- `tuple`을 사용할만한 곳에는 `interface`, `type alias`, `class`로 대체해서 사용한다.
- `array 구조분해`로 가독성을 높힐 수는 있지만, 굳이? `React Hook`, `useState()`가 tuple의 좋은 사용 예
- 동적으로 관리해야하는 것이 있는데 `interface`, `type alias`, `class`로 관리하기 어렵다면 `tuple` 을 사용한다.

## 4. Type Alias(사용자 정의 타입)

- 기본 타입외에 사용자가 타입의 이름을 지정할 수 있다.

```tsx
// Text란 타입은 없다. 하지만 별명을 붙혀서 타입을 지정할 수 있다.
type Text = string;
const name: string = 'hwimin';
const alphabet: Text = 'a';
type Num = number;
```

- 객체의 프로퍼티도 타입을 지정할 수 있다.

```tsx
type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: 'hwimin',
  age: 10,
};

const student: Student = {
  animal: 'dog', // name 프로퍼티가 없기 때문에 error 발생
};
```

## 5. String Literal Type

- 타입을 지정할 뿐만 아니라 특정 값만 할당할 수 있도록 지정할 수도 있다.

```tsx
type Name = 'name';
let myName: name;
myName = 'name';
myName = 'hwimin'; // 'name'이 아니기 때문에 error 발생

type JSON = 'json';
const json: JSON = 'json';

type Bool = true;
const isCat: Bool = true;
const isCat: Bool = false; // true 가 아니기 때문에 error 발생
```

## 6. Union Types

- 프로그래밍 언어에서 `or` 과 비슷한 역할을 한다.
- `String literal type`과 조합하면 활용도가 높다.

```tsx
type Direction = 'left' | 'right' | 'up' | 'down';

function move(direction: Direction) {
  console.log(direction);
}

move('right');
move('left');
move('abc'); // error : 'left', 'right', 'up', 'down' 중 하나가 인수로 대입되어야 한다.

type TileSize = 8 | 16 | 32;
const title: TileSize = 16;
```

### 6-1. 예시

> 로그인의 상태를 리턴해주는 함수를 만든다고 가정해봅시다.

```tsx
type SuccessState = {
  response: {
    body: string;
  };
};

type FailState = {
  reason: string;
};

type LoginState = SuccessState | FailState;

// LoginState에 SuccessState | FailState가 들어갈 수도 있지만,
// 따로 type을 지정을 해서 관리할 수도 있다.

function login(id: string, password: string): LoginState {
  // Promise<LoginState> 실제 프로젝트에서는 프로미스겠죠?
  return {
    response: {
      body: 'logged in!',
    },
  };
}

function printLoginState(state: LoginState) {
  // state.response.body -> 이런 식으로 접근이 불가하다.
  // Union Type이기 때문에 state 객체 내에 response가 있는지 없는지 알 수 없다.
  if ('response' in state) {
    console.log(`🚀 ${state.response.body}`);
  } else {
    // console.log(${state.response}) ->  문법을 이해하는건가? state.response에 접근이 불가하다.
    console.log(`😇 ${state.reason}`);
  }
}
```

## 7. Discriminated Unions

- 6-1 예시의 `printLoginState` 의 if문 안에서 `in` 연산자를 사용해서 `state` 객체를 확인하고 있다.
- `state.result` 처럼 dot notation을 이용해서 접근하고 싶다면 `SuccessState` 와 `FailState` 타입에 공통으로 `result` 라는 프로퍼티를 추가해주면 dot notation으로 접근할 수 있다.

```tsx
type SuccessState = {
  result: 'success';
  response: {
    body: string;
  };
};

type FailState = {
  result: 'fail';
  reason: string;
};

type LoginState = SuccessState | FailState;

function printLoginState(state: LoginState) {
  state.result; // success or fail
  if (state.result === 'success') {
    console.log(`🚀 ${state.response.body}`);
  } else {
    console.log(`😇 ${state.reason}`);
  }
 }
}
```

## 8. Enum type

- 관련된 상수들을 한 곳에 모아서 관리할 수 있는 타입

### 8-1. JavaScript 에서의 상수

- 대문자를 사용해서 상수라는 것을 나타낸다.
- `Object.freeze({})` 를 사용해서 외부에서 변경할 수 없는 객체를 지정할 수 있다.

```jsx
const MAX_NUM = 6;
const MAX_STUDENTS_PER_CLASS = 10;
const MONDAY = 0;
const TUESDAY = 1;
const WEDNESDAY = 2;
const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
const dayOfToday = DAYS_ENUM.MONDAY;
```

### 8-2. TypeScript의 enum

- `enum` 타입 지정 후 값을 지정하지 않으면 자동적으로 0부터 차례대로 숫자들 할당함

```tsx
enum Days {
  Monday, // 0
  Tuesday, // 1
  Wednesday, // 2
  Thursday, // 3
  Friday, // 4
  Saturday, // 5
  Sunday, // 6
}

console.log(Days.Monday); // 0
let day = Days.Friday; // 4
```

- 내가 원하는 값으로 지정을 하고 싶다면?
- `enum`에 설정된 아이템에 값을 할당할 수도 있다. 값이 할당되지 않은 아이템은 이전 아이템의 값에 `+1`된 값이 설정된다.
- 문자열은 그 다음의 값을 유추하기 어렵기 때문에 수동으로 값을 입력해줘야 한다.

```tsx
enum Days {
  Monday = 1,
  Tuesday = 100,
  Wednesday, // 101
  Thursday, // 102
  Friday, // 103
  Saturday = 'saturday',
  Sunday = 'sunday', // 입력하지 않을 시 컴파일 불가
}
```

### 8-3. enum 타입의 사용은 괜찮은가?

- 타입스크립트의 `enum` 은 위험성을 가지고 있다.

```tsx
enum Days {
  Monday, // 0
  Tuesday, // 1
  Wednesday, // 2
  Thursday, // 3
  Friday, // 4
  Saturday, // 5
  Sunday, // 6
}

let day: Days = Days.saturday;
// day 변수는 Days(enum)타입을 가질 수 있는데 이 때,
// enum이 가지고 있는 타입을 임의로 지정할 수 있다.
// enum내에 Tuesday가 1이 될 수 있으므로 1이 그냥 할당이 가능해진다.
day = 1;
// 문제는 enum타입이 가지고 있지 않는 숫자도 할당이 가능하다.
day = 10; // 에러가 나지 않는다. 컴파일도 문제 없이 생성된다.
```

- `union type` 을 이용해서 `enum` 의 역할을 대신할 수 있다. 이 방법이 더 안전하다.

```tsx
type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
let dayOfWeek: Day = 'Monday';
```

## 9. type inference(타입 추론)

- 최초에 변수를 초기화(할당)할 때 문자열을 지정한다면, TypeScript가 그 변수의 타입을 문자열로 추론(추측해서 지정)한다. 그 이후 다른 문자열로는 할당이 가능하지만, 그 외의 타입으로 할당이 불가능하다.
- 타입 추론 간편하고 좋은것인가?
- 개인의 생각마다 다르겠지만, 웬만하면 타입을 지정해주는 것이 정확하고 안전하다.
- 함수의 `void` 타입이라면 그나마 생략 가능.

```tsx
let text = 'hello';
text = 'hi';
text = 1; // error
text = {}; // error

// 함수의 매개변수에는 자동으로 any로 추론한다. 그러므로 type을 지정해주는 것이 좋다.
function print(message) {
  console.log(message);
}

print('hello');
print(1);
```

- default parameter를 지정해줄 경우 지정된 `parameter` 의 타입으로 지속적으로 추론한다.

```tsx
function printStr(message = 'hi') {
  console.log(message);
}

printStr('hello');
printStr(1); // error
```

- 들어오게될 매개변수의 타입이 둘 다 `number` 타입이므로 `return` 값의 타입도 `number` 일 것이라고 추론한다.

```tsx
function add(x: number, y: number) {
  return x + y;
}

// add 함수는 return 값을 number 타입으로 추론했따.
// 그 함수의 리턴 값을 변수에 담는다면, 그 변수 또한 number 타입이라고 추론한다.
const result = add(1, 2);
```
