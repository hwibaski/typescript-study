/**
 * Let's make a calculator 🧮
 */
type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
const calculate = function (command: Command, num1: number, num2: number): number {
	// if (command === 'add') return num1 + num2;
	// if (command === 'substract') return num1 - num2;
	// if (command === 'multiply') return num1 * num2;
	// if (command === 'divide') return num1 / num2;
	// if (command === 'remainder') return num1 % num2;
	//
	// if (command === 'add') {
	// 	return num1 + num2;
	// } else if (command === 'substract') {
	// 	return num1 - num2;
	// } else if (command === 'multiply') {
	// 	return num1 * num2;
	// } else if (command === 'divide') {
	// 	return num1 / num2;
	// } else if (command === 'remainder') {
	// 	return num1 % num2;
	// } else {
	// 	throw Error('unknown command');
	// }
	//
	const test = {
		add: num1 + num2,
		substract: num1 - num2,
		multiply: num1 * num2,
		divide: num1 / num2,
		remainder: num1 % num2,
	};
	return test[command];
	//
	// switch (command) {
	// 	case 'add':
	// 		return num1 + num2;
	// 	case 'substract':
	// 		return num1 - num2;
	// 	case 'multiply':
	// 		return num1 * num2;
	// 	case 'divide':
	// 		return num1 / num2;
	// 	case 'remainder':
	// 		return num1 % num2;
	// 	default:
	// 		throw Error('unknown command');
	// }
};
console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 1, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
