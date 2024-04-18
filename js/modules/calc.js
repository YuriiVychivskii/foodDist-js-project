function calc() {
	const totalC = document.querySelector(".calculating__result span");

	let sex, height, weight, age, ratio;

	function initializeStaticLocalData(key, defValue) {
		if (localStorage.getItem(key)) {
			window[key] = localStorage.getItem(key);
		} else {
			localStorage.setItem(key, defValue);
			window[key] = defValue;
		}
	}
	initializeStaticLocalData("sex", "female");
	initializeStaticLocalData("ratio", 1.375);

	function initializeDynamicLocalData(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (
				elem.getAttribute("id") === localStorage.getItem("sex") ||
				elem.getAttribute("data-ratio") === localStorage.getItem("ratio")
			) {
				elem.classList.add(activeClass);
			}
		});
	}
	initializeDynamicLocalData("#gender div", "calculating__choose-item_active");
	initializeDynamicLocalData(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	calcTotal();

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			totalC.textContent = " _________ ";
			return;
		} else {
			if (sex === "male") {
				totalC.textContent = Math.round(
					(88.36 + 13.4 * weight + 3.1 * height - 4.3 * age) * ratio
				);
				return;
			} else {
				totalC.textContent = Math.round(
					(447.6 + 9.2 * weight + 4.8 * height - 5.7 * age) * ratio
				);
			}
		}
	}

	function getStaticInformapion(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			elem.addEventListener("click", e => {
				let target = e.target;
				if (target.getAttribute("data-ratio")) {
					ratio = target.getAttribute("data-ratio");
					localStorage.setItem("ratio", ratio);
				} else {
					sex = target.getAttribute("id");
					localStorage.setItem("sex", sex);
				}
				elements.forEach(element => element.classList.remove(activeClass));
				target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInformapion("#gender div", "calculating__choose-item_active");
	getStaticInformapion(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	function getDynamicInformapion(selector) {
		document.querySelector(selector).addEventListener("input", e => {
			let target = e.target;
			switch (target.getAttribute("id")) {
				case "height":
					height = +target.value;
					break;
				case "weight":
					weight = +target.value;
					break;
				case "age":
					age = +target.value;
					break;
			}

			calcTotal();
		});
	}
	getDynamicInformapion(".calculating__choose_medium");
}

export default calc;
