/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // React 컴포넌트 파일을 포함
		"./public/index.html", // public 디렉토리의 HTML 파일도 포함할 수 있습니다.
	],
	theme: {
		extend: {
			minHeight: {
				120: "120px", // 120px 높이를 추가
			},
		},
	},
	plugins: [],
};
