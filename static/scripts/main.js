/* User */

var myUser = {};
const MESSAGES_ENDPOINT = 'http://data.wechat.liferay.local/messages';

if (localStorage.myUser) {
	myUser = JSON.parse(localStorage.myUser);
}
else {
	myUser = {
		"id": faker.random.uuid(),
		"name": faker.name.firstName(),
		"color": 'color-' + Math.floor(Math.random() * 19)
	};

	localStorage.setItem('myUser', JSON.stringify(myUser));
}

/* First Load */

var conversation = document.querySelector('.conversation-container');

Launchpad.url(MESSAGES_ENDPOINT)
	.limit(100)
	.sort('id', 'asc')
	.get()
	.then(function(result) {
		var messages = result.body();

		for (var i = 0; i < messages.length; i++) {
			var message = buildMessage(messages[i]);
			conversation.appendChild(message);
		}

		conversation.scrollTop = conversation.scrollHeight;
	});

Launchpad.url(MESSAGES_ENDPOINT)
	.limit(100)
	.sort('id', 'asc')
  .watch()
  .on('changes', (state) => {
    console.log(state);
  });


/* New Message */

var form = document.querySelector('.conversation-compose');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	var input = e.target.input;

	if (input.value) {
		var data = {
			author: {
				id: myUser.id,
				name: myUser.name,
				color: myUser.color
			},
			content: input.value,
			time: moment().format('h:mm A')
		};

		var message = buildMessage(data);
		conversation.appendChild(message);

		Launchpad.url(MESSAGES_ENDPOINT)
			.post(data)
			.then(function() {
				animateMessage(message);
			});
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMessage(data) {
	var color = (data.author.id !== myUser.id) ? data.author.color : '';
	var sender = (data.author.id !== myUser.id) ? 'received' : 'sent';

	var element = document.createElement('div');

	element.classList.add('message', sender);
	element.innerHTML = '<span class="user ' + color + '">' + data.author.name + '</span>' +
		'<span class="text">' + data.content + '</span>' +
		'<span class="metadata">' +
			'<span class="time">' + data.time + '</span>' +
			'<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' +
		'</span>';

	return element;
}

function animateMessage(message) {
	var tick = message.querySelector('.tick');
	tick.classList.remove('tick-animation');
}

/* Time */

var deviceTime = document.querySelector('.status-bar .time');

deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);
