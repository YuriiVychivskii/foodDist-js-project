import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
	tabs();
	modal();
	slider();
	timer(".timer", "2024-07-01");
	forms();
	cards();
	calc();
});
