{
	/**
	 *  Type Assertions : not good
	 *  compile시에만 에러가 나기 때문에 위험성을 가지고 있다.
	 */

	function jsStrFUnc(): any {
		return 2;
	}
	const result = jsStrFUnc();
	console.log(result);
	console.log((result as string).length);
	console.log((<string>result).length);

	const wrong: any = 5;
	console.log((wrong as Array<number>).push(2));

	function findNumbers(): number[] | undefined {
		return undefined;
	}

	const numbers = findNumbers()!;
	numbers.push(2);

	const button = document.querySelector('.class');
	if (button) {
		button.nodeValue;
	}
}
