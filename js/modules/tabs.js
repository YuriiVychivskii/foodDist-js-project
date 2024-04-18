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

export default tabs;
