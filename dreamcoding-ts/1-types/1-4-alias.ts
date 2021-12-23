{
	/**
	 * Type Aliases
	 * type을 내가 지정한 이름으로 사용할 수 있다.
	 */
	// Text 라는 것은 문자열을 의미한다.
	type Text = string;
	const name: string = 'hwimin';
	const alphabet: Text = 'a';
	type Num = number;
	type Student = {
		name: string;
		age: number;
	};
	// const student: Student = {
	//   animal: 'dog' // error 발생
	// }
	const student: Student = {
		name: 'hwimin', // error 발생
		age: 10,
	};

	/**
	 * String Literal Types
	 * type 지정한 값만 할당할 수 있다.
	 */
	type Name = 'name';
	let myName: Name;
	myName = 'name';
	// myName = 'hwimin' error
	type JSON = 'json';
	const json: JSON = 'json';

	type Bool = true;
	const isCat: Bool = true;
	// const isCat: Bool = false; // error
}
