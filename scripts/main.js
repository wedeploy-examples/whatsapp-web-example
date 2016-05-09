/* Time
   ========================================================================== */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .metadata');

deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('h:mm A');
}

/* Message
   ========================================================================== */

var form = document.querySelector('.block-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', function(e) {
	var message = e.target.message;

	if (message.value) {
		conversation.innerHTML += '<div class="message sent">' + message.value +
			'<span class="metadata blue">' + moment().format('h:mm A') + '</span></div>';
	}

	message.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
});