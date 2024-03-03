import React from "react";
import Button from "../Button/Button";

function Keypad({ updateDisplay }) {
	const createDigits = () => {
		const digits = [];
		// 숫자 버튼 생성
		for (let i = 1; i < 10; i++) {
			digits.push(
				<Button
					key={i}
					label={String(i)}
					extraClasses="bg-pink-700 text-white"
					onClick={() => updateDisplay(String(i))}
				/>
			);
		}
		// 0 버튼을 추가 (col-span-2 사용)
		digits.push(
			<Button
				key="0"
				label="0"
				extraClasses="bg-pink-700 text-white col-span-2"
				onClick={() => updateDisplay("0")}
			/>
		);
		// 소수점 버튼을 추가
		digits.push(
			<Button
				key="."
				label="."
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay(".")}
			/>
		);
		return digits;
	};

	return (
		<div className="grid grid-cols-4 gap-1 mt-1">
			<Button
				label="C"
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay("C")}
			/>
			<Button
				label="/"
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay("/")}
			/>
			<Button
				label="MINSANG"
				extraClasses="bg-pink-700 text-white col-span-2"
			/>
			<Button
				label="7"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("7")}
			/>
			<Button
				label="8"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("8")}
			/>
			<Button
				label="9"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("9")}
			/>
			<Button
				label="*"
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay("*")}
			/>
			<Button
				label="4"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("4")}
			/>
			<Button
				label="5"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("5")}
			/>
			<Button
				label="6"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("6")}
			/>
			<Button
				label="-"
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay("-")}
			/>
			<Button
				label="1"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("1")}
			/>
			<Button
				label="2"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("2")}
			/>
			<Button
				label="3"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("3")}
			/>
			<Button
				label="+"
				extraClasses="bg-pink-700 text-white"
				onClick={() => updateDisplay("+")}
			/>
			<Button
				label="."
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay(".")}
			/>
			<Button
				label="0"
				extraClasses="bg-gray-700 text-white"
				onClick={() => updateDisplay("0")}
			/>
			<Button
				label="="
				extraClasses="bg-pink-700 text-white col-span-2"
				onClick={() => updateDisplay("=")}
			/>
		</div>
	);
}

export default Keypad;
