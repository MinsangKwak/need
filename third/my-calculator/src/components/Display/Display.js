import React from "react";

function Display({ value }) {
	return (
		<div className="border-2 border-solid border-pink-700 flex items-center justify-end text-white text-4xl overflow-hidden px-6 text-right min-h-120">
			{value}
		</div>
	);
}

export default Display;
