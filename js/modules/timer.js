function timer(timerSelector, deadline) {
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
	updateClock(timerSelector, deadline);
}

export default timer;
