var auth = WeDeploy.auth('auth-weapp.wedeploy.io').withCredentials(false);
var data = WeDeploy.data('data-weapp.wedeploy.io').withCredentials(false);


/* Redirect if user is signed in */

if (auth.currentUser) {document.location.href = '/chat/';}


/* Create User Method */

var create = document.querySelector('.create');

function userCreate() {
	auth.createUser({
		name: create.name.value,
		email: create.email.value,
		password: create.password.value,
		color: 'color-' + Math.floor(Math.random() * 19)
	})
	.then(function(newUser) {
		alert('Account successfully created!');

		data.create('friends', {
			name: create.name.value,
			email: create.email.value,
			password: create.password.value,
			id: newUser.id,
			color: 'color-' + Math.floor(Math.random() * 19)
		})

		auth.signInWithEmailAndPassword(create.email.value, create.password.value)
			.then(function() {
				document.location.href = '/chat/';
			})
		create.reset();
	})
	.catch(function(err) {
		alert('Sign-up failed. Try another email.');
		create.reset();
		console.log(err);
	})
};