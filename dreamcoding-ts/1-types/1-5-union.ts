{
	/**
	 *  Union Types: OR
	 *  string literal type과 조합하면 활용도가 높다.
	 */
	type Direction = 'left' | 'right' | 'up' | 'down';
	function move(direction: Direction) {
		console.log(direction);
	}
	move('right');
	move('left');
	// move('abc') // error

	type TileSize = 8 | 16 | 32;
	const title: TileSize = 16;

	// function: login -> success or fail
	type SuccessState = {
		response: {
			body: string;
		};
	};
	type FailState = {
		reason: string;
	};
	type LoginState = SuccessState | FailState;

	// function login(): SuccessState | FailState {
	// 	return {
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
		// state.response.body -> 이런 식으로 접근이 불가하다.
		// Union Type이기 때문에 state 객체 내에 response가 있는지 없는지 알 수 없다.
		if ('response' in state) {
			console.log(`🚀 ${state.response.body}`);
		} else {
			// console.log(${state.response}) ->  문법을 이해하는건가? state.response에 접근이 불가하다.
			console.log(`😇 ${state.reason}`);
		}
	}
}
