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

export default tabs;
