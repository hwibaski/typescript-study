/**
 * Type Inference
 * 최초에 변수를 초기화할 때 문자열을 지정한다면,
 * typescript가 그 변수의 타입을 문자열로 추론한다.
 * 그 이후 다른 문자열로는 할당이 가능하지만, 그 외의 타입으로 할당이 불가능하다
 */
let text = 'hello';
text = 'hi';
// text = 1; error
// text = {}; error

// 함수의 매개변수에는 자동으로 any로 추론한다. 고로 좋지 않다. -> type을 지정해주자
function print(message) {
	console.log(message);
}
print('hello');
print(1);

// default parameter를 지정해줄 경우 지정된 parameter의 타입으로 지속적으로 추론한다.
function printStr(message = 'hi') {
	console.log(message);
}
printStr('hello');
// printStr(1); // error

// 들어오게될 매개변수의 타입이 둘 다 number type이므로 return의 타입도 number 타입일 것이라고 추론한다.
function add(x: number, y: number) {
	return x + y;
}

// 위의 add 함수는 return 값을 number 타입으로 추론했다.
// 그 함수의 리턴 값을 변수에 담는다면, 그 변수 또한 number 타입이라고 추론한다.
// 추론의 추론
const result = add(1, 2);

/**
 * 타입 추론 간편하고 좋은것인가?
 * 개인의 생각마다 다르겠지만, 웬만하면 타입을 지정해주는 것이 정확하고 안전하다.
 * 함수의 void라면 그나마 생략 가능.
 */
