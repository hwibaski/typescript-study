{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public : 생략 시 기본적으로 public, 외부에서 접근 가능
  // private : 지정하면 외부에서는 접근할 수 없다.
  // protected : 외부에서는 접근할 수 없지만 해당 클래스르 상속한 자식 클래스에서는 접근이 가능하다.

  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // contructor를 private로 설정 시 인스턴스를 만들어주는 static한 함수를 따로 만들어 놓아야한다.
    //
    constructor(coffeeBeans: number) {
      // es6와 다르게 멤버 변수로 선언이 되어 있어야만 coffeeBeans에 접근할 수 있다.
      this.coffeeBeans = coffeeBeans;
    }
    // 우리는 일전에 static을 사용해서
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
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
  // CoffeeMaker.BEANS_GRAMM_PER_SHOT;
  CoffeeMaker.Beans_GRAMM_PER_SHOT;
  maker.coffeeBeans = 3; // valid but dangerous
  maker.coffeeBeans = -34; // invalid

  class User {
    // private firstName: string;
    // private lastName: string;
    // fullName: string;
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
    constructor(private firstName: string, private lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      // this.fullName = `${firstName} ${lastName}`;
    }
  }
  const user = new User('Steve', 'Jobs');
  console.log(user.firstName);
  // console.log(user.internalAge)
  console.log(user.age);
  console.log(user.fullName); // 'Steve Jobs'
  // user.firstName = 'Ellie';
  console.log(user.fullName); // 'Steve Jobs'
}
