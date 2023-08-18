let timer = null;

function startup(time, page) {
	document.getElementById("startup").hidden = false;
	switch (time.mode) {
		case "NOW":
			startupContent(page);
			break;
		case "TIMER":
			document.getElementById("startup_timer").hidden = !time.timerShow;
			document.getElementById("startup_timer_tn").innerText = time.timer;
			timer = setInterval(() => {
				let tn = Number(document.getElementById("startup_timer_tn").innerText) - 1;
				if (tn == 0) {
					timer && clearInterval(timer);
					document.getElementById("startup_timer").hidden = true;
					startupContent(page);
				} else {
					document.getElementById("startup_timer_tn").innerText = tn;
				}
			}, 1000);
			break;
		case "TIMESTAMP":
			document.getElementById("startup_timestamp").hidden = false;
			document.getElementById("startup_timestamp_t").innerText = time.timeStamp.toLocaleString();
			document.getElementById("startup_timestamp_n").innerText = new Date().toLocaleString();
			timer = setInterval(() => {
				let now = new Date();
				if (now.getTime() >= time.timeStamp) {
					timer && clearInterval(timer);
					document.getElementById("startup_timestamp").hidden = true;
					startupContent(page);
				} else {
					document.getElementById("startup_timestamp_n").innerText = now.toLocaleString();
				}
			}, 1000);
			break;
	}
};

function startupContent(page) {
	let t = 1000;
	if (page.company) {
		setTimeout(() => {
			document.getElementById("startup_company").style.opacity = "1";
		}, t);
		t += 3000;
	}
	if (page.game) {
		setTimeout(() => {
			document.getElementById("startup_company").style.opacity = "0";
		}, t);
		t += 2000;
		setTimeout(() => {
			document.getElementById("startup_game").style.opacity = "1";
		}, t);
		t += 500;
		setTimeout(() => {
			document.getElementById("startup_game_g").style.opacity = "1";
		}, t);
		t += 4000;
	}
	if (page.warning) {
		setTimeout(() => {
			document.getElementById("startup_game").style.opacity = "0";
			document.getElementById("startup_game_g").style.opacity = "0";
		}, t);
		t += 1000;
		setTimeout(() => {
			document.getElementById("startup_warning").style.opacity = "1";
		}, t);
	}
};