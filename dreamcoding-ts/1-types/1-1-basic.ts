{
	/**
	 * JavaScript
	 * Primitive: number, string, boolean, bigint, symbol, null, undefined
	 * Obejct: function, array...
	 */

	// number
	const num: number = 6;

	// string
	const str: string = 'hello';

	// boolean
	const boal: boolean = false;

	// undefined
	let name: undefined; // 💩
	// number or undefined
	let age: number | undefined;
	age = undefined;
	age = 1;
	const find = function (): number | undefined {
		return 1 || undefined;
	};

	// null: explicitly empty value
	let person: null; // 💩
	let person2: string | null; // 💩
	person = null;
	person2 = 'hello';

	// unknown 💩
	let notSure: unknown = 0;
	notSure = 'he';
	notSure = true;

	// any 💩
	let anything: any = 0;
	anything = 'hello';
	anything = 1;

	// void : 아무것도 리턴하지 않는다, 다만 리턴문은 한다.
	function print(): void {
		console.log('hello');
		return undefined;
	}

	let unusable: void = undefined; // 💩

	// never : return 자체를 하지 않는다.
	function throwError(message: string): never {
		// message => server (log)
		// 1
		throw new Error(message);
		// 2
		while (true) {
			// ...
		}
	}
	let neverEnding: never; // 💩

	// object
	let obj: object; // 💩
	function acceptSomeObject(obj: object) {} // 💩 -> 어떠한 객체(배열)이든 받아들을 수 있다. 너무 광범위 하다...
	acceptSomeObject({ name: 'hwimin' });
	acceptSomeObject({ animal: 'dog' });
}
