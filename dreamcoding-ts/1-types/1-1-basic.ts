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
	let name: undefined; // π©
	// number or undefined
	let age: number | undefined;
	age = undefined;
	age = 1;
	const find = function (): number | undefined {
		return 1 || undefined;
	};

	// null: explicitly empty value
	let person: null; // π©
	let person2: string | null; // π©
	person = null;
	person2 = 'hello';

	// unknown π©
	let notSure: unknown = 0;
	notSure = 'he';
	notSure = true;

	// any π©
	let anything: any = 0;
	anything = 'hello';
	anything = 1;

	// void : μλ¬΄κ²λ λ¦¬ν΄νμ§ μλλ€, λ€λ§ λ¦¬ν΄λ¬Έμ νλ€.
	function print(): void {
		console.log('hello');
		return undefined;
	}

	let unusable: void = undefined; // π©

	// never : return μμ²΄λ₯Ό νμ§ μλλ€.
	function throwError(message: string): never {
		// message => server (log)
		// 1
		throw new Error(message);
		// 2
		while (true) {
			// ...
		}
	}
	let neverEnding: never; // π©

	// object
	let obj: object; // π©
	function acceptSomeObject(obj: object) {} // π© -> μ΄λ ν κ°μ²΄(λ°°μ΄)μ΄λ  λ°μλ€μ μ μλ€. λλ¬΄ κ΄λ²μ νλ€...
	acceptSomeObject({ name: 'hwimin' });
	acceptSomeObject({ animal: 'dog' });
}
