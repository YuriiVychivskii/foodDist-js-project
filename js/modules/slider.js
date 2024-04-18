function slider() {
	const slides = document.querySelectorAll(".offer__slide"),
		slider = document.querySelector(".offer__slider"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		sliderWrapper = document.querySelector(".offer__slider-wrapper"),
		width = window.getComputedStyle(sliderWrapper).width,
		slidesField = document.querySelector(".offer__slider-inner"),
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

export default slider;
