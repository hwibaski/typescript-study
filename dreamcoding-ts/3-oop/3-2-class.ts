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

	// class를 가지고 obejct instance를 만들 때 항상 호출이 된다.
	constructor(coffeeBeans: number) {
		// constructor에서 인수를 받아서 멤버변수의 coffeeBeans에 할당한다.
		this.coffeeBeans = coffeeBeans;
	}

	static makeMachine(coffeeBeans: number): CoffeeMaker {
		return new CoffeeMaker(coffeeBeans);
	}

	makeCoffee(shots: number): CoffeeCup {
		// class 내에서 멤버변수에 접근하기 위해서는 this를 붙혀줘야한다.
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

// new 연산자는 CoffeeMaker의 인스턴스를 생성한다.
// CoffeeMaker 뒤의 '()' 는 생성자 함수를 실행한다.
const maker = new CoffeeMaker(32);
console.log(maker); // CoffeeMaker { coffeeBeans: 32 }
const maker2 = new CoffeeMaker(17);
console.log(maker2); // CoffeeMaker { coffeeBeans: 17 }
const maker3 = CoffeeMaker.makeMachine(10);
console.log(maker3); // CoffeeMaker { coffeeBeans: 10 }
console.log(CoffeeMaker.BEANS_GRAMM_PER_SHOT); // 7

/**
 * Math.max()
 * Math.min() 등이 static으로 선언된 메소드들을 불러오는 예이다.
 */
