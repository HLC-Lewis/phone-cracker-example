let phone_mode = "normal"
let set_keycode = ""

function set_mode(force) {
	if (force) phone_mode = force

	switch(phone_mode) {
		case "normal":
			phone_mode = "setting"
			break;
		case "setting":
			phone_mode = "normal"
			break;
		case "reset":
			phone_mode = "normal"
			lock_icon("fas fa-lock")
			set_keycode = ""
			document.getElementById('passcode_circles').innerHTML = "&nbsp;"
			document.getElementById('console').innerHTML = "Resetting Phone & Log..."
			break;
	}

	document.getElementById('phone_mode').innerHTML = phone_mode.toUpperCase()
}

function press_key(digit_pressed) {
	if (set_keycode == "" && phone_mode == "normal") {
		send_to_console("error", "There is no keycode set.")
		return
	}

	switch(phone_mode) {
		case "normal":
			
			break;
		case "setting":
			document.getElementById('passcode_circles').innerHTML +=
				'<i class="far fa-circle"></i> '

			set_keycode += digit_pressed

			break;
	}
}

function start_cracking() {
	if (set_keycode == "") {
		send_to_console("error", "There is no keycode set.")
		return
	}

	let start_time = Date.now();
	let find_value = parseInt(set_keycode)
	let auto_set = false

	send_to_console('normal', 'Starting Search...')

	let found_passcode = false
	let current_counter = 0

	while (true) { // For true "bruteforce-ness"
		if (find_value == current_counter) {
			found_passcode = true
			break
		}

		current_counter++
	}

	let delta = Date.now() - start_time
	if (found_passcode) {
		send_to_console('success', "Unlocked the device with passcode: " + current_counter)
		lock_icon("fas fa-lock-open")
	} else {
		send_to_console('success', "Was unable to unlock the device: " + current_counter)
		lock_icon("fas fa-lock")
	}

	send_to_console('success', "Computation Time: " + delta / 1000 + " seconds")
}

function send_to_console(type, message) {	
	switch(type) {
		case "error":
			var message_to_add = "<p style='color:red;'>Error: " + message + "</p>"
			document.getElementById('console').innerHTML += message_to_add
			break;
		case "normal":
			var message_to_add = "<p>"+message+"</p>"
			document.getElementById('console').innerHTML += message_to_add
			break
		case "success":
			var message_to_add = "<p style='color:lightblue;'> Script: " + message + "</p>"
			document.getElementById('console').innerHTML += message_to_add
			break
	}
}

function lock_icon(icn) {
	var lock_icon = document.getElementById('lock_icon')
	lock_icon.classList = icn
}

function scroll_console() {
	var objDiv = document.getElementById("console");
	objDiv.scrollTop = objDiv.scrollHeight;
}