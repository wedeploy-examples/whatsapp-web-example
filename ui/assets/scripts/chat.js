var auth = WeDeploy.auth('auth-weapp.wedeploy.io').withCredentials(false);
var data_endpoint = 'data-weapp.wedeploy.io';


/* Redirect if no user signed in */

if (auth.currentUser == null) {document.location.href = '/';}

/* Sign Out */

function signOut() {
  auth
    .signOut()
    .then(() => {
      document.location.href = '/';
    });
}


/* User */

// if (localStorage.myUser) {
// 	myUser = JSON.parse(localStorage.myUser);
// }
// else {
// 	myUser = {
// 		"id": faker.randomid),
// 		"name": faker.name.firstName(),
// 		"color": 'color-' + Math.floor(Math.random() * 19)
// 	};

// 	localStorage.setItem('myUser', JSON.stringify(myUser));
// }

/* Old Messages */

WeDeploy
	.data(data_endpoint).withCredentials(false)
	.orderBy('id', 'asc')
	.limit(100)
	.get('messages')
	.then(function(result) {

		var messages = result;
		for (var i = 0; i < messages.length; i++) {
			appendMessage(messages[i]);
		}
	});

	WeDeploy
		.data(data_endpoint).withCredentials(false)
		.orderBy('id', 'desc')
		.limit(1)
		.watch('messages')
		.on('changes', function(result) {
			var data = result.pop();
			var element = document.getElementById(data.id);
			if (element) {
				animateMessage(element);
			} else {
				appendMessage(data);
			}
		});

/* New Message */

var conversation = document.querySelector('.conversation-container');
var form = document.querySelector('.conversation-compose');

form.addEventListener('submit', newMessage);

function appendMessage(data) {
	var element = buildMessage(data);
	element.id = data.id;
	conversation.appendChild(element);
	conversation.scrollTop = conversation.scrollHeight;
}

function newMessage(e) {
	var input = e.target.input;

	WeDeploy.data(data_endpoint).withCredentials(false)
		.get('friends')
		.then(function(friend) {
			if (input.value) {
				var data = {
					id: friend.id + Date.now(),
					author: {
						id: friend.id,
						name: friend.name,
						color: friend.color
					},
					content: input.value,
					time: moment().format('h:mm A')
				};

				appendMessage(data);

				WeDeploy
					.data(data_endpoint).withCredentials(false)
					.create('messages', data);
			}
		})

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
