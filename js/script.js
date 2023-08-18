let startupTime;
let startupPage;

window.addEventListener("load", () => {
	document.getElementById("settings_time_mode").addEventListener("change", function () {
		document.getElementById("settings_time_timer").parentElement.hidden = true;
		document.getElementById("settings_time_timestamp").parentElement.hidden = true;
		document.getElementById("settings_time_timerShow").checked = true;
		document.getElementById("settings_time_timerShow")
			.parentElement.parentElement.hidden = true;

		switch (this.value) {
			case "TIMER":
				document.getElementById("settings_time_timer").parentElement.hidden = false;
				document.getElementById("settings_time_timerShow")
					.parentElement.parentElement.hidden = false;
				break;
			case "TIMESTAMP":
				document.getElementById("settings_time_timestamp").parentElement.hidden = false;
				break;
		}
	});

	document.getElementById("settings_brand_start").addEventListener("click", () => {
		startupTime = {
			mode: document.getElementById("settings_time_mode").value
		};
		switch (startupTime.mode) {
			case "TIMER":
				startupTime.timer = Number(document.getElementById("settings_time_timer").value);
				startupTime.timerShow = document.getElementById("settings_time_timerShow").checked;
				break;
			case "TIMESTAMP":
				startupTime.timeStamp = new Date(
					document.getElementById("settings_time_timestamp").value
				);
				break;
		}
		if (startupTime.mode == "TIMESTAMP") {
			if (isNaN(startupTime.timeStamp)) {
				mdui.alert("请指定一个时刻，否则无法启动！", "遇到错误");
				return;
			}
			if (new Date().getTime() >= startupTime.timeStamp) {
				mdui.alert("请指定一个未来的时刻，否则无法启动！", "遇到错误");
				return;
			}
		}

		startupPage = {
			company: document.getElementById("settings_page_company").checked,
			game: document.getElementById("settings_page_game").checked,
			warning: document.getElementById("settings_page_warning").checked
		};
		if (!startupPage.company && !startupPage.game && !startupPage.warning) {
			mdui.alert("必须包含一个页面，否则无法启动！", "遇到错误");
			return;
		}

		new mdui.Dialog("#readyStartup").open();
	});

	document.getElementById("readyStartup_go").addEventListener("click", () => {
		document.getElementById("settings").hidden = true;
		startup(startupTime, startupPage);
	});

	fixStartupSize();
});

window.addEventListener("resize", fixStartupSize);

function fixStartupSize() {
	document.getElementById("settings").style.zoom = document.body.clientWidth / 800;
	document.getElementById("startup").style.zoom = document.body.clientWidth / 1500;
};