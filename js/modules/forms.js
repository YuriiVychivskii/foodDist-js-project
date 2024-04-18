function forms() {
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
}

export default forms;
