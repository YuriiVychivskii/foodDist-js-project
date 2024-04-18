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

export { closeModalWindow, showModalWindow };
export default modal;
