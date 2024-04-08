"use strict";

window.addEventListener("DOMContentLoaded", () => {
	//Tabs

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

	//Modal

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
		// clearInterval(modalTimerId);
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

	// const modalTimerId = setTimeout(showModalWindow, 15000);

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

	// Food Cards

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

	// Offer slider

	const slides = document.querySelectorAll(".offer__slide"),
		prevBtn = document.querySelector(".offer__slider-prev"),
		nextBtn = document.querySelector(".offer__slider-next");

	document.querySelector("#total").textContent = addZero(slides.length);

	let slideIndex = 1;

	showSlide(slideIndex);

	function showSlide(n) {
		if (n < 1) {
			slideIndex = slides.length;
		}

		if (n > slides.length) {
			slideIndex = 1;
		}

		slides.forEach(item => (item.style.display = "none"));
		slides[slideIndex - 1].style.display = "block";

		document.querySelector("#current").textContent = addZero(slideIndex);
	}

	function plusSlides(n) {
		showSlide((slideIndex += n));
	}

	prevBtn.addEventListener("click", () => {
		plusSlides(-1);
	});

	nextBtn.addEventListener("click", () => {
		plusSlides(1);
	});
});
