import React, { useState } from "react";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import { calculate } from "../../utils/calculatorLogic";

function Calculator() {
	const [displayValue, setDisplayValue] = useState("");

	const updateDisplay = (value) => {
		if (value === "=") {
			// '=' 버튼을 누를 경우, 계산 로직 실행
			const result = calculate(displayValue);
			setDisplayValue(result);
		} else if (value === "C") {
			// 'C' 버튼을 누를 경우, 디스플레이 값을 초기화
			setDisplayValue("");
		} else {
			// 그 외의 경우, 디스플레이에 값 추가
			setDisplayValue(displayValue + value);
		}
	};

	return (
		<div className="bg-black min-h-screen flex items-center justify-center">
			<div className="p-1 border-2 border-solid border-pink-700 bg-black w-80 rounded-lg shadow-xl">
				<Display value={displayValue} />
				<Keypad updateDisplay={updateDisplay} />
			</div>
		</div>
	);
}

export default Calculator;
