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
		slider = document.querySelector(".offer__slider"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		sliderWrapper = document.querySelector(".offer__slider-wrapper"),
		slidesField = document.querySelector(".offer__slider-inner"),
		width = window.getComputedStyle(sliderWrapper).width,
		dots = [];

	let offset = 0;
	let slideIndex = 1;

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

	dots.forEach(dot => {
		dot.addEventListener("click", e => {
			const slideTo = e.target.getAttribute("data-type-to");
			offset = +width.slice(0, slides.length - 1) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			current.textContent = addZero(slideTo);

			dots.forEach(dot => (dot.style.opacity = ".5"));
			dots[slideTo - 1].style.opacity = "1";
		});
	});

	total.textContent = addZero(slides.length);
	current.textContent = addZero(slideIndex);

	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;
		current.textContent = addZero(slideIndex);

		dots.forEach(dot => (dot.style.opacity = 0.5));
		dots[slideIndex - 1].style.opacity = "1";
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;
		current.textContent = addZero(slideIndex);

		dots.forEach(dot => (dot.style.opacity = 0.5));
		dots[slideIndex - 1].style.opacity = "1";
	});
});
