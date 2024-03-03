import React from "react";

function Button({ label, extraClasses, onClick }) {
	return (
		<button
			className={`text-2xl font-semibold py-6 focus:outline-none ${extraClasses}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

export default Button;
