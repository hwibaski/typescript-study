{
	// Array
	// version.1
	const alphabet: string[] = ['a', 'b'];
	// version.2
	const num: Array<number> = [1, 2, 3];
	// readonly: 받은 매개변수를 수정할 수 없다.
	// readonly를 사용하려면  type[]의 형태로 지정해야한다.
	function printArray(alphabet: readonly string[]) {}

	// Tuple : 서로 다른 타입의 데이터를 담을 수 있다.
	let student: [string, number];
	student = ['name', 123];
	student[0]; // name
	student[1]; // 123

	// tuple의 사용이 권장되지 않는다.
	// why? student[0] -> 첫 번째 인덱스에 어떤 값이 있는지 파악하기가 어렵다.
	// tuple을 사용할만한 곳에는 interface, type alias, class로 대체해서 사용한다.
	// array 구조분해로 가독성을 높힐 수는 있지만, 굳이? React 훅의 useState()가 tuple
	// 동적으로 관리해야하는 것이 있는데 interface, type alias, class로 관리하기 어렵다면 tuple
	const [name, age] = student;
}
