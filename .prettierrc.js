/**
 * @name: .prettierrc.js
 * @version: 1.0
 */

const config = {
	/**
	 * @template: printWidth: <int>
	 * @description: 코드 한 줄의 최대 길이
	 */
	printWidth: 100,

	/**
	 * @template: tabWidth: <int>
	 * @description: 들여쓰기 너비(탭을 쓸 경우 몇 칸)
	 */
	tabWidth: 1,

	/**
	 * @template: useTabs: <bool>
	 * @description: 탭 사용 여부(true: 탭, false: 스페이스)
	 */
	useTabs: true,

	/**
	 * @template: semi: <bool>
	 * @description: 문장 끝 세미콜론 출력 여부
	 */
	semi: true,

	/**
	 * @template: singleQuote: <bool>
	 * @description: 문자열을 작은따옴표(')로 사용할지 여부
	 */
	singleQuote: true,

	/**
	 * @template: tsxSingleQuote: <bool>
	 * @description: TSX에서 작은따옴표 사용 여부
	 */
	tsxSingleQuote: true,

	/**
	 * @template: trailingComma: "<es5|none|all>"
	 * @description: 후행 쉼표 사용 여부
	 */
	trailingComma: 'all',

	/**
	 * @template: jsxBracketSameLine: <bool>
	 * @description: JSX 닫는 꺾쇠(>)를 같은 줄에 둘지 여부
	 */
	jsxBracketSameLine: true,

	/**
	 * @template: bracketSpacing: <bool>
	 * @description: 객체 리터럴 {} 사이 공백 여부
	 */
	bracketSpacing: true,

	/**
	 * @template: arrowParens: "<always|avoid>"
	 * @description: 화살표 함수 매개변수 괄호 사용 여부
	 */
	arrowParens: 'always',
};

export default config;
