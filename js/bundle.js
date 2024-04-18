/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


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

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then(data => {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



function forms(formSelector, modalSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);

	const massage = {
		loading: "icons/form/spinner.svg",
		access: "Ваши данные отправлены! Ждите ответа...",
		failure: "Ой. Что-то пошло не так",
	};

	forms.forEach(form => {
		bindPostData(form);
	});

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

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModalWindow)(modalSelector, modalTimerId);

		const thunksModal = document.createElement("div");
		thunksModal.classList.add("modal__dialog");
		thunksModal.innerHTML = `
		  <div class="modal__content">
			  <div data-close class="modal__close">×</div>
				<div class="modal__title">${massage}</div>
		  </div>
		`;

		document.querySelector(modalSelector).append(thunksModal);

		setTimeout(() => {
			thunksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(modalSelector);
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalWindow: () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModalWindow: () => (/* binding */ showModalWindow)
/* harmony export */ });
function closeModalWindow(modalSelector) {
	modal = document.querySelector(modalSelector);
	modal.classList.remove("show");
	modal.classList.add("hide");
	document.body.style.overflow = "";
}
function showModalWindow(modalSelector, modalTimerId) {
	modal = document.querySelector(modalSelector);
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function modal(modalSelector, modalTimerId) {
	const modalBtn = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(modalSelector);

	modalBtn.forEach(btn => {
		btn.addEventListener("click", () =>
			showModalWindow(modalSelector, modalTimerId)
		);
	});

	modal.addEventListener("click", event => {
		if (
			event.target === modal ||
			event.target.getAttribute("data-close") == ""
		) {
			closeModalWindow(modalSelector);
		}
	});

	document.addEventListener("keydown", event => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			closeModalWindow(modalSelector);
		}
	});

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			showModalWindow(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

const getResource = async url => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`${res} - ${res.status}`);
	}

	return await res.json();
};




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
	slidesSelector,
	sliderSelector,
	prevArrow,
	nextArrow,
	totalId,
	currentId,
	sliderWrapperSelector,
	fieldSelector,
}) {
	const slides = document.querySelectorAll(slidesSelector),
		slider = document.querySelector(sliderSelector),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalId),
		current = document.querySelector(currentId),
		sliderWrapper = document.querySelector(sliderWrapperSelector),
		width = window.getComputedStyle(sliderWrapper).width,
		slidesField = document.querySelector(fieldSelector),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
	tabsParentSelector,
	tabsSelector,
	tabContentSelector,
	activeClass
) {
	const tabsParent = document.querySelector(tabsParentSelector),
		tabs = document.querySelectorAll(tabsSelector),
		tabContent = document.querySelectorAll(tabContentSelector);

	function hideTabContent() {
		tabContent.forEach(item => {
			item.classList.remove("show");
			item.classList.add("hide");
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabContent[i].classList.remove("hide");
		tabContent[i].classList.add("block", "fade");
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", event => {
		const target = event.target;
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
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
	updateClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(
		() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModalWindow)(".modal", modalTimerId),
		50000
	);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(
		".tabheader",
		".tabheader__item",
		".tabcontent",
		"tabheader__item_active"
	);
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(".modal", modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
		slidesSelector: ".offer__slide",
		sliderSelector: ".offer__slider",
		prevArrow: ".offer__slider-prev",
		nextArrow: ".offer__slider-next",
		totalId: "#total",
		currentId: "#current",
		sliderWrapperSelector: ".offer__slider-wrapper",
		fieldSelector: ".offer__slider-inner",
	});
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2024-07-01");
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", ".modal", modalTimerId);
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map