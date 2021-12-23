{
	/**
	 * Enum
	 * 관련된 상수들을 한 곳에 모아서 관리할 수 있는 타입
	 */
	// JavaScript에서의 상수
	const MAX_NUM = 6;
	const MAX_STUDENTS_PER_CLASS = 10;
	const MONDAY = 0;
	const TUESDAY = 1;
	const WEDNESDAY = 2;
	const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
	const dayOfToday = DAYS_ENUM.MONDAY;

	// TypeScript
	enum Days {
		Monday, // 0
		Tuesday, // 1
		Wednesday, // 2
		Thursday, // 3
		Friday, // 4
		Saturday, // 5
		Sunday = 'hello', // 6
	}
	// enum에 값을 지정하지 않으면 자동적으로 0부터 차례대로 숫자를 할당함
	console.log(Days.Monday); // 0

	let day: Days = Days.Friday; // 4

	// 내가 원하는 숫자로 지정하고 싶다면?
	// enum Days {
	// 	Monday = 1, // 이 이후의 값들은 1씩 순차적으로 증가해서 할당됨
	// 	Tuesday,
	// 	Wednesday,
	// 	Thursday,
	// 	Friday,
	// 	Saturday,
	// 	Sunday,
	// }
	// 내가 원하는 문자열로 지정하고 싶다면?
	// enum Days {
	// 	Monday = 'monday', // 문자열은 그 다음의 값을 유추하기 어렵기 때문에 수동으로 값을 입력해줘야한다.
	// 	Tuesday = 'tuesday',
	// 	Wednesday = 'wednesday',
	// 	Thursday = 'thursday',
	// 	Friday = 'friday',
	// 	Saturday = 'saturday',
	// 	Sunday = 'sunday',
	// }

	/**
	 * TypeScript에서 enum을 사용하는 것은 그리 추천되지 않는다.
	 * why?
	 * let day: Days = Days.saturday
	 * day 변수는 Days(enum)타입을 가질 수 있는데 이 때,
	 * enum이 가지고 있는 타입을 임의로 지정할 수 있다.
	 * day = 1; -> enum내에 Tuesday가 1이 될 수 있으므로 1이 그냥 할당이 가능해진다.
	 * 문제는 enum타입이 가지고 있지 않는 숫자도 할당이 가능하다.
	 * day = 10; -> 에러가 나지 않는다. 컴파일도 문제 없이 생성된다.
	 * enum 타입 말고 union type으로 정의가 가능하다.
	 */
	type DaysOfWeek = 'Monday' | 'Tuesday' | 'wednesday';
	let dayOfWeek: DaysOfWeek = 'Monday';
}
