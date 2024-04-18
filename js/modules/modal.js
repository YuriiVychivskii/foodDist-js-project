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
