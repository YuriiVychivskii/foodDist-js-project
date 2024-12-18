import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal, { showModalWindow } from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(
		() => showModalWindow(".modal", modalTimerId),
		50000
	);

	tabs(
		".tabheader",
		".tabheader__item",
		".tabcontent",
		"tabheader__item_active"
	);
	modal("[data-modal]", ".modal", modalTimerId);
	slider({
		slidesSelector: ".offer__slide",
		containerSelector: ".offer__slider",
		prevArrow: ".offer__slider-prev",
		nextArrow: ".offer__slider-next",
		totalId: "#total",
		currentId: "#current",
		sliderWrapperSelector: ".offer__slider-wrapper",
		fieldSelector: ".offer__slider-inner",
	});
	timer(".timer", "2024-07-01");
	forms("form", ".modal", modalTimerId);
	cards();
	calc();
});
