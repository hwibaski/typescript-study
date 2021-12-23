{
	// function: login -> success or fail
	type SuccessState = {
		result: 'success';
		response: {
			body: string;
		};
	};
	type FailState = {
		result: 'fail';
		reason: string;
	};
	type LoginState = SuccessState | FailState;

	// function login(): SuccessState | FailState {
	// 	return {
	// 		result: 'success',
	// 		response: {
	// 			body: 'logged in!',
	// 		},
	// 	};
	// }

	// 위와 같이 union type을 바로 적어주는 것도 좋지만
	// union type 또한 따로 정의해주는 것이 좋다.
	function login(id: string, password: string): LoginState {
		// Promise<LoginState> 실제 프로젝트에서는 프로미스겠죠?
		return {
			result: 'success',
			response: {
				body: 'logged in!',
			},
		};
	}

	// printLoginState(state: LoginState)
	// success -> 🚀 body
	// fail -> 😇 reason
	// function printLoginState(state: LoginState): LoginState {
	// 	return (
	// 		{
	// 			response: {
	// 				body: 'success',
	// 			},
	// 		} || {
	// 			reason: 'reason why login failed',
	// 		}
	// 	);
	// }
	function printLoginState(state: LoginState) {
		state.result; // success or fail
		if (state.result === 'success') {
			console.log(`🚀 ${state.response.body}`);
		} else {
			console.log(`😇 ${state.reason}`);
		}
	}
	/**
	 * 1-5 와 1-6에 같은 이름의 함수가 존재한다. 이 때 한 쪽은 에러를 띄운다.. 굳..
	 */
}
