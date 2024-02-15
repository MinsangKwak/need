// common.js
const months = [
	"03월",
	"04월",
	"05월",
	"06월",
	"07월",
	"08월",
	"09월",
	"10월",
	"11월",
	"12월",
	"01월",
	"02월",
];
const dataValues = [
	398000, 300000, 1000000, 398000, 700000, 998000, 398000, 700000, 900000,
	700000, 100000, 998000,
];

const customTooltip = document.getElementById("custom-tooltip");

function showCustomTooltip(x, y, content) {
	customTooltip.innerHTML = content;
	customTooltip.style.left = `${x}px`;
	customTooltip.style.top = `${y}px`;
	customTooltip.style.display = "inline-flex";
	customTooltip.style.transform = "translate(-50% , -40px)"; // Adjust the position to show above the bar
}

function hideCustomTooltip() {
	customTooltip.style.display = "none";
	// customTooltip.style.display = 'block';
}

// 차트 인스턴스를 저장할 배열을 선언합니다.
const chartInstances = [];

function createChartSlide(months, dataValues, slideIndex) {
	const containerPaddingTop = 0; // 컨테이너 상단 패딩값 100 임의 추가, 실제로는 스타일에서 이 값을 동적으로 얻을 수도 있습니다.

	const slide = document.createElement("div");
	slide.className = "swiper-slide";
	const canvas = document.createElement("canvas");
	canvas.id = `myChart-${slideIndex}`;
	slide.appendChild(canvas);
	document.querySelector(".swiper-wrapper").appendChild(slide);

	const ctx = canvas.getContext("2d");
	const chart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: months,
			datasets: [
				{
					data: dataValues,
					backgroundColor: "#ebebeb",
					borderColor: "#ebebeb",
					borderWidth: 1,
					borderRadius: 12, // 바의 둥근 모서리 적용
				},
			],
		},
		options: {
			layout: {
				padding: {
					top: 50, // 차트 상단에 100px의 여백 추가
				},
			},
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: true, // x축을 표시
					grid: {
						display: false, // x축의 그리드 라인을 숨깁니다.
					},
					ticks: {
						autoSkip: false, // 모든 x축 라벨을 표시
						maxRotation: 0, // 라벨 회전 방지
						// minRotation: 0,
						color: "#222222", // 라벨 색상 변경
						font: {
							size: 14, // 폰트 크기 설정
							family: "Arial", // 폰트 패밀리 설정
							style: "bold", // 폰트 스타일 설정 (normal, italic, bold 등)
						},
						// 추가적으로 라벨 포맷을 변경하고 싶다면, callback 함수를 사용할 수 있습니다.
						// callback: function(value, index, values) {
						//     // 여기서 value는 원래의 라벨 값입니다.
						//     // 예를 들어, value 값을 가공하여 "2023년 10월" 대신 "Oct 2023" 같은 형식으로 표시할 수 있습니다.
						//     // 이 예제에서는 단순히 원래의 값을 반환합니다.
						//     return value;
						// }
					},
				},
				y: {
					display: false, // y축을 숨김
					beginAtZero: true, // y축의 시작점을 0으로 설정
				},
			},
			plugins: {
				legend: { display: false },
				tooltip: { enabled: false },
			},
			onClick: (event) => {
				const points = chart.getElementsAtEventForMode(
					event,
					"nearest",
					{ intersect: true },
					false
				);
				const datasetIndex = 0; // 가정: 단일 데이터셋 차트
				const dataset = chart.data.datasets[datasetIndex];

				// 이전에 선택된 바의 색상을 초기화합니다.
				if (Array.isArray(dataset.backgroundColor)) {
					dataset.backgroundColor = dataset.backgroundColor.map(
						() => "#ebebeb"
					);
				} else {
					dataset.backgroundColor = dataValues.map(() => "#ebebeb");
				}

				if (points.length) {
					const firstPoint = points[0];
					const index = firstPoint.index;

					// 선택된 바의 색상을 변경합니다.
					dataset.backgroundColor[index] = "#206cfe";

					const label = months[index];
					const value = dataValues[index];
					const formattedValue = new Intl.NumberFormat("ko-KR", {
						style: "currency",
						currency: "KRW",
					}).format(value);
					const tooltipContent = `${formattedValue}`;
					const element = chart.getDatasetMeta(0).data[index];
					const tooltipX = element.x;
					const tooltipY = element.tooltipPosition().y + 60;

					showCustomTooltip(tooltipX, tooltipY, tooltipContent);

					chart.update(); // 차트 업데이트로 변경 사항 적용
				} else {
					hideCustomTooltip();
				}
			},
		},
	});

	chartInstances.push(chart);
}

// Divide the data into chunks of 6 and create a chart for each chunk
for (let i = 0; i < months.length; i += 6) {
	createChartSlide(months.slice(i, i + 6), dataValues.slice(i, i + 6), i / 6);
}

const swiper = new Swiper(".mySwiper", {
	pagination: {
		el: ".swiper-pagination",
		type: "bullets",
		clickable: true,
	},
	spaceBetween: 30,
	centeredSlides: true,
	on: {
		slideChange: function () {
			hideCustomTooltip(); // 슬라이드가 변경될 때 마다 툴팁을 숨깁니다.

			// 모든 차트의 색상을 초기화합니다.
			chartInstances.forEach((chart) => {
				const dataset = chart.data.datasets[0];
				if (Array.isArray(dataset.backgroundColor)) {
					dataset.backgroundColor = dataset.backgroundColor.map(
						() => "#ebebeb"
					);
				} else {
					dataset.backgroundColor = dataValues.map(() => "#ebebeb"); // 모든 바의 색상을 초기화합니다.
				}
				chart.update(); // 차트 업데이트로 변경 사항을 적용합니다.
			});
		},
	},
});
