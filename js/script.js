"use strict";

window.addEventListener("DOMContentLoaded", () => {
	const tabs = require("./modules/tabs"),
		modal = require("./modules/modal"),
		slider = require("./modules/slider"),
		timer = require("./modules/timer"),
		forms = require("./modules/forms"),
		cards = require("./modules/cards"),
		calculator = require("./modules/calculator");

	tabs();
	modal();
	slider();
	timer();
	forms();
	cards();
	calculator();
});
