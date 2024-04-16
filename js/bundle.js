/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

// Fields calculator

function calculator() {
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

module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

// Food Cards

function cards() {
	class FoodCard {
		constructor(
			src,
			alt,
			title,
			description,
			price,
			parentSelector,
			...classes
		) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.price = price;
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
			  <img src=${this.src} alt=${this.alt} />
			  <h3 class="menu__item-subtitle">${this.title}</h3>
			  <div class="menu__item-descr">
				  ${this.description}
			  </div>
			  <div class="menu__item-divider"></div>
			  <div class="menu__item-price">
				  <div class="menu__item-cost">Цена:</div>
				  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			  </div>
		  `;

			this.parent.append(element);
		}
	}

	const getResource = async url => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`${res} - ${res.status}`);
		}

		return await res.json();
	};

	getResource("http://localhost:3000/menu").then(data => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new FoodCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu .container"
			).render();
		});
	});

	// axios

	// axios.get("http://localhost:3000/menu").then(data => {
	// 	data.data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new FoodCard(
	// 			img,
	// 			altimg,
	// 			title,
	// 			descr,
	// 			price,
	// 			".menu .container"
	// 		).render();
	// 	});
	// });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
	// Forms

	const forms = document.querySelectorAll("form");

	const massage = {
		loading: "icons/form/spinner.svg",
		access: "Ваши данные отправлены! Ждите ответа...",
		failure: "Ой. Что-то пошло не так",
	};

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, json) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: json,
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", event => {
			event.preventDefault();

			const statusMassage = document.createElement("img");
			statusMassage.src = massage.loading;
			statusMassage.style.cssText = `
			  display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement("afterend", statusMassage);

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
				.then(data => {
					console.log(data);
					showThunksModal(massage.access);
					form.reset();
					statusMassage.remove();
				})
				.catch(() => {
					showThunksModal(massage.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThunksModal(massage) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		showModalWindow();

		const thunksModal = document.createElement("div");
		thunksModal.classList.add("modal__dialog");
		thunksModal.innerHTML = `
		  <div class="modal__content">
			  <div data-close class="modal__close">×</div>
				<div class="modal__title">${massage}</div>
		  </div>
		`;

		document.querySelector(".modal").append(thunksModal);

		setTimeout(() => {
			thunksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModalWindow();
		}, 4000);
	}
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

//Modal

function modal() {
	const modalBtn = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal");

	function closeModalWindow() {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.style.overflow = "";
	}
	function showModalWindow() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	modalBtn.forEach(btn => {
		btn.addEventListener("click", showModalWindow);
	});

	modal.addEventListener("click", event => {
		if (
			event.target === modal ||
			event.target.getAttribute("data-close") == ""
		) {
			closeModalWindow();
		}
	});

	document.addEventListener("keydown", event => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			closeModalWindow();
		}
	});

	const modalTimerId = setTimeout(showModalWindow, 50000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			showModalWindow();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

// Offer slider

function slides() {
	const slides = document.querySelectorAll(".offer__slide"),
		slider = document.querySelector(".offer__slider"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		sliderWrapper = document.querySelector(".offer__slider-wrapper"),
		width = window.getComputedStyle(sliderWrapper).width,
		slidesField = document.querySelector(".offer__slider-inner"),
		dots = [];

	let offset = 0;
	let slideIndex = 1;

	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	slidesField.style.width = 100 * slides.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	sliderWrapper.style.overflow = "hidden";

	slides.forEach(slide => (slide.style.width = width));

	slider.style.position = "relative";
	const indicators = document.createElement("ol");
	indicators.classList.add("carousel-indicators");
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-type-to", i + 1);
		dot.classList.add("dot");
		if (i === 0) {
			dot.style.opacity = 1;
		}
		dots.push(dot);
		indicators.append(dot);
	}

	function dotOpacity(i) {
		dots.forEach(dot => (dot.style.opacity = ".5"));
		dots[i - 1].style.opacity = "1";
	}

	function removeLetter(str) {
		return +str.replace(/\D/g, "");
	}

	dots.forEach(dot => {
		dot.addEventListener("click", e => {
			const slideTo = e.target.getAttribute("data-type-to");
			offset = removeLetter(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			current.textContent = addZero(slideTo);

			dotOpacity(slideTo);
		});
	});

	total.textContent = addZero(slides.length);
	current.textContent = addZero(slideIndex);

	next.addEventListener("click", () => {
		if (offset == removeLetter(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += removeLetter(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;
		current.textContent = addZero(slideIndex);

		dotOpacity(slideIndex);
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = removeLetter(width) * (slides.length - 1);
		} else {
			offset -= removeLetter(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;
		current.textContent = addZero(slideIndex);

		dotOpacity(slideIndex);
	});
}

module.exports = slides;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

//Tabs

function tabs() {
	const tabsParent = document.querySelector(".tabheader"),
		tabs = document.querySelectorAll(".tabheader__item"),
		tabContent = document.querySelectorAll(".tabcontent");

	function hideTabContent() {
		tabContent.forEach(item => {
			item.classList.remove("show");
			item.classList.add("hide");
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabContent(i = 0) {
		tabContent[i].classList.remove("hide");
		tabContent[i].classList.add("block", "fade");
		tabs[i].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", event => {
		const target = event.target;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
	//Timer
	const deadline = "2024-04-01";

	function convertTime(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			(days = Math.floor(t / (24 * 60 * 60 * 1000))),
				(hours = Math.floor((t / (60 * 60 * 1000)) % 24)),
				(minutes = Math.floor((t / (60 * 1000)) % 60)),
				(seconds = Math.floor((t / 1000) % 60));
		}

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function updateClock(selector, endtime) {
		const timerParent = document.querySelector(selector),
			days = timerParent.querySelector("#days"),
			hours = timerParent.querySelector("#hours"),
			minutes = timerParent.querySelector("#minutes"),
			seconds = timerParent.querySelector("#seconds"),
			interval = setInterval(changeClock, 1000);

		changeClock();
		function changeClock() {
			const data = convertTime(endtime);
			days.innerHTML = addZero(data["days"]);
			hours.innerHTML = addZero(data["hours"]);
			minutes.innerHTML = addZero(data["minutes"]);
			seconds.innerHTML = addZero(data["seconds"]);

			if (data["total"] <= 0) {
				clearInterval(interval);
			}
		}
	}
	updateClock(".timer", deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener("DOMContentLoaded", () => {
	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
		slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
		forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
		calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

	tabs();
	modal();
	slider();
	timer();
	forms();
	cards();
	calculator();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map