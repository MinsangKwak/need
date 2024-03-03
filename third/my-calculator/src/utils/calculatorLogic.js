export const calculate = (currentExpression) => {
	try {
		const result = eval(currentExpression); // 주의: eval()은 보안 취약점을 가질 수 있으므로 실제 프로젝트에서는 사용을 자제해야 합니다.
		return String(result);
	} catch (error) {
		return "Error";
	}
};
