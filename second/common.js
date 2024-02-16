// localStorage에서 데이터를 불러오는 함수
const loadDataFromLocalStorage = () => {
	const data = localStorage.getItem("userData");
	return data ? JSON.parse(data) : [];
};

// localStorage에 데이터를 저장하는 함수
const saveDataToLocalStorage = (data) => {
	localStorage.setItem("userData", JSON.stringify(data));
};

const writeBoard = document.querySelector("#write");
const btnSubmit = document.querySelector("#btn-write");
const listBoard = document.querySelector(".list-board");

// UI에 항목을 추가하는 함수
const addListItem = (id, content) => {
	const newItem = document.createElement("li");
	newItem.classList.add(
		"block",
		"hover:bg-gray-50",
		"dark:hover:bg-gray-900"
	);

	const link = document.createElement("a");
	link.classList.add("block");
	link.setAttribute("href", "#"); // 예시로 # 추가, 필요에 따라 조정 가능

	const itemContent = `
      <div class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <p class="text-gray-700 text-md dark:text-white md:truncate">${content}</p>
          <div class="flex flex-shrink-0 ml-2">
            <p
              class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
            >
              On-Track
            </p>
          </div>
        </div>
        <div class="mt-2 sm:flex sm:justify-between">
          <div class="sm:flex">
            <p class="flex items-center text-gray-500 text-sm">
              ${new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    `;

	link.innerHTML = itemContent;
	newItem.appendChild(link);
	newItem.setAttribute("data-id", id);

	newItem.addEventListener("click", (event) => {
		event.preventDefault(); // Prevent link navigation

		const userWantsToEdit = confirm(
			`선택한 내용: ${content}\n수정하시겠습니까?\n수정하려면 '확인'을, 삭제하려면 '취소'를 누르세요.`
		);
		if (userWantsToEdit) {
			const updatedContent = prompt("수정할 내용을 입력하세요:", content);
			if (updatedContent !== null) {
				// Update the item content in UI
				link.querySelector("p.text-gray-700").innerText =
					updatedContent;
				// Update the data in localStorage
				updateData(id, updatedContent);
			}
		} else {
			// Delete the item from UI and localStorage
			newItem.remove();
			deleteData(id);
		}
	});

	listBoard.appendChild(newItem);
};

// 새로운 내용을 추가하는 함수
const submitNewContent = () => {
	const newContent = writeBoard.value.trim();
	if (!newContent) return;

	const data = loadDataFromLocalStorage();
	const newId =
		data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
	const newItem = { id: newId, content: newContent };
	data.push(newItem);
	saveDataToLocalStorage(data);

	addListItem(newId, newContent);
	writeBoard.value = "";
};

// 데이터를 수정하는 함수
const updateData = (id, updatedContent) => {
	const data = loadDataFromLocalStorage();
	const index = data.findIndex((item) => item.id === id);
	if (index > -1) {
		data[index].content = updatedContent;
		saveDataToLocalStorage(data);
	}
};

// 데이터를 삭제하는 함수
const deleteData = (id) => {
	let data = loadDataFromLocalStorage();
	data = data.filter((item) => item.id !== id);
	saveDataToLocalStorage(data);
};

btnSubmit.addEventListener("click", submitNewContent);

// 페이지 로드 시 localStorage에서 데이터를 불러와 UI에 표시
document.addEventListener("DOMContentLoaded", () => {
	const data = loadDataFromLocalStorage();
	data.forEach((item) => addListItem(item.id, item.content));
});
