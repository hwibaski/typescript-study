/**
 * Let's make a game 🕹
 */
type Position = { x: number; y: number };
const position: Position = { x: 0, y: 0 };
const move = function (command: 'up' | 'down' | 'left' | 'right') {
	if (command === 'up') {
		position.y++;
	}
	if (command === 'down') {
		position.y--;
	}
	if (command === 'left') {
		position.x--;
	}
	if (command === 'right') {
		position.x++;
	}

	switch (command) {
		case 'up':
			position.y += 1;
			break;
		case 'down':
			position.y -= 1;
			break;
		case 'left':
			position.x -= 1;
			break;
		case 'right':
			position.x += 1;
			break;
		default:
			throw new Error(`unknown command: ${command}`);
	}
};

console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}
