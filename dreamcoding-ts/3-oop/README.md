## 1. 객체지향 프로그래밍이란?

프로그래밍 패러다임 중 하나로 객체를 기반으로한 프로그래밍을 한다. 객체 지향 프로그래밍은 [컴퓨터 프로그램](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8)을 [명령어](<https://ko.wikipedia.org/wiki/%EB%AA%85%EB%A0%B9%EC%96%B4_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 "[객체](<https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)>)"들의 모임으로 파악하고자 하는 것이다. 각각의 객체는 [메시지](https://ko.wikipedia.org/wiki/%EB%A9%94%EC%8B%9C%EC%A7%80)를 주고받고, [데이터](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0)를 처리할 수 있다.

1. 생산성
2. 높은 퀄리티
3. 빠르고, 유지보수가 용이하다.

### 1.1 클래스와 객체의 차이

#### 클래스

- 객체를 만들기 위한 템플릿
- 작성 시 한 번만 선언한다.
- 실제로 데이터가 들어가지 않는다.

#### 객체

- 클래스를 이용하여 만든 각각의 객체는 그 클래스의 인스턴스이다.
- 여러개로 만들어질 수 있다.
- 실제로 데이터가 들어간다.

![](https://images.velog.io/images/gnlals1/post/a010fac2-9c50-49c9-ba22-5b1da371cc20/image.png)

### 1.2 객체지향의 원칙

> 각각의 특징에 대한 설명은 더 공부한 후 추가 예정.

- 캡슐화(Encapsulation)
- 추상화(abstraction)
- 상속성(inheritance)
- 다형성(polymorphism)

## 2. 절차지향적으로 커피기계 만들기

- 관련된 변수, 상수, 메서드들이 묶여 있지 않고, 파편화되어 있다.

```tsx
// makeCoffee가 리턴할 객체의 타입을 정의
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

// 하나의 샷에 소모되는 커피콩의 그람(g)을 상수로 정의, 임의로 하나의 샷에 7g이 소모된다고 가정
const BEANS_GRAMM_PER_SHOT: number = 7;

// 우리가 가지고 있는 커피 콩의 양, 현재는 0이라고 가정
let coffeeBeans: number = 0;

// 커피를 만드는 함수, 몇 잔을 만들지 shots 매개변수로 받는다.
function makeCoffee(shots: number): CoffeeCup {
  // 우리가 가지고 있는 커피콩의 양의 샷의 숫자와 BEANS_GRAMM_PER_SHOT의 곱보다 작으면 error
  if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
    throw new Error('Not enough coffee beans!');
  }
  // 커피를 만들었기 때문에, 우리가 가지고 있는 coffeeBeans를 줄여줘야 한다.
  coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
  // 정상적으로 작동시 아래의 객체를 리턴
  return {
    shots,
    hasMilk: false,
  };
}

// const coffee = makeCoffee(2); -> 우리가 가지고 있는 커피콩이 0이기 때문에 error를 던진다.

// 커피콩의 숫자를 늘려준다.
coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
const coffee = makeCoffee(2);
console.log(coffee); // { shots: 2, hasMilk: false }
```

## 3. 객체지향적으로 코딩하기

- 서로 관련 있는 데이터 및 함수들을 한 곳에 모아놓을 수 있다.
- 생성할 객체의 청사진(템플릿)을 제공한다.

```tsx
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

class CoffeeMaker {
  // 멤버변수, 속성
  // BEANS_GRAMM_PER_SHOT은 어떠한 인스턴스이던 간에 7로 고정되어 있다.
  // 굳이 인스턴스마다 중복적으로 데이터를 생성하여 이 값을 가지고 있을 필요가 없다. -> 메모리의 낭비
  BEANS_GRAMM_PER_SHOT: number = 7;
  coffeeBeans: number = 0;

  // class를 가지고 obejct instance를 만들 때 항상 호출이 된다.
  constructor(coffeeBeans: number) {
    // constructor에서 인수를 받아서 멤버변수의 coffeeBeans에 할당한다.
    this.coffeeBeans = coffeeBeans;
  }

  makeCoffee(shots: number): CoffeeCup {
    // class 내에서 멤버변수에 접근하기 위해서는 this를 붙혀줘야한다.
    if (this.coffeeBeans < shots * this.BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    this.coffeeBeans -= shots * this.BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
}

// new 연산자는 CoffeeMaker의 인스턴스를 생성한다.
// CoffeeMaker 뒤의 '()' 는 생성자 함수를 실행한다.
const maker = new CoffeeMaker(32);
console.log(maker); // CoffeeMaker { BEANS_GRAMM_PER_SHOT: 7, coffeeBeans: 32 }
const maker2 = new CoffeeMaker(17);
console.log(maker2); // CoffeeMaker { BEANS_GRAMM_PER_SHOT: 7, coffeeBeans: 17 }
```

### static

- 클래스는 넣어주는 데이터에 따라서 메소드나 필드가 바뀌는 것이 특징이다.
- 하지만 들어오는 데이터에 따라 변하는 것이 아닌 항상 고정으로 지정된 값들이 필요할 수 있다. 이럴 때 static을 사용한다.
- `BEANS_GRAMM_PER_SHOT`은 어떠한 인스턴스이던 간에 7로 고정되어 있다. (어떠한 커피메이커든 간에 한 샷에 7g이 소모된다는 가정하에...)
- 굳이 인스턴스마다 중복적으로 데이터를 생성하여 이 값을 가지고 있을 필요가 없다. -> 메모리의 낭비
- `class` 내에서 `static`으로 선언한 멤버변수에 접근할 때는 `this`가 아닌 `class`의 이름으로 접근해야 한다.

```tsx
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

class CoffeeMaker {
  // 멤버변수, 속성
  // BEANS_GRAMM_PER_SHOT은 어떠한 인스턴스이던 간에 7로 고정되어 있다.
  // 굳이 인스턴스마다 중복적으로 데이터를 생성하여 이 값을 가지고 있을 필요가 없다. -> 메모리의 낭비
  static BEANS_GRAMM_PER_SHOT: number = 7; // class level
  coffeeBeans: number = 0; // instance level

  constructor(coffeeBeans: number) {
    this.coffeeBeans = coffeeBeans;
  }
  // static을 사용하여 클래스 내부에서 스스로 인스턴스를 만들어서 리턴하는 메서드를 정의할 수 있다.
  static makeMachine(coffeeBeans: number): CoffeeMaker {
    return new CoffeeMaker(coffeeBeans);
  }

  makeCoffee(shots: number): CoffeeCup {
    // static으로 선언한 멤버변수는 클래스의 이름을 붙혀줘야한다.
    if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
}

const maker = new CoffeeMaker(32);
console.log(maker); // CoffeeMaker { coffeeBeans: 32 }

const maker2 = new CoffeeMaker(17);
console.log(maker2); // CoffeeMaker { coffeeBeans: 17 }

// static을 사용하기 위해 클래스의 이름으로 접근하는 예
const maker3 = CoffeeMaker.makeMachine(10);
console.log(maker3); // CoffeeMaker { coffeeBeans: 10 }
console.log(CoffeeMaker.BEANS_GRAMM_PER_SHOT); // 7

/**
 * Math.max(), Math.min() 등이 static으로 선언된 메소드들을 불러오는 예이다.
 *  Math.max()를 사용할 때 const math = new Math() 를 하지는 않는다.
 */
```

## 4. Encapsulation이란?

객체지향의 원칙 중 하나로 특정 키워드를 사용함으로서 정의한 클래스 외부에서 클래스 내부의 메서드나 멤버변수, 프로퍼티의 접근을 막기 위해 사용한다. 캡슐화라고도 부르며, 클래스 내부의 정보를 은닉하기 보호하기 위해 사용한다. 캡슐화를 위한 키워드는 `public`, `private`, `protected`가 있다.

- public : 생략 시 기본적으로 public, 외부에서 접근 가능
- private : 지정하면 외부에서는 접근할 수 없다.
- protected : 외부에서는 접근할 수 없지만 해당 클래스르 상속한 자식 클래스에서는 접근이 가능하다.

### 4-1. 예시

우리는 이전의 커피기계를 찍어내는 클래스를 만들고 있다. 멤버 변수로는 커피 원 샷을 만들기 위해서 필요한 양을 상수로 지정했고, 생성자 함수에 매개변수로 넣어주기 위해 우리가 가지고 있는 커피 콩의 양을 지정했다. 이 클래스 외부에서 샷을 만들기 위해 필요로 하는 커피콩의 양과 우리가 가지고 있는 커피 콩의 양을 임의로 조절한다면 위험하다. 가령 (6)의 `maker.coffeeBeans = -34`같은 값을 넣는다면 말도 안되는 일이 벌어질 수 있는 것이다. 그렇기 때문에 클래스 외부에서는 접근이 불가능 하도록, (1), (2)의 코드를 `private` 으로 선언한 것이다.

```typescript
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

class CoffeeMaker {
  private static BEANS_GRAMM_PER_SHOT: number = 7; // (1)
  private coffeeBeans: number = 0; // (1)

  // contructor를 private로 설정 시 인스턴스를 만들어주는 static한 함수를 따로 만들어 놓아야한다.
  private constructor(coffeeBeans: number) { // (2)
    this.coffeeBeans = coffeeBeans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMaker { // (3)
    return new CoffeeMaker(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {           // (4)
  // 개발자가 beans를 0보다 작게 설정할 경우 error 메세지를 던져주기.
    if (beans < 0) {
      throw new Error('value for beans should be greater than 0');
    }
    this.coffeeBeans += beans;
  }

  makeCoffee(shots: number): CoffeeCup {
    if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
}

const maker = new CoffeeMaker(32);
const maker2 = CoffeeMaker.makeMachine(32);
maker.fillCoffeeBeans(10);
// 인스턴스의 coffeeBeans는 음수가 되면 안 된다. 커피 콩의 갯수가 음수는 말 이 안된다.
// 멤버 변수가 private으로 설정됐기 때문에 접근이 불가능하다.
--------------------------------------------------
CoffeeMaker.BEANS_GRAMM_PER_SHOT; // dangerous
maker.coffeeBeans = 3; // valid but dangerous
maker.coffeeBeans = -34; // invalid (6)
--------------------------------------------------
```

### 4-2. private으로 설정한 멤버 변수를 조작할 수 있는 메서드 생성

우리는 이제 캡슐화를 통해 클래스 내부에 있는 멤버변수를 외부로부터 안전하게 보호하고 있다. 캡슐화한 멤버 변수는 어떻게 조작을 해야할까? 클래스 내부에서 해당 멤버변수를 조작할 수 있는 메서드를 만들어주어야한다. 사용자는 오직 이 메서드를 통해서만 멤버 변수의 값을 조작할 수 있다. (4)의 코드를 살펴보자. `fillCoffeeBeans()` 내부에 사용자가 유효하지 않은 값을 넣었을 때 에러를 던져주는 로직을 추가해줄 수도 있다.

### 4-3. 생성자 함수는 왜 private으로 선언한 것인가?

우리는 이전 챕터에서 static을 활용하여 클래스 외부에서 생성자 함수를 사용하지 않고 인스턴스를 생성할 수 있다는 것을 알게 됐다. (2), (3)의 코드를 보자. 생성자 함수를 private하게 만들어서 외부에서 접근할 수 없게 만들고, 클래스 내부에 `makeMachine` 메서드를 통해서 인스턴스를 생성할 수 있게 유도하는 것이다. 이러한 방법을 팩토리 패턴이라고 한다. 팩토리 패턴은 객체를 생성하는 코드를 분리하여 결합도(의존성)을 낮추어 확장성을 증가시키고 코드 수정을 용이하게 하기 위한 패턴이다.

> 현재로서는 팩토리 패턴에 경험이 부족해 잘 와닿지 않는 내용입니다. 추후에 내용 보충하겠습니다.

<br>

### 5. Getter & Setter

- getter와 setter는 멤버 변수처럼 사용이 가능하다.
- 멤버 변수의 값을 변경하거나 설정할 때 조금 더 유연하게 사용이 가능하다.
- 유연하게 사용함과 동시에 프로퍼티 값을 원하는 대로 통제할 수 있다.
- 유저의 firstName과 lastName을 받아서 fullName을 만들어주는 User라는 클래스가 있다.

```tsx
class User {
  firstName: string;
  lastName: string;
  fullName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
}
const user = new User('Steve', 'Jobs');
console.log(user.fullName); // Steve Jobs
// 우리는 firstName을 다른 이름으로 바꾸고 싶다.
user.firstName = 'Hwimin';
// 하지만, 결과는 처음에 constructor에 넣은 'Steve Jobs'가 출력된다.
// constructor에 최초에 지정된 값이 그대로 출력되고 있다.
console.log(user.fullName); // Steve Jobs
```

#### 5-1. Getter의 등장

- Getter는 멤버 변수의 값을 받아서 새로운 값을 출력할 때 유용한다.

```tsx
class User {
  firstName: string;
  lastName: string;
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
const user = new User('Steve', 'Jobs');
console.log(user.fullName); // Steve Jobs
user.firstName = 'Hwimin';
console.log(user.fullName); // Hwimin Jobs
```

#### 5-2. 멤버 변수를 private으로 만들면서 코드량 줄이기

- code 1과 code2는 결과 값이 같다. 멤버 변수를 생성자 함수에서 받을 필요 없다.
- 단, code2의 private과 같은 접근지정자를 붙여줘야한다. (public도 가능)

---

- code 1

```tsx
class User {
  private firstName: string;
  private lastName: string;
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

- code2

```tsx
class User {
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  constructor(private firstName: string, private lastName: string) {}
}
```

### 5-3. set을 이용해서 안전성 높히기

```tsx
class User {
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  private internalAge = 4;
  get age(): number {
    return this.internalAge;
  }
  set age(num: number) {
    if (num < 0) {
      throw new Error('age should be greater than 0');
    }
    this.internalAge = num;
  }
  constructor(private firstName: string, private lastName: string) {}
}
const user = new User('Steve', 'Jobs');
user.age = 6;
// user.age에 값을 할당할 시 setter 함수에서 포함하고 있는 로직이 실행된다.
// 만약 user.age에 0보다 작은 값을 할당하면 'age should be greater than 0' 이라는 에러가 던져진다.
```

## 6. Interface를 이용해 추상화 이해하기

- 추상화라는것은, 어떤 실체로부터 공통적인 부분이나 관심 있는 특성들만 한곳에 모은것을 의미한다. 예를들어서, 지구를 본따 만든 지구본을 예로 들 수 있다. 지구본은 실제 지구로 부터 관심 있는 특성들(대륙의 위치, 위도,경도)만 뽑아서 만든것이다. 지구를 추상화해서 지구본을 만들었다.

- 객체지향에서의 추상화는 어떤 하위클래스들에 존재하는 공통적인 메소드를 인터페이스로 정의하는것을 예로 들 수 있다.

출처: https://simsimjae.tistory.com/293 [104%]

- 아래의 클래스에서 makeCoffee 함수는 내부적으로 여러 함수를 호출한다.
- 그러기 위해서 우리는 클래스 내부의 여러가지 메서드를 만들었다. 하지만 사용자는 makeCoffee만 사용하면 되고, 그 내부에 포함하고 있는 grindBeans(), preHeat(), extract()는 존재조차 모르게 하고 싶다면 어떻게 해야할까?
- 일단, 접근 지정자인 private을 사용해서 위의 메서드를 private으로 지정할 수 있다.
- 또한, interface를 이용해서 내가 지정한 메서드에만 접근가능하게 만들어줄 수도 있다.

### 6-1. Interface 사용법

- interface CoffeeMake를 만든다. (1)
- 클래스가 해당 interface를 수행한다는 의미의 implements와 원하는 interface를 입력한다. (2)
- 테스트용으로 하나의 인스턴스는 타입을 CoffeeMachine으로 주고, 나머지 하나는 interface인 CoffeeMaker로 준다. (3), (4)
- CoffeeMachine은 해당 클래스가 가지고 있는 모든 메서드에 접근이 가능하지만, interface를 사용한 maker2는 오직 makeCoffee 메소드에만 접근이 가능하다.
  ![](https://images.velog.io/images/gnlals1/post/abb520ee-f4eb-49c4-9ba1-f8ac9464b0b2/image.png)

```tsx
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

interface CoffeeMaker {
  makeCoffee(shots: number): CoffeeCup; // (1)
}

class CoffeeMachine implements CoffeeMaker {
  // (2)
  private static BEANS_GRAMM_PER_SHOT: number = 7;
  private coffeeBeans: number = 0;

  constructor(coffeeBeans: number) {
    this.coffeeBeans = coffeeBeans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMachine {
    return new CoffeeMachine(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error('value for beans should be greater than 0');
    }
    this.coffeeBeans += beans;
  }

  grindBeans(shots) {
    console.log(`grinding beans for ${shots}`);
    if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
  }

  preheat(): void {
    console.log('heating up...');
  }

  extract(shots: number): CoffeeCup {
    console.log(`Pulling ${shots} shots...`);
    return {
      shots,
      hasMilk: false,
    };
  }

  makeCoffee(shots: number): CoffeeCup {
    this.grindBeans(shots);
    this.preheat();
    return this.extract(shots);
  }
}

const maker: CoffeeMachine = new CoffeeMachine(32); // (3)
maker.fillCoffeeBeans(10);
maker.makeCoffee(2);

const maker2: CoffeeMaker = new CoffeeMachine(32); // (4)
maker2.fillCoffeeBenas(32);
maker2.makeCoffee(2);
```

## reference

https://mong-blog.tistory.com/entry/%ED%81%B4%EB%9E%98%EC%8A%A4class%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
